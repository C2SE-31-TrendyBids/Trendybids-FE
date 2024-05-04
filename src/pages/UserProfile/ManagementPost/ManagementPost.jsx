import React, {useState, useCallback, useEffect, useRef, useContext} from "react";
import { IoIosSearch } from "react-icons/io";
import { CiCircleRemove } from "react-icons/ci";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import { get } from "./../../../ultils/request";
import {
    addProduct,
    deleteProduct,
    getAllProduct,
    updateProduct,
    deleteImageProduct,
} from "../../../services/product";
import { toast } from "sonner";
import { getAllCategory } from "./../../../services/category";
import { getCensors } from "./../../../services/censor";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "@uidotdev/usehooks";
import Swal from "sweetalert2";
import Tooltip from '@mui/material/Tooltip';
import SocketContext from "../../../context/socketProvider";
import AuthContext from "../../../context/authProvider";

const PRODUCT_URL = "/product";

const ManagementPost = () => {
    const {auth} = useContext(AuthContext)
    const socket = useContext(SocketContext)
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [change, setChange] = useState(true);
    const [images, setImages] = useState([]);
    const [imagesDeleteID, setImagesDeleteID] = useState([]);

    const [pagination, setPagination] = useState({
        page: 1,
        totalPage: 2,
    });
    const [products, setProducts] = useState([]);
    const token = localStorage.getItem("access-token");
    const [values, setValues] = useState({
        id: "",
        productName: "",
        description: "",
        startingPrice: 0,
        categoryId: "",
        censorId: "",
        status: ""
    });
    const [centos, setCentos] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigation = useNavigate();
    const [productName, setProductName] = useState("");
    const debouncedSearchTerm = useDebounce(productName, 500);

    const onDrop = useCallback((acceptedFiles) => {
        setImages((prevImages) => [...prevImages, ...acceptedFiles]);
    }, []);

    const removeImage = async (indexToRemove, id) => {
        if (id !== undefined) {
            setImagesDeleteID((prevIDs) => {
                if (!Array.isArray(prevIDs)) {
                    return [];
                }
                return [...prevIDs, id];
            });
        }
        setImages((prevImages) =>
            prevImages.filter((_, index) => index !== indexToRemove)
        );
    };

    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
        onDrop,
        accept: "image/*", // Specify accepted file types
        multiple: true, // Allow multiple files to be dropped
    });

    const getData = async (token, { productName = "", page = 1 }) => {
        if (productName) {
            page = 1;
        }
        const response = await getAllProduct(token, { productName, page })
        if (response.response) {
            // console.log("Get data:",response?.response?.products);
            setProducts(response?.response?.products);  
            setPagination((prev) => ({
                ...prev,
                totalPage: response?.response?.totalPages,
            }));
        }
    };

    useEffect(() => {
        (async () => {
            let params = { status: "Verified" };
            const [responseCate, responseCentos] = await Promise.all([
                getAllCategory(),
                getCensors(params),
            ]);
            setCategories(responseCate?.response?.categorys || []);
            setCentos(responseCentos?.data?.censors || []);
            setImagesDeleteID([]);
            setImages([]);
        })();
    }, [change]);

    useEffect(() => {
        if (!token) return;

        getData(token, {
            productName: debouncedSearchTerm,
            page: pagination.page,
        });
        console.log();
    }, [token, debouncedSearchTerm, pagination.page, change]);

    const onOpen = () => {
        setShowForm(true);
    };

    const handleChangeValues = ({ target: { value, name } }) => {
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
       
        setLoading(true);

        if (
            !values.categoryId ||
            !values.censorId ||
            !values.description ||
            !values.productName ||
            !values.startingPrice
        ) {
            setLoading(false);
            toast.error("Please fill out all fields!");
            return;
        }

        if (!images.length) {
            setLoading(false);
            toast.error("Please select a photo");
            return;
        }
        if (imagesDeleteID.length > 0) {
            imagesDeleteID.map(async (id) => {
                const imageDelete = await deleteImageProduct(token, id);
            });
        }

        const data = { ...values, prdImageURL: images };

        if (data.prdImageURL) {
            data.prdImageURL = data.prdImageURL?.filter((t) => !t?.id);
        }

        if (!data.id) {
            delete data.id;
        }

        const { response, error } = await (data?.id
            ? updateProduct(token, {...data, status: "Processing"})
            : addProduct(token, {...data, status: "Processing"}));

        if (error?.response?.data?.message === "Access Token invalid") {
            setLoading(false);
            navigation("/login");
            return;
        }

        if (response) {
            setLoading(false);
            toast.success(
                data?.id
                    ? `Product Update Successfully`
                    : "Add Product Successfully"
            );

            let title, content, thumbnail;
            // Emit event to socket
            if (data?.id) {
                title = `Update product by ${auth?.fullName}`;
                content = `${auth?.fullName} has updated ${data?.productName}'s information`;
                thumbnail = images[0]?.prdImageURL;
            } else {
                title = `New product by ${auth?.fullName}`;
                content = `${auth?.fullName} has posted a new product for your organization to review`;
                thumbnail = response?.thumbnail?.url;
            }
            socket.emit('product.createOrUpdate', {
                title,
                content,
                linkAttach: "/censor/all-product",
                thumbnail,
                censorId: data?.censorId,
            });

            setShowForm(false);
            setValues({
                productName: "",
                description: "",
                startingPrice: 0,
                categoryId: "",
                censorId: "",
                status: ""
            });
            setLoading(false)
            await getData(token, { page: pagination.page, productName: "" });
        }
        setChange(!change)
    };

    const handleDeleteProduct = async (id) => {
        Swal.fire({
            title: "Are you sure you want to Delete?",
            text: "Be careful you will lose Data",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#007BFF",
            cancelButtonColor: "#d33",
            confirmButtonText: "Agree Delete",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { response, error } = await deleteProduct(token, id);

                if (error?.response?.data?.message === "Access Token invalid") {
                    navigation("/login");
                    return;
                }

                if (response) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Product Delete Successful",
                        icon: "success",
                    });

                    await getData(token, {
                        page: pagination.page,
                        productName: "",
                    });
                }
            }
        });
    };
    const handleOpenEdit = async (prod) => {
        setValues({
            id: prod?.id,
            categoryId: prod?.category?.id,
            censorId: prod?.censor?.id,
            description: prod?.description,
            productName: prod?.productName,
            startingPrice: prod?.startingPrice,
            status: prod?.status
        });

        setImages(prod?.prdImages);
        setShowForm(true);
    };

    const onClose = () => {
        setShowForm(false);
        setValues({
            productName: "",
            description: "",
            startingPrice: 0,
            categoryId: "",
            censorId: "",
            status: "",
        });
        setImages([])
    };

    return (
        <div className="overflow-x-auto ">
            <div className="flex items-center justify-between my-10">
                <h1 className="text-[20px] font-extrabold text-[#007bff]">
                    Manage Post Auction Products
                </h1>
                <div className="flex-row items-center space-x-4 relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="w-[350px] border border-gray-300 px-3 py-2 rounded focus:border-[#007bff] focus:outline-none"
                    />
                    <button className="absolute right-0 top-0 bottom-0 px-2 flex items-center justify-center">
                        <IoIosSearch className="mx-1 font-bold" />
                    </button>
                </div>
                <div>
                    <button
                        className="bg-[#007bff] font-semibold text-white px-4 py-2 rounded"
                        onClick={onOpen}
                    >
                        Post Product
                    </button>
                </div>
            </div>

            {showForm && (
                <div className="fixed top-0 bottom-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="max-h-[95%] w-[50%] bg-white p-6 rounded-md shadow-lg scroll-smooth overflow-auto">
                        <div className="flex items-center justify-between mb-3">
                            <h1 className="text-xl font-bold text-[#007bff]">
                                Post Product Auction
                            </h1>
                            <button
                                onClick={onClose}
                                className="flex items-center justify-center w-8 h-8 text-[#f93232] "
                            >
                                <CiCircleRemove className="w-6 h-6 opacity-70 font-bold" />
                            </button>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className="font-[sans-serif] max-w-6xl mx-auto"
                        >
                            <div className="grid sm:grid-cols-2 gap-8 overflow-y-auto py-2">
                                {values.status !== "" && (
                                    <div className={`sm:col-span-2 text-center py-2 px-2 font-semibold border-2 rounded text-xs ${
                                        values.status === "Processing"
                                            ? "border-blue-500 text-blue-500"
                                            : values.status === "Verified"
                                                ? "border-green-500 text-green-500"
                                                : "border-red-500 text-red-500"
                                    }`}>
                                        {values.status}
                                    </div>
                                )}
                                <div className="relative flex items-center sm:col-span-2">
                                    <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px] font-semibold">
                                        Product Name
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        name="productName"
                                        value={values.productName}
                                        onChange={handleChangeValues}
                                        placeholder="Enter product name"
                                        className="px-4 py-3 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                                    />
                                </div>
                                <div className="relative flex items-center sm:col-span-2">
                                    <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px] font-semibold">
                                        Product Description
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        name="description"
                                        value={values.description}
                                        onChange={handleChangeValues}
                                        placeholder="Enter product description"
                                        className="px-4 py-3 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                                    />
                                </div>
                                <div className="relative flex items-center">
                                    <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px] font-semibold">
                                        Product Category
                                    </label>
                                    <select
                                        required
                                        name="categoryId"
                                        value={values.categoryId}
                                        onChange={handleChangeValues}
                                        className="px-4 py-3 bg-white  w-full text-sm border-2
                  border-gray-100 focus:border-blue-500 rounded outline-none"
                                    >
                                        <option
                                            value=""
                                            disabled
                                            selected
                                            className="text-gray-100"
                                        >
                                            Select product category
                                        </option>
                                        {categories?.map((t) => (
                                            <option key={t?.id} value={t?.id}>
                                                {t?.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="relative flex items-center">
                                    <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px] font-semibold">
                                        Censor Organization
                                    </label>
                                    <select
                                        name="censorId"
                                        value={values.censorId}
                                        onChange={handleChangeValues}
                                        required
                                        className="px-4 py-3 bg-white w-full text-sm border-2
                  border-gray-100 focus:border-blue-500 rounded outline-none"
                                    >
                                        <option value="" disabled selected>
                                            Select censor organization
                                        </option>
                                        {centos?.map((t) => (
                                            <option key={t?.id} value={t?.id}>
                                                {t?.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="relative flex items-center sm:col-span-2">
                                    <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px] font-semibold">
                                        Product Starting Price
                                    </label>
                                    <input
                                        required
                                        value={values.startingPrice}
                                        onChange={handleChangeValues}
                                        name="startingPrice"
                                        type="number"
                                        min={1}
                                        placeholder="Enter product starting price"
                                        className="px-4 py-3 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                                    />
                                </div>
                            </div>
                            <div className="relative flex items-center border border-gray-200 rounded-md mt-4">
                                <label className="text-[13px] bg-white text-black absolute mt-4 px-2 top-[-10px] left-[18px] font-semibold">
                                    Product Image
                                </label>
                                <div className="container">
                                    <div
                                        {...getRootProps()}
                                        className="dropzone my-6"
                                    >
                                        <input {...getInputProps()} />
                                        <FaCloudUploadAlt
                                            className={`mx-auto w-10 h-10 text-blue-500 ${
                                                images.length > 0 ? "" : ""
                                            }`}
                                        />
                                        <p
                                            className={`text-center text-sm mt-4 text-gray-400 ${
                                                images.length > 0
                                                    ? "hidden"
                                                    : ""
                                            }`}
                                        >
                                            JPEG, PNG, PDG, and MP4 formats, up
                                            to 50MB
                                        </p>
                                        <p
                                            className={`text-center ${
                                                images.length > 0
                                                    ? "hidden"
                                                    : ""
                                            }`}
                                        >
                                            Drag and drop files to upload
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        {images.map((file, index) => (
                                            <div
                                                key={index}
                                                className="image-preview flex flex-col items-center"
                                            >
                                                <img
                                                    src={
                                                        file?.prdImageURL ||
                                                        URL.createObjectURL(
                                                            file
                                                        )
                                                    }
                                                    alt="Preview"
                                                    className="w-20 h-20 mb-2"
                                                />
                                                <div className="flex items-center">
                                                    <p className="">
                                                        {file.name}
                                                    </p>{" "}
                                                    {/* Display file name */}
                                                    <button
                                                        className="remove-btn ml-2 p-4"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            removeImage(
                                                                index,
                                                                file.id
                                                            );
                                                        }}
                                                    >
                                                        <FaTimes />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className={`mt-8 px-6 py-2.5 w-full text-sm font-semibold bg-blue-500 text-white rounded hover:bg-blue-600 relative ${
                                    loading
                                        ? "disabled:opacity-50 cursor-not-allowed"
                                        : ""
                                }`}
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <span>Loading...</span>
                                        <div className="animate-spin absolute top-1/2 -translate-y-1/2 right-4 h-5 w-5 border-t-2 border-b-2 border-white rounded-full"></div>
                                    </div>
                                ) : (
                                    <span>{values.status !== "" ? "Resubmit" : "Submit"}</span>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <table className="min-w-full bg-white ">
                <thead className="bg-gray-200 whitespace-nowrap  ">
                    <tr className="font-medium">
                        <th className="px-6 py-3 text-left text-md font-semibold hover:text-[#007bff] cursor-pointer text-gray-700">
                            ID
                        </th>
                        <th className="px-6 py-3 text-left text-md font-semibold hover:text-[#007bff] cursor-pointer text-gray-700">
                            Product Name
                        </th>
                        <th className="px-6 py-3 text-left text-md font-semibold hover:text-[#007bff] cursor-pointer text-gray-700">
                            Product Image
                        </th>
                        <th className="px-6 py-3 text-left text-md font-semibold hover:text-[#007bff] cursor-pointer text-gray-700">
                            Product Description
                        </th>
                        <th className="px-6 py-3 text-left text-md font-semibold hover:text-[#007bff] cursor-pointer text-gray-700">
                            Start Price
                        </th>
                        <th className="px-6 py-3 text-left text-md font-semibold hover:text-[#007bff] cursor-pointer text-gray-700">
                            Status
                        </th>
                        <th className="px-6 py-3 text-left text-md font-semibold hover:text-[#007bff] cursor-pointer text-gray-700">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className="whitespace-nowrap">
                    {products.map((prod, index) => (
                        <Tooltip title={prod?.note !== null ?`Reason: ${prod?.note}` : ""}
                             componentsProps={{
                                tooltip: {
                                    sx: { backgroundColor: "#e82929", fontSize: "15px", maxWidth: 500 },
                                }
                        }}>
                            <tr className="hover:bg-gray-50" key={index}>
                                <td className="px-6 py-4 text-base">{index + 1}</td>
                                <td className="px-6 py-4 text-base truncate max-w-4">
                                    {prod.productName}
                                </td>
                                <td className="px-6 py-4">
                                    <img
                                        src={prod?.prdImages?.[0]?.prdImageURL}
                                        alt={prod.productName}
                                        className="w-16 h-16"
                                    />
                                </td>
                                <td className="px-6 py-4 text-base truncate max-w-4">
                                    {prod?.description}
                                </td>
                                <td className="px-6 py-4 text-base">
                                    {prod?.startingPrice}
                                </td>
                                <td className="px-6 py-4 text-base">
                                <span
                                    className={`w-[68px] block text-center py-0.5 font-semibold rounded text-xs ${
                                        prod.status === "Processing"
                                            ? "border-2 border-blue-500 text-blue-500"
                                            : prod.status === "Verified"
                                                ? "border-2 border-green-500 text-green-500"
                                                : "border-2 border-red-500 text-red-500"
                                    }`}
                                >
                                    {prod.status === "Processing"
                                        ? "Processing"
                                        : prod.status === "Verified"
                                            ? "Verified"
                                            : "Rejected"}
                                </span>
                                </td>
                                <td className="px-6 py-3">
                                    <button
                                        className="mr-4"
                                        title="Edit"
                                        onClick={() => handleOpenEdit(prod)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 fill-blue-500 hover:fill-blue-700"
                                            viewBox="0 0 348.882 348.882"
                                        >
                                            <path
                                                d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z"
                                                data-original="#000000"
                                            />
                                            <path
                                                d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z"
                                                data-original="#000000"
                                            />
                                        </svg>
                                    </button>
                                    <button
                                        className="mr-4"
                                        title="Delete"
                                        onClick={() => handleDeleteProduct(prod.id)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 fill-red-500 hover:fill-red-700"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                                                data-original="#000000"
                                            />
                                            <path
                                                d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                                                data-original="#000000"
                                            />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        </Tooltip>
                    ))}
                </tbody>
            </table>

            <div className="md:flex mt-4 pt-4 px-6 border-t border-gray-100 justify-center mb-6">
                <div className="flex items-center max-md:mt-4">
                    <ul className="flex space-x-1 ml-2">
                        <li
                            className="flex items-center justify-center cursor-pointer bg-gray-300 w-7 h-7 rounded"
                            onClick={() =>
                                setPagination((prev) => ({
                                    ...prev,
                                    page: Math.min(1, prev.page + 1),
                                }))
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3 fill-gray-500"
                                viewBox="0 0 55.753 55.753"
                            >
                                <path
                                    d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                                    data-original="#000000"
                                />
                            </svg>
                        </li>
                        {[...Array(pagination.totalPage)].map((_, index) => (
                            <li
                                key={index}
                                onClick={() =>
                                    setPagination((prev) => ({
                                        ...prev,
                                        page: index + 1,
                                    }))
                                }
                                className={`flex items-center justify-center cursor-pointer text-sm ${
                                    pagination.page === index + 1
                                        ? `bg-[#007bff] text-white`
                                        : `bg-gray-200 text-black`
                                }  w-7 h-7 rounded`}
                            >
                                {index + 1}
                            </li>
                        ))}
                        <li
                            onClick={() =>
                                setPagination((prev) => ({
                                    ...prev,
                                    page:
                                        prev.page + 1 >= prev.totalPage
                                            ? prev.totalPage
                                            : prev.page + 1,
                                }))
                            }
                            className="flex items-center justify-center cursor-pointer bg-gray-300 w-7 h-7 rounded"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3 fill-gray-500 rotate-180"
                                viewBox="0 0 55.753 55.753"
                            >
                                <path
                                    d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                                    data-original="#000000"
                                />
                            </svg>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ManagementPost;

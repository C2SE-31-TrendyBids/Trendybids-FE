import React, { useEffect, useState } from "react";
import * as censorApi from "../../../services/censor";
import CircularProgress from "@mui/material/CircularProgress";
import { IoCloudUploadSharp } from "react-icons/io5";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import ModalPay from "../../Payment/ModalPay";
import { FaCheckCircle } from "react-icons/fa";
import { fetchRulesThunk } from "../../../redux/slices/rule";
import { useDispatch, useSelector } from "react-redux";
import RuleModel from "../../../components/ModelAdmin/RuleModel";
import moment from "moment/moment";

const RegisterCensor = () => {
    const [loading, setLoading] = useState(false);
    const [statusPayment, setStatusPayment] = useState(false);
    const [openPayment, setOpenPayment] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const accessToken = localStorage.getItem("access-token");
    const user = JSON.parse(localStorage.getItem("auth"));
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            isCheck: false,
            taxCode: "",
            nameOrganization: "",
            phoneNumber: "",
            founding: "",
            address: "",
            dateTaxCode: "",
            position: "",
            placeTaxCode: "",
        },
    });
    const [openModalRule, setOpenModalRule] = useState(false);
    const { rules } = useSelector((state) => state.rule);
    const dispatch = useDispatch();
    const handleFileChange = (e) => {
        const newImage = e.target.files[0];
        newImage["id"] = Math.random();
        setSelectedFile(newImage);
    };
    const onSubmit = async (data) => {
        if (!statusPayment) {
            toast.error("You have not paid the deposit");
            return;
        }
        setLoading(true);
        try {
            const censorReq = await censorApi.registerCensor(
                accessToken,
                data.nameOrganization,
                data.phoneNumber,
                data.founding,
                data.address,
                data.taxCode,
                data.dateTaxCode,
                data.position,
                data.placeTaxCode,
                selectedFile
            );
            if (censorReq.statusCode === 201) {
                toast.success(censorReq.message);
                reset({
                    isCheck: false,
                    taxCode: "",
                    nameOrganization: "",
                    phoneNumber: "",
                    founding: "",
                    address: "",
                    dateTaxCode: "",
                    position: "",
                    placeTaxCode: "",
                });
                setStatusPayment(false);
                setSelectedFile(null);
            } else {
                toast.error(censorReq?.message);
            }
        } catch (error) {
            toast(error);
        } finally {
            setLoading(false);
        }
    };
    const handlePhoneNumberChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        e.target.value = value;
    };
    useEffect(() => {
        console.log(statusPayment);
    }, [statusPayment]);

    useEffect(() => {
        const fetchRules = async () => {
            dispatch(fetchRulesThunk({}));
        };
        fetchRules();
    }, []);

    return (
        <div className="w-full px-[30px] mx-auto mb-10">
            <div className="border shadow-lg rounded-lg bg-white h-auto ">
                <form
                    action=""
                    className="flex items-center justify-center"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="w-4/5">
                        <div className="text-center my-10">
                            <span className="text-2xl font-bold text-blue-500">
                                Register Auction Organization
                            </span>
                        </div>

                        <div className="my-2">
                            <span className="text-[16px] bg-white text-black px-2 font-semibold">
                                Organization Name
                            </span>
                            <input
                                {...register("nameOrganization", {
                                    require: true,
                                    minLength: {
                                        value: 5,
                                        message:
                                            "Please enter organization name > 5 ",
                                    },
                                    maxLength: {
                                        value: 100,
                                        message:
                                            "Please enter organization name  < 100",
                                    },
                                })}
                                type="text"
                                className="w-full border p-2 rounded-md my-2 text-black outline-blue-500 transition-all"
                            />
                            <span className="text-red-500 text-xs">
                                {errors?.nameOrganization?.message}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <div className="my-2">
                                    <span className="text-[16px] bg-white text-black px-2 font-semibold">
                                        Founding
                                    </span>
                                    <input
                                        {...register("founding", {
                                            required:
                                                "Please enter the founding date.",
                                            validate: (value) => {
                                                // Convert string value to Date object using Moment.js
                                                const parsedDate =moment(value).format('L')
                                                const today = moment(new Date()).format('L')
                                                const oneYearAgo = moment().subtract(1, 'years').format('L');
                                                console.log({parsedDate, today, oneYearAgo});
                                                if (parsedDate > today) {
                                                    return "Future dates are not allowed.";
                                                }
                                                return true; // Valid date
                                            },
                                        })}
                                        type="date"
                                        className="w-full border p-2 rounded-md my-2 text-black outline-blue-500 transition-all"
                                    />
                                    <span className="text-red-500 text-xs">
                                        {errors?.founding?.message}
                                    </span>
                                </div>
                                <div className="my-2">
                                    <span className="text-[16px] bg-white text-black px-2 font-semibold">
                                        Company Tax Code
                                    </span>
                                    <input
                                        {...register("taxCode", {
                                            require: true,
                                            minLength: {
                                                value: 8,
                                                message: "taxcode length > 8",
                                            },
                                            maxLength: {
                                                value: 30,
                                                message: "taxcode length < 30",
                                            },
                                        })}
                                        type="text"
                                        className="w-full border p-2 rounded-md my-2 text-black font-semibold outline-blue-500 transition-all"
                                    />
                                    <span className="text-red-500 text-xs">
                                        {errors?.taxCode?.message}
                                    </span>
                                </div>
                                <div className="my-2">
                                    <span className="text-[16px] bg-white text-black px-2 font-semibold">
                                        Tax Code Issuance Date
                                    </span>

                                    <input
                                        {...register("dateTaxCode", {
                                            required:
                                                "Please enter the Tax code issuance date.",
                                                validate: (value) => {
                                                    // Convert string value to Date object using Moment.js
                                                    const parsedDate =moment(value).format('L')
                                                    const today = moment(new Date()).format('L')
                                                    const oneYearAgo = moment().subtract(1, 'years').format('L');
                                                    console.log({parsedDate, today, oneYearAgo});
                                                    if (parsedDate > today) {
                                                        return "Future dates are not allowed.";
                                                    }
                                                    return true; // Valid date
                                                },
                                        })}
                                        type="date"
                                        className="w-full border p-2 rounded-md my-2 text-black outline-blue-500 transition-all"
                                    />
                                    <span className="text-red-500 text-xs">
                                        {errors?.dateTaxCode?.message}
                                    </span>
                                </div>
                                <div className="my-2">
                                    <span className="text-[16px] bg-white text-black px-2 font-semibold">
                                        Representative Name
                                    </span>
                                    <input
                                        type="text"
                                        className="w-full border p-2 rounded-md my-2 text-black outline-blue-500 transition-all"
                                        value={user?.fullName}
                                        disabled
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="my-2">
                                    <span className="text-[16px] bg-white text-black px-2 font-semibold">
                                        Phone Number
                                    </span>
                                    <input
                                        {...register("phoneNumber", {
                                            required:
                                                "Phone number is required",
                                            minLength: {
                                                value: 10,
                                                message:
                                                    "Please enter phone number > 9 ",
                                            },
                                            maxLength: {
                                                value: 11,
                                                message:
                                                    "Please enter phone number  < 12",
                                            },
                                        })}
                                        type="tel"
                                        className="w-full border p-2 rounded-md my-2 text-black outline-blue-500 transition-all"
                                        onChange={handlePhoneNumberChange}
                                    />
                                    <span className="text-red-500 text-xs">
                                        {errors?.phoneNumber?.message}
                                    </span>
                                </div>
                                <div className="my-2">
                                    <span className="text-[16px] bg-white text-black px-2 font-semibold">
                                        Place Of Issuance Of Tax Code
                                    </span>
                                    <input
                                        {...register("placeTaxCode", {
                                            required: true,
                                            minLength: {
                                                value: 10,
                                                message:
                                                    "Place tax code should be at least 10 characters",
                                            },
                                            maxLength: {
                                                value: 200,
                                                message:
                                                    "Place tax code should be at most 200 characters",
                                            },
                                        })}
                                        type="text"
                                        className="w-full border p-2 rounded-md my-2 text-black outline-blue-500 transition-all"
                                    />
                                    {errors.placeTaxCode && (
                                        <span className="text-red-500 text-xs">
                                            {errors.placeTaxCode.message}
                                        </span>
                                    )}
                                </div>
                                <div className="my-2">
                                    <span className="text-[16px] bg-white text-black px-2 font-semibold">
                                        Business Address
                                    </span>
                                    <input
                                        {...register("address", {
                                            required: true,
                                            minLength: {
                                                value: 10,
                                                message:
                                                    "Address should be at least 10 characters",
                                            },
                                            maxLength: {
                                                value: 200,
                                                message:
                                                    "Address should be at most 200 characters",
                                            },
                                        })}
                                        type="text"
                                        className="w-full border p-2 rounded-md my-2 text-black outline-blue-500 transition-all"
                                    />
                                    {errors.address && (
                                        <span className="text-red-500 text-xs">
                                            {errors.address.message}
                                        </span>
                                    )}
                                </div>
                                <div className="my-2">
                                    <span className="text-[16px] bg-white text-black px-2 font-semibold">
                                        Position
                                    </span>
                                    <input
                                        {...register("position", {
                                            required: true,
                                            minLength: {
                                                value: 1,
                                                message:
                                                    "Position should not be empty",
                                            },
                                            maxLength: {
                                                value: 50,
                                                message:
                                                    "Position should be at most 50 characters",
                                            },
                                        })}
                                        type="text"
                                        className="w-full border p-2 rounded-md my-2 text-black font-semibold outline-blue-500 transition-all"
                                    />
                                    {errors.position && (
                                        <span className="text-red-500 text-xs">
                                            {errors.position.message}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className=" mb-6">
                            <span className="text-[16px] bg-white text-black  px-2 font-semibold">
                                Image Of The Auction Organization
                            </span>
                            <label
                                htmlFor="fileInput"
                                className="flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 mt-2"
                            >
                                {selectedFile ? (
                                    <div className="flex items-center justify-center">
                                        <img
                                            src={URL.createObjectURL(
                                                selectedFile
                                            )}
                                            alt="Uploaded File"
                                            className="max-h-40 max-w-full"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                        <IoCloudUploadSharp className="text-5xl text-gray-500" />
                                        <p className="mb-2 text-sm text-gray-500 text-center">
                                            <span className="font-semibold">
                                                Click to upload or drag and drop
                                            </span>
                                        </p>
                                        <p className="text-xs text-gray-500 flex items-center justify-center">
                                            SVG, PNG, JPG or GIF
                                        </p>
                                    </div>
                                )}
                                <input
                                    id="fileInput"
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>
                        <div>
                            <div className="flex">
                                <input
                                    {...register("isCheck", { required: true })}
                                    type="checkbox"
                                    className="border p-2 m-2 h-3 w-5"
                                />
                                <div className="max-sm:text-sm">
                                    <span>I commit to comply with </span>
                                    <span
                                        className="text-blue-500 hover:cursor-pointer hover:underline hover:text-blue-600 transition-all"
                                        onClick={() => setOpenModalRule(true)}
                                    >
                                        {"the Rights and Responsibilities"}
                                    </span>
                                    <span>
                                        {" "}
                                        of Auction Participants (Regulations
                                        according to auction assets), Customer
                                        information security policy, Dispute
                                        resolution mechanism, Operational
                                        regulations at the online auction
                                        website. online TrendyBids.vn
                                    </span>
                                </div>
                            </div>
                            {errors.isCheck && (
                                <span className="text-red-500 text-xs">
                                    Please check the box to proceed
                                </span>
                            )}
                        </div>
                        {/* payment for register censor */}
                        <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center">
                                {statusPayment ? (
                                    <FaCheckCircle className="w-5 text-green-500 mx-2 " />
                                ) : (
                                    <span className="w-4 h-4 rounded-full border mx-2 border-solid border-gray-800"></span>
                                )}
                                <span>
                                    You must pay a deposit for organizational
                                    registration of 2000.00 USD
                                </span>
                            </div>
                            {statusPayment === true ? (
                                <span
                                    className="border border-solid border-green-600 text-blue-600  ml-2 px-4 py-2 rounded-lg "
                                    disabled
                                >
                                    Payment
                                </span>
                            ) : (
                                <span
                                    className="border border-solid border-green-600 text-blue-600 hover:bg-green-500 hover:text-white ml-2 px-4 py-2 rounded-lg cursor-pointer"
                                    onClick={(e) => {
                                        setOpenPayment(true);
                                    }}
                                >
                                    Payment
                                </span>
                            )}
                            {openPayment && (
                                <ModalPay
                                    modalOpen={setOpenPayment}
                                    amount={2000}
                                    accessToken={accessToken}
                                    setStatus={setStatusPayment}
                                    status={statusPayment}
                                    index={6}
                                />
                            )}
                            {openModalRule && (
                                <RuleModel
                                    open={openModalRule}
                                    setOpen={setOpenModalRule}
                                    rules={rules}
                                />
                            )}
                        </div>
                        <div className="text-center my-4">
                            <button className="border py-2 px-10 rounded-md bg-blue-500 hover:opacity-75 text-white font-semibold transition-all">
                                {loading ? (
                                    <div>
                                        <CircularProgress color="secondary" />
                                    </div>
                                ) : (
                                    <span>SUBMIT</span>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterCensor;

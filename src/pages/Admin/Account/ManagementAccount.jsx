import React, { useEffect, useState } from 'react'
import { getAllUsers, deleteUser } from '../../../services/admin';
import { Pagination } from '@mui/material';
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { LiaUserCheckSolid } from "react-icons/lia";
import noDataSvg from "../../../assets/vectors/no data.svg";
import Swal from "sweetalert2";
import ViewEditUser from './ViewEditUser';
import HeaderAdmin from "../../../components/Header/HeaderAdmin";
const ManagementAccount = () => {
    const accessToken = localStorage.getItem('access-token');
    const [accounts, setAccounts] = useState([])
    const [totalPage, setTotalPage] = useState(1)
    const [pageNumber, setPageNumber] = useState(1)
    const [search, setSearch] = useState("");
    const [totalActive, setTotalActive] = useState(0)
    const [totalUser, setTotalUser] = useState(0)
    const [change, setChange] = useState(false)
    const [userViewEdit, setUserViewEdit] = useState(false)
    const [modalOpen, setModalOpen] = useState(false);


    const handlePageChange = (event, page) => {
        setPageNumber(page);
    };

    useEffect(() => {
        try {
            let params = { status: 'Active' };
            const fetchData = async () => {
                const dataUsser = await getAllUsers(accessToken, params)
                setTotalActive(dataUsser?.data?.totalItem)
                const totalAcc = await getAllUsers(accessToken, {})
                setTotalUser(totalAcc?.data?.totalItem)
            }
            if (accessToken) {
                fetchData();
            }
        } catch (error) {
            console.log(error);
        }
    }, [accessToken])

    useEffect(() => {
        try {
            let params = { page: pageNumber, limit: 6 };
            if (search !== '') {
                params.email = search
                setPageNumber(1)
            }
            const fetchDataProduct = async () => {
                const dataUsser = await getAllUsers(accessToken, params)
                setAccounts(dataUsser?.data?.users)
                setTotalPage(dataUsser?.data.totalPage)
            }
            if (accessToken) {
                fetchDataProduct();
            }
        } catch (error) {
            console.log(error);
        }

    }, [accessToken, pageNumber, search, change])

    const handleModalEdit = (user) => {
        setUserViewEdit(user)
        setModalOpen(true)
    }
    const handleDeleteAuction = async (id) => {
        Swal.fire({
            title: "Are you sure you want to Delete?",
            text: "Be careful you will lose data",
            icon: "Error",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Agree To Delete",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await deleteUser(accessToken, id);
                if (response?.status === 200) {
                    setChange(!change);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Delete user successfully",
                        icon: "success",
                    });
                }
            }
        });
    };

    return (
        <div className='w-[1230px] px-1.5 mx-auto h-screen relative'>
            <HeaderAdmin pageName={"Account"}/>
            <div className='grid grid-cols-12 gap-2 mb-2'>
                <div className='col-span-7'>
                    <div className='grid grid-cols-3 gap-4'>
                        <div className='col-span-1'>
                            <div className="p-1 border-[0.5px] border-gray-400 rounded-lg text-black bg-white flex items-center mt-5 md:mt-0 ">
                                <AiOutlineUsergroupAdd className="text-5xl text-blue-400 mx-2" />
                                <div className="">
                                    <p className="text-xl font-bold">{totalUser}</p>
                                    <p className="font-medium text-xs text-gray-300">Total User</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-1'>
                            <div className="p-1 border-[0.5px] border-gray-400 rounded-lg text-black bg-white flex items-center mt-5 md:mt-0 ">
                                <LiaUserCheckSolid className="text-5xl text-blue-400 mx-2" />
                                <div className="">
                                    <p className="text-xl font-bold">{totalActive}</p>
                                    <p className="font-medium text-xs text-gray-300">User is active</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-span-5'>
                    <form className="grid place-items-end">
                        <div className="flex w-[90%] bg-white rounded-lg border-[0.5px] border-gray-400">
                            <input
                                type="search"
                                className="w-full border-none bg-transparent px-4 py-1 text-gray-900 focus:outline-none rounded-lg"
                                placeholder="Search Email"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button
                                className={`m-2 px-4 py-2 font-semibold text-gray-100 rounded-lg ${search ? "bg-blue-500" : "bg-gray-500 cursor-not-allowed"
                                    }`}
                                disabled={!search}
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="overflow-x-auto border rounded-md">
                <table className="min-w-full bg-white font-[sans-serif]">
                    <thead className="whitespace-nowrap">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-black">
                                Name
                            </th>
                            < th className="px-6 py-3 text-left text-sm font-semibold text-black">
                                Phone Number
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-black">
                                Role
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-black">
                                Active
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-black">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="whitespace-nowrap">
                        {accounts && accounts.length > 0 ? (
                            accounts?.map((item) => (
                                <tr className="odd:bg-blue-50">
                                    <td className="px-6 py-2.5 text-sm">
                                        <div className="flex items-center cursor-pointer">
                                            <img src={item?.avatarUrl} alt='' className='w-16 h-16 rounded-lg' />
                                            <div className="ml-4">
                                                <p className="text-sm text-black">{item?.fullName}</p>
                                                <p className="text-xs text-gray-400">{item?.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3 text-sm">
                                        {item?.phoneNumber}
                                    </td>
                                    <td className="px-6 py-3 text-sm">
                                        {item?.role?.name}
                                    </td>
                                    <td className="px-6 py-3">
                                        <span
                                            className={`w-[68px] block text-center py-0.5 font-semibold rounded text-xs ${item?.status === "Pre-Active"
                                                ? "border-2 border-blue-500 text-blue-500"
                                                : item?.status === "Active"
                                                    ? "border-2 border-green-500 text-green-500"
                                                    : "border-2 border-red-500 text-red-500"
                                                }`}
                                        >
                                            {item?.status === "Pre-Active"
                                                ? "Pre-Active"
                                                : item?.status === "Active"
                                                    ? "Active"
                                                    : "Suspended"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3">
                                        <button className="mr-4" title="Edit" onClick={() => handleModalEdit(item)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-blue-500 hover:fill-blue-700"
                                                viewBox="0 0 348.882 348.882">
                                                <path
                                                    d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z"
                                                    data-original="#000000" />
                                                <path
                                                    d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z"
                                                    data-original="#000000" />
                                            </svg>
                                        </button>
                                        {
                                            modalOpen && <ViewEditUser modalOpen={setModalOpen} user={userViewEdit} accessToken={accessToken} change={change} setChange={setChange} index={1} />
                                        }
                                        <button
                                            className="mr-4"
                                            title="Delete"
                                            onClick={() => handleDeleteAuction(item.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-red-500 hover:fill-red-700" viewBox="0 0 24 24">
                                                <path
                                                    d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                                                    data-original="#000000" />
                                                <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                                                    data-original="#000000" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            )
                            )) : (
                            <div className="w-full mx-[90%] mt-[30%] flex justify-center items-center flex-col">
                                <img
                                    src={noDataSvg}
                                    alt="anh"
                                    className="w-52 h-52 text-primaryColor mr-8"
                                ></img>
                                <h2 className="text-xl font-medium mt-2 mb-2">
                                    There are no User
                                </h2>
                            </div>
                        )}

                    </tbody>
                </table>
            </div>
            <div className={`absolute bottom-2.5 left-0 right-0 ${accounts && accounts.length > 0 ? "grid place-items-center" : "hidden"}`}>
                <Pagination count={totalPage} color="primary" onChange={handlePageChange} />
            </div>
        </div >
    )
}

export default ManagementAccount

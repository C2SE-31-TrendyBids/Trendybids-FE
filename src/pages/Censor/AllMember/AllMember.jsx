import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { IoMdAddCircle } from "react-icons/io";
import Modal from '@mui/material/Modal';
import { getAllMemberOrganization, addMemberByEmail, getUserByEmail, deleteMember } from '../../../services/censor'
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { IoIosClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { Pagination } from '@mui/material';
import { toast } from 'sonner';


const AllMember = () => {
    const accessToken = localStorage.getItem('access-token');
    const user = JSON.parse(localStorage.getItem("auth"));
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [members, setMembers] = useState([])
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [email, setEmail] = useState('');
    const [userFound, setUserFound] = useState();
    const [search, setSearch] = useState(false);
    const [change, setChange] = useState(false);

    const handlePageChange = (event, page) => {
        setPage(page);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const memberData = await getAllMemberOrganization(accessToken, page, 3)
                console.log(memberData);
                if (memberData?.status === 200) {
                    setMembers(memberData?.data?.member)
                    setTotalPage(memberData?.data?.totalPages)
                }
                setUserFound('')
                setSearch(false)
            } catch (error) {
                console.log(error);
            }
        }
        if (accessToken) {
            fetchData()
        }
    }, [page, open, change])

    useEffect(() => {
        const getDataUserFound = async () => {
            try {
                const userEmail = await getUserByEmail(accessToken, email)
                if (userEmail.status === 200) {
                    setUserFound(userEmail?.data?.user)
                    setSearch(true)
                }
            } catch (error) {
                console.log(error);
            }
        }
        getDataUserFound()
    }, [email])
    const handleAddMember = async () => {
        try {
            if (!userFound) {
                return toast.error("Cann't find user by email")
            }
            const addMember = await addMemberByEmail(accessToken, email);
            if (addMember.status === 200) {
                toast.success("Add member successfully")
                setUserFound('')
                setSearch(false)
                handleClose()
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure you want to Delete?",
            text: "Be careful you will lose data",
            icon: "error",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Agree",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await deleteMember({
                        accessToken,
                        id,
                    });
                    console.log(response);
                    if (response) {
                        setChange(!change);
                        Swal.fire({
                            title: "Deleted!",
                            text: " Delete Member successfully ",
                            icon: "success",
                        });
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: "An error occurred while deleting the product",
                            icon: "error",
                        });
                    }
                } catch (err) {
                    console.error("Unexpected error:", err);
                    Swal.fire({
                        title: "Error!",
                        text: "An unexpected error occurred",
                        icon: "error",
                    });
                }
            }
        });
    };
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        borderRadius: 5,
        boxShadow: 24,
        pt: 2,
        pb: 4,
        pr: 4,
        pl: 4,

    };
    return (
        <div className='max-w-[450px] px-[30px] mt-4'>
            <div className="max-w-full overflow-auto bg-white p-2 rounded-lg no-scrollbar">
                <div className=' grid grid-cols-2 gap-4 '>
                    <div className='col-span-1 text-start text-lg font-semibold text-blue-600'>
                        <span>Team members  </span>
                    </div>
                    <div className='col-span-1 text-end '>
                        {user?.role?.name === 'Censor' && (
                            <button className='bg-[#F4F7FE] text-2xl text-blue-600 text-end px-2 py-2 rounded-lg' onClick={handleOpen}>
                                <IoMdAddCircle className='' />
                            </button>
                        )}
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <div className='flex items-center justify-end text-3xl'>
                                    <IoIosClose className='hover:text-red-500 cursor-pointer' onClick={handleClose} />
                                </div>
                                <div className='mt-2'>
                                    <span>Search Email</span>
                                    <div class="relative text-gray-6s00">
                                        <input type="search" name="serch" placeholder="Search" class="bg-white h-10 border px-5 pr-10 w-full rounded-full text-sm focus:outline-none"
                                            onChange={(e) => {
                                                setEmail(e.target.value)
                                                e.preventDefault()
                                            }} />
                                        <button type="submit" class="absolute right-0 top-0 mt-3 mr-4">
                                            <CiSearch />
                                        </button>
                                    </div>
                                </div>
                                <div className='mt-4 rounded-lg border h-40 w-full'>
                                    <span className='text-sm text-blue-500 ml-2 mt-2 '>Search Results : </span>
                                    {search ? (
                                        <>
                                            {userFound ? (
                                                <div className='flex items-center justify-center'>
                                                    <div className='w-4/5 flex items-center justify-start border shadow-lg rounded-lg mt-8'>
                                                        <div className='h-12 w-12 my-2 ml-4'>
                                                            <img src={userFound?.avatarUrl} alt="avatar" />
                                                        </div>
                                                        <div className='ml-2'>
                                                            <h1 className='text-sm'>{userFound?.email}</h1>
                                                            <span className='text-sm'>{userFound?.fullName}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className='flex items-center justify-center mt-8 font-bold text-2xl'>
                                                    USER NOT FOUND
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <></>
                                    )}

                                </div>
                                <div className='flex items-center justify-center mt-4'>
                                    <button className='font-bold w-full py-2 bg-green-600 text-gray-50 hover:bg-green-800 hover:text-white rounded-lg' onClick={handleAddMember}>Add Member</button>
                                </div>
                            </Box>
                        </Modal>
                    </div>
                </div>
                <div className='bg-[#F9FAFC] w-full py-2 my-2 rounded-md h-[300px]'>
                    {members.map((item) => (
                        <div className='w-full flex items-center justify-center'>
                            <div className='w-[90%] px-[10px] my-4 rounded-lg shadow-lg bg-white flex items-center justify-between'>
                                <div className='flex items-center justify-center'>
                                    <div className='h-12 w-12 my-2'>
                                        <img src={item?.user?.avatarUrl} alt="avatar" />
                                    </div>
                                    <div className='ml-2'>
                                        <h1 className='text-sm'>{item?.user?.email}</h1>
                                        <span className='text-sm'>{item?.user?.fullName}</span>
                                    </div>
                                </div>
                                <div className='text-end '>
                                    {item?.user?.role?.name === 'Member' && user?.role?.name === 'Censor' && (
                                        <motion.button
                                            whileHover={{ scale: 1.5 }}
                                            title="Delete"
                                            onClick={() => handleDelete(item?.user?.id)}
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
                                        </motion.button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex items-center justify-center mt-2'>
                    <Pagination count={totalPage} color="primary" onChange={handlePageChange} />
                </div>

            </div>
        </div >
    )
}

export default AllMember

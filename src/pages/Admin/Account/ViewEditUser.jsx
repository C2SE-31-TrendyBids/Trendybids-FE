import React, { useContext, useEffect, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import * as adminApi from "../../../services/admin"
import { toast } from "sonner";
import moment from 'moment';
import { MdEmail } from "react-icons/md";
import { TbDeviceLandlinePhone } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";
import { FaQrcode } from "react-icons/fa";
import MethodContext from '../../../context/methodProvider';

const ViewEditUser = ({ modalOpen, user, accessToken, change, setChange }) => {
    const id = user?.id
    const [editUser, setEditUser] = useState(false)
    const [roleName, setRoleName] = useState(user?.role?.name)
    const [roleId, setRoleId] = useState(user?.role?.id)
    const [roles, setRoles] = useState([])
    const [name, setName] = useState(user?.fullName)
    const [status, setStatus] = useState(user?.status)
    const [email, setEmail] = useState(user?.email)
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber)
    const [address, setAddress] = useState(user?.address)
    const { validateEmail } = useContext(MethodContext)
    const [error, setError] = useState({});
    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await adminApi.getAllRoles(accessToken)
                setRoles(response?.data?.roles)
            }
            if (accessToken) {
                fetchData();
            }
        } catch (error) {
            console.log(error);
        }
    }, [accessToken])
    const handleEdit = async () => {
        let body = {}
        const newError = {};
        if (name !== user?.fullName) {
            if (name.length >= 3 && name.length <= 30) {
                body.fullName = name
            }
            else {
                newError.name = "The name must be at least 3 characters and no more than 30 characters";
            }
        }
        if (status !== user?.status) {
            body.status = status
        }
        if (email !== user?.email) {
            if (validateEmail(email)) {
                body.email = email;
            } else {
                newError.email = "Please enter a valid email address";
            }
        }
        if (phoneNumber !== user?.phoneNumber) {
            if (phoneNumber.length > 9 && phoneNumber.length < 12) {
                body.phoneNumber = phoneNumber
            } else {
                newError.phoneNumber = "Please enter a valid phone number (between 10 and 11 digits)";
            }
        }
        if (address !== user?.address) {
            if (address.length > 4) {
                body.address = address
            } else {
                newError.address = "Please enter a valid address (at least 5 characters)";
            }
        }
        // if (roleId !== user?.role?.id) {
        body.roleId = roleId
        // }
        if (Object.keys(newError).length === 0) {
            console.log(body);
            const response = await adminApi.editUser(accessToken, id, body)
            console.log(response);
            if (response?.status === 200) {
                toast.success(response?.data?.message)
            } else {
                toast("Edit user failed")
            }
            setChange(!change)
            modalOpen(false)
        } else {
            setError(newError);
        }
    }
    const handleRole = (event) => {
        setRoleId(event.target.value)
        setRoleName()
    }
    const handleStatus = (event) => {
        setStatus(event.target.value)
    }

    return (
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full bg-black bg-opacity-5 overflow-auto font-[sans-serif]">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-md p-6 relative animate-fade-up animate-duration-200 animate-delay-[6ms] animate-ease-linear">
                <div className="flex items-center pb-3 border-b text-[#007bff]">
                    <h3 className="text-xl font-bold flex-1">USER DETAIL</h3>
                    <button onClick={() => modalOpen(false)}>
                        <IoMdClose className="ml-2 cursor-pointer shrink-0 fill-black hover:fill-red-500 text-2xl" />
                    </button>
                </div>
                <div className="my-4 m-auto">
                    <div className='grid grid-cols-12 gap-2'>
                        <div className='col-span-4 '>
                            <img src={user?.avatarUrl} alt="hinhanh" className='w-full h-full' />
                        </div>
                        <div className='col-span-8 text-black ml-2'>
                            <div className='text-center text-2xl font-thin text-[#007bff]'>
                                {editUser ? (
                                    <>
                                        <input className='border p-2 text-center rounded-lg' value={name} onChange={(e) => { setName(e.target.value) }} />
                                        {error.name && <div className="text-red-500 text-xs">{error.name}</div>}
                                    </>
                                ) : (

                                    <span>{name}</span>
                                )}
                            </div>
                            <div className='grid grid-cols-5 w-full mx-auto'>
                                <div className='col-span-2 font-semibold'>
                                    <div className='flex my-8 '>
                                        <FaQrcode className='mr-2 font-semibold text-2xl text-blue-500' /> Role :
                                    </div>
                                    <div className='flex my-8 '>
                                        <FaQrcode className='mr-2 font-semibold text-2xl text-blue-500' /> Status :
                                    </div>
                                    <div className='flex my-8 '  >
                                        <MdEmail className='mr-2 font-semibold text-2xl text-blue-500' /> Email :
                                    </div>
                                    <div className='flex my-8 '  >
                                        <TbDeviceLandlinePhone className='mr-2 font-semibold text-2xl text-blue-500' /> Phone Number :
                                    </div>
                                    <div className='flex my-8 '>
                                        <FaLocationDot className='mr-2 font-semibold text-2xl text-blue-500' /> Address :
                                    </div>
                                </div>
                                <div className='col-span-3'>
                                    {editUser ? (
                                        <div className=''>
                                            <select
                                                className="flex my-4 w-full border-2 p-2 rounded-lg"
                                                onChange={handleRole}
                                                value={roleName}
                                            >
                                                {roles?.map((item) => (
                                                    <option value={item?.id}>{item?.name}</option>
                                                ))}
                                            </select>
                                            <select
                                                className="flex my-4 w-full border-2 p-2 rounded-lg"
                                                onChange={handleStatus}
                                                value={status}
                                            >
                                                <option value="Pre-Active">Pre-Active</option>
                                                <option value="Active">Active</option>
                                                <option value="Suspended">Suspended</option>
                                            </select>
                                            <input type="email" className='w-full border-2 p-2 flex my-4 rounded-lg ' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                            {error.email && <div className="text-red-500 text-xs">{error.email}</div>}
                                            <input type="text" className='w-full border-2 p-2 flex my-4 rounded-lg ' value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }} />
                                            {error.phoneNumber && <div className="text-red-500 text-xs">{error.phoneNumber}</div>}
                                            <input type="text" className='w-full border-2 p-2 flex my-4 rounded-lg ' value={address} onChange={(e) => { setAddress(e.target.value) }} />
                                            {error.address && <div className="text-red-500 text-xs">{error.address}</div>}
                                        </div>
                                    ) : (
                                        <>
                                            <div className='flex my-8 '>{roleName}</div>
                                            <div className='flex my-8 '>{status}</div>
                                            <div className='flex my-8 '>{email}</div>
                                            <div className='flex my-8 '>{phoneNumber || "No phone number"}</div>
                                            <div className='flex my-8 '>{address || "No address"}</div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="border-t flex justify-end space-x-4">
                    {editUser ? (
                        <>
                            <div className="flex gap-2 flex-wrap justify-center p-4">
                                <button
                                    type="button"
                                    className={`text-white bg-blue-700 hover:bg-blue-800  outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center `}
                                    onClick={(e) => handleEdit()}
                                >
                                    Save
                                </button>
                            </div>
                            <div className="flex gap-2 flex-wrap justify-center p-4 ">
                                <button type="button"
                                    className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700  outline-none inline-flex items-center"
                                    onClick={(e) => setEditUser(false)}>Cancel</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex gap-2 flex-wrap justify-center p-4">
                                <button
                                    type="button"
                                    className={`text-white bg-blue-700 hover:bg-blue-800  outline-none  font-medium rounded-lg text-sm px-6 py-2.5 text-center inline-flex items-center `}
                                    onClick={(e) => setEditUser(true)}
                                >
                                    Edit
                                </button>
                            </div>
                            <div className="flex gap-2 flex-wrap justify-center p-4 ">
                                <button type="button"
                                    className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 outline-none  inline-flex items-center"
                                    onClick={(e) => modalOpen(false)}>Cancel</button>
                            </div>
                        </>
                    )}
                </div>

            </div>
        </div>
    )
}

export default ViewEditUser

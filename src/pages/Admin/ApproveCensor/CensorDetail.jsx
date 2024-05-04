import React, {useContext, useState} from 'react'
import { IoMdClose } from "react-icons/io";
import { acceptAndRejectCensor } from "../../../services/admin"
import { toast } from "sonner";
import moment from 'moment';
import { BsCalendarDate } from "react-icons/bs";
import { TbDeviceLandlinePhone } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";
import { FaQrcode } from "react-icons/fa";
import SocketContext from "../../../context/socketProvider";

const CensorDetail = ({ modalOpen, censor, accessToken, change, setChange }) => {
    const socket = useContext(SocketContext)
    const id = censor?.id
    const [loadingReject, setLoadingReject] = useState(false)
    const [loadingAccept, setLoadingAccept] = useState(false)
    console.log(censor);

    const handleAccept = async (type) => {
        setLoadingAccept(true)
        const accept = await acceptAndRejectCensor(accessToken, id, type)
        if (accept?.status === 200) {
            toast.success(accept?.data?.message)
            socket.emit('censor.updateStatus', {
                title: "Approve censor",
                content: "The organization you registered has been accepted by the administrator",
                linkAttach: "/censor/all-product",
                thumbnail: censor?.avatarUrl,
                recipientId: censor?.userId
            })
        } else {
            toast(accept?.error?.response?.data?.message)
        }
        setChange(!change)
        setLoadingAccept(false)
        modalOpen(false)
    }

    const handleReject = async (type) => {
        setLoadingReject(true)
        const reject = await acceptAndRejectCensor(accessToken, id, type)
        if (reject?.status === 200) {
            toast.success(reject?.data?.message)
            socket.emit('censor.updateStatus', {
                title: "Reject censor",
                content: "The organization you registered has been rejected by the administrator",
                linkAttach: null,
                thumbnail: censor?.avatarUrl,
                recipientId: censor?.userId
            })
        } else {
            toast(reject?.error?.response?.data?.message)
        }
        console.log(reject)
        setChange(!change)
        setLoadingReject(false)
        modalOpen(false)
    }
    return (
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full backdrop-blur-[2px] backdrop-opacity-45 backdrop-brightness-90 overflow-auto font-[sans-serif]">
            <div className="w-full max-w-4xl bg-white rounded-md p-6 relative border">
                <div className="flex items-center pb-3 border-b text-[#007bff]">
                    <h3 className="text-xl font-bold flex-1">CENSOR DETAIL</h3>
                    <button onClick={() => modalOpen(false)}>
                        <IoMdClose className="ml-2 cursor-pointer shrink-0 fill-black hover:fill-red-500 text-2xl" />
                    </button>
                </div>
                <div className="my-4">
                    <div className='grid grid-cols-12 h-64 gap-2'>
                        <div className='col-span-4 '>
                            <img src={censor?.avatarUrl} alt="hinhanh" className='w-full h-full' />
                        </div>
                        <div className='col-span-8 text-black ml-2'>
                            <div className='text-center text-2xl font-thin text-[#007bff]'>
                                <span>{censor?.name}</span>
                            </div>
                            <div className='grid grid-cols-5'>
                                <div className='col-span-3 font-semibold'>
                                    <div className='flex my-3 border-b'  >
                                        <TbDeviceLandlinePhone className='mr-2 font-semibold text-2xl text-blue-500' /> Phone Number :
                                    </div>
                                    <div className='flex my-3 border-b'  >
                                        <BsCalendarDate className='mr-2 font-semibold text-2xl text-blue-500' /> Founding :
                                    </div>
                                    <div className='flex my-3 border-b'>
                                        <FaLocationDot className='mr-2 font-semibold text-2xl text-blue-500' /> Address :
                                    </div>
                                    <div className='flex my-3 border-b'>
                                        <FaQrcode className='mr-2 font-semibold text-2xl text-blue-500' /> Tax Code Company :
                                    </div>
                                    <div className='flex my-3 border-b'>
                                        <FaLocationDot className='mr-2 font-semibold text-2xl text-blue-500' /> Place of issuance of Tax code :
                                    </div>
                                    <div className='flex my-3 border-b'>
                                        <BsCalendarDate className='mr-2 font-semibold text-2xl text-blue-500' /> Tax code issuance date :
                                    </div>
                                </div>
                                <div className='col-span-2'>
                                    <div className='flex my-3 border-b'>{censor?.phoneNumber}</div>
                                    <div className='flex my-3 border-b'>{moment(censor?.founding).format('DD - MM - YYYY')}</div>
                                    <div className='flex my-3 border-b'>{censor?.address}</div>
                                    <div className='flex my-3 border-b'>{censor?.companyTaxCode || "XXX-XXXX-XXXX"}</div>
                                    <div className='flex my-3 border-b'>{censor?.placeTaxCode || "Lien Chieu - Da Nang"}</div>
                                    <div className='flex my-3 border-b'>{moment(censor?.taxCodeIssuanceDate).format('DD - MM - YYYY') || "01-01-2001"}</div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

                <div className="border-t flex justify-end pt-6 space-x-4">
                    {loadingReject ? (
                        <div className="flex gap-2 flex-wrap justify-center p-4 ">
                            <button disabled type="button" className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 inline-flex items-center">
                                <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                                </svg>
                                Loading...
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-2 flex-wrap justify-center p-4 ">
                            <button type="button"
                                className={`py-2.5 px-5 me-2 text-sm font-medium text-white bg-red-600 rounded-lg border border-gray-200 hover:bg-red-700 hover:text-white focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 inline-flex items-center ${censor?.status === 'Rejected' ? 'bg-gray-500 text-black cursor-not-allowed hover:bg-slate-500' : ''}`}
                                onClick={(e) => handleReject("2")}
                                disabled={censor?.status === 'Rejected'}
                            >
                                Reject
                            </button>
                        </div>
                    )}
                    {loadingAccept ? (
                        <div className="flex gap-2 flex-wrap justify-center p-4 ">
                            <button disabled type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  inline-flex items-center">
                                <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg>
                                Loading...
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-2 flex-wrap justify-center p-4">
                            <button
                                type="button"
                                className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center ${censor?.status === 'Verified' ? 'bg-gray-500 text-black cursor-not-allowed hover:bg-slate-500' : ''}`}
                                onClick={(e) => handleAccept("1")}
                                disabled={censor?.status === 'Verified'}
                            >
                                Accept
                            </button>
                        </div>

                    )}
                    <div className="flex gap-2 flex-wrap justify-center p-4 ">
                        <button type="button"
                            className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 inline-flex items-center"
                            onClick={(e) => modalOpen(false)}>Cancel</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CensorDetail

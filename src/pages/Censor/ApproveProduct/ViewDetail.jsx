import React, { useContext, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import * as censorAPI from "../../../services/censor"
import { toast } from "sonner";
import moment from 'moment';
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineNavigateNext } from "react-icons/md";
import { IoPricetagsOutline } from "react-icons/io5";
import { MdOutlineCategory } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { BsCalendarDate } from "react-icons/bs";
import SummaryUserModal from "../../../components/SummaryUserModal/SummaryUserModal";
import SocketContext from "../../../context/socketProvider";
import { Button, Textarea } from "@mui/joy";
import logo from "../../../assets/images/logo.jpg";
import { Spinner } from "@material-tailwind/react";
import { FaCheckCircle } from "react-icons/fa";
import ModalPay from '../../Payment/ModalPay';

const ViewDetail = ({ modalOpen, product, accessToken, change, setChange, index }) => {
    const socket = useContext(SocketContext)
    const [currentIndex, setCurrentIndex] = useState(1);
    const images = product?.prdImages
    const id = product?.id
    const owner = product?.owner
    const [reasonReject, setReasonReject] = useState({
        isOpen: false,
        value: "",
    })
    const [loadingReject, setLoadingReject] = useState(false)
    const [statusPayment, setStatusPayment] = useState(false)
    const [openPayment, setOpenPayment] = useState(false)

    const back = () => {
        if (currentIndex > 1) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const next = () => {
        if (currentIndex < images.length) {
            setCurrentIndex(currentIndex + 1);
        } else if (currentIndex <= images.length) {
            setCurrentIndex(images.length - currentIndex + 1);
        }
    };
    const handleAction = async (isAccept) => {
        if (isAccept) {
            const verify = await censorAPI.verifyProduct(id, accessToken)
            if (verify?.status === 200) {
                socket.emit('product.updateStatus', {
                    title: `Censor - ${product?.censor?.name}: Verify product`,
                    content: `${product?.productName} has been successfully approved by censor`,
                    linkAttach: "/profile/management-post",
                    recipientId: product?.owner?.id,
                    thumbnail: product?.prdImages[0]?.prdImageURL,
                })
                toast.success(verify?.data?.message)
            } else {
                toast(verify?.data?.message)
            }
            setChange(!change)
            modalOpen(false)
        } else {
            setReasonReject({ ...reasonReject, isOpen: true })
        }
    }

    const handleSendReasonReject = async (e, isReject) => {
        e.preventDefault()
        if (isReject) {
            if (reasonReject.value === "") return
            setLoadingReject(true)

            // Call API to send reason reject
            const reject = await censorAPI.rejectProduct(id, accessToken, reasonReject.value)
            if (reject?.status === 200) {
                socket.emit('product.updateStatus', {
                    title: `Censor - ${product?.censor?.name}: Reject product`,
                    content: `${product?.productName} has been rejected by censor: ${reasonReject.value}`,
                    linkAttach: "/profile/management-post",
                    recipientId: product?.owner?.id,
                    thumbnail: product?.prdImages[0]?.prdImageURL,
                })
                toast.success(reject?.data?.message)
                setChange(!change)
                modalOpen(false)
                setLoadingReject(false)
            } else {
                toast(reject?.data?.message)
            }
        } else {
            setReasonReject({ value: "", isOpen: false })
            setLoadingReject(false)
        }
    }

    return (
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full backdrop-blur-[2px] backdrop-opacity-95 backdrop-brightness-75 overflow-auto font-[sans-serif] animate-fade-up animate-duration-200 animate-delay-[6ms] animate-ease-linear ">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-md p-6 relative">
                <div className="flex items-center pb-3 border-b text-[#007bff]">
                    <h3 className="text-xl font-bold flex-1">PRODUCT DETAIL</h3>
                    <button onClick={() => modalOpen(false)}>
                        <IoMdClose className="ml-2 cursor-pointer shrink-0 fill-black hover:fill-red-500 text-2xl" />
                    </button>
                </div>
                <div className="my-4">
                    <div className='grid grid-cols-12 h-64 gap-2'>
                        <div className='col-span-5 '>
                            <article className="relative w-full flex flex-shrink-0 overflow-hidden shadow-2xl">
                                <div className="rounded-full bg-gray-300 text-black absolute top-2 right-2 text-sm px-2 text-center z-50">
                                    <span>{currentIndex}</span>/
                                    <span>{product.prdImages.length}</span>
                                </div>

                                {images.map((image, index) => (
                                    <div key={index} className={` h-64 ${currentIndex === index + 1 ? '' : 'hidden'}`} style={{ transition: 'opacity 0.3s' }}>
                                        <img src={image?.prdImageURL || ""} onError={(e) => { e.target.onerror = null; e.target.src = logo; }} alt="Imaget" className="absolute inset-0 z-10 h-full w-full object-cover" />
                                    </div>
                                ))}
                                <button onClick={back} className="absolute top-1/2 -translate-y-1/2 w-11 h-11 flex justify-center items-center rounded-full shadow-md z-10 bg-gray-100 hover:bg-gray-200">
                                    <IoIosArrowBack />
                                </button>
                                <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 w-11 h-11 flex justify-center items-center rounded-full shadow-md z-10 bg-gray-100 hover:bg-gray-200 ">
                                    <MdOutlineNavigateNext />
                                </button>
                            </article>
                        </div>
                        <div className='col-span-7 text-black ml-2'>
                            <div className='text-center text-2xl font-thin text-[#007bff]'>
                                <span>{product?.productName}</span>
                            </div>
                            <div className='m-1'>
                                <span className='text-base font-semibold'> Description :</span> <br />
                                <span className='ml-2'>- {product?.description}</span>
                            </div>
                            <div className='grid grid-cols-5 gap-4 '>
                                <div className='col-span-2 font-semibold'>
                                    <div className='flex my-1'  >
                                        <IoPricetagsOutline className='mr-2 font-semibold' /> Stating Price :
                                    </div>
                                    <div className='flex my-1'>
                                        <MdOutlineCategory className='mr-2 font-semibold' /> Category :
                                    </div>
                                    <div className='flex my-1'>
                                        <IoPersonOutline className='mr-2 font-semibold' /> Owner Name :
                                    </div>
                                    <div className='flex my-1'>
                                        <MdOutlineEmail className='mr-2 font-semibold' /> Owner Email :
                                    </div>
                                    <div className='flex my-1'>
                                        <BsCalendarDate className='mr-2 font-semibold' /> Dispatch date :
                                    </div>
                                </div>
                                <div className='col-span-3'>
                                    <div className=' text-red-500 my-1'> $ {product?.startingPrice}</div>
                                    <div className='my-1'>{product?.category.name}</div>
                                    <div className='my-1 cursor-pointer hover:underline'>
                                        <SummaryUserModal owner={owner}>
                                            <span>{product?.owner.fullName}</span>
                                        </SummaryUserModal>
                                    </div>
                                    <div className='my-1 whitespace-nowrap'>{product?.owner.email}</div>
                                    <div className='my-1'>{moment(product?.createdAt).format('DD - MM - YYYY')}</div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                {index === 0 ? (
                    <div className="border-t flex justify-end pt-6 space-x-4">
                        <button type="button"
                            className="px-6 py-2 rounded-md text-black text-sm border-none outline-none bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
                            onClick={() => handleAction(false)}>Reject</button>
                        <button type="button"
                            className="px-6 py-2 rounded-md text-white text-sm border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
                            onClick={() => handleAction(true)}
                        >Accept</button>
                    </div>
                ) : (
                    <div className='flex justify-end pt-6 space-x-4'>
                        <button type="button"
                            className="px-6 py-2 rounded-md text-black text-sm border-none outline-none bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
                            onClick={() => modalOpen(false)}>Cancel</button>
                    </div>
                )}
            </div>
            {reasonReject.isOpen && (
                <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif] animate-fade-up animate-duration-200 animate-delay-[6ms] animate-ease-linear">
                    <div className="w-full max-w-xl bg-white shadow-lg rounded-md p-4 relative">
                        <label className="block mb-2 text-xl font-bold text-blue-600 text-center">Reason for reject</label>
                        <Textarea
                            placeholder="Type something..."
                            minRows={6}
                            variant="soft"
                            value={reasonReject.value}
                            onChange={(e) => setReasonReject({ ...reasonReject, value: e.target.value })}
                        />
                        <div className="flex items-center justify-between my-2">
                            <div className="flex items-center">
                                {statusPayment ? (
                                    <FaCheckCircle className="w-5 text-green-500 mx-2 " />
                                ) : (
                                    <span className="w-4 h-4 rounded-full border mx-2 border-solid border-gray-800"></span>
                                )}
                                <span>Return money for subscriber 2000.00 USD</span>
                            </div>
                            {statusPayment === true ? (
                                <span className="border border-solid border-green-600 text-blue-600 text-sm ml-2 px-4 py-1 rounded-lg " disabled >Payment</span>

                            ) : (
                                <span className="border border-solid border-green-600 text-sm text-blue-600 hover:bg-green-500 hover:text-white ml-2 px-4 py-1 rounded-lg cursor-pointer" onClick={(e) => { setOpenPayment(true) }}>Payment</span>
                            )}
                            {
                                openPayment && <ModalPay modalOpen={setOpenPayment} amount={20} accessToken={accessToken} setStatus={setStatusPayment} status={statusPayment} index={2} receiverId={product?.owner?.id} auctionId={null} />
                            }

                        </div>
                        <div className="flex justify-end items-center gap-x-3 mt-4">
                            <Button variant="outlined" onClick={(e) => handleSendReasonReject(e, false)} color="danger">Cancel</Button>
                            <Button sx={{ paddingX: "35px" }} onClick={(e) => handleSendReasonReject(e, true)} color="primary">
                                {loadingReject ? (
                                    <div className="flex gap-2 flex-wrap justify-center items-center">
                                        <Spinner className="w-4 h-4"></Spinner>
                                        Loading...
                                    </div>
                                ) : (
                                    <span>Send</span>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ViewDetail

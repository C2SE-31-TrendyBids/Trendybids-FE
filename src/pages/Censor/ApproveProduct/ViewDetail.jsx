import React, { useState } from 'react'
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

const ViewDetail = ({ modalOpen, product, accessToken, change, setChange, index }) => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const images = product?.prdImages
    const id = product?.id

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
                toast.success(verify?.data?.message)
            } else {
                toast(verify?.data?.message)
            }
        } else {
            const reject = await censorAPI.rejectProduct(id, accessToken)
            if (reject?.status === 200) {
                toast.success(reject?.data?.message)
            } else {
                toast(reject?.data?.message)
            }
        }
        setChange(!change)
        modalOpen(false)

    }
    return (
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif] animate-fade-up animate-duration-200 animate-delay-[6ms] animate-ease-linear ">
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
                                        <img src={image.prdImageURL} alt="Imaget" className="absolute inset-0 z-10 h-full w-full object-cover" />
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
                                    <div className='my-1'>{product?.owner.fullName}</div>
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
                            onClick={(e) => handleAction(false)}>Reject</button>
                        <button type="button"
                            className="px-6 py-2 rounded-md text-white text-sm border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
                            onClick={(e) => handleAction(true)}
                        >Accept</button>
                    </div>
                ) : (
                    <div className='flex justify-end pt-6 space-x-4'>
                        <button type="button"
                            className="px-6 py-2 rounded-md text-black text-sm border-none outline-none bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
                            onClick={(e) => modalOpen(false)}>Cance</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ViewDetail

import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import * as censorAPI from "../../../services/censor"
import { toast } from "sonner";
import moment from 'moment';

const ModalPost = ({ modalOpen, productId, accessToken, change, setChange }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [startDay, setStartDay] = useState('');
    const [endDay, setEndDay] = useState('');
    const [loading, setLoading] = useState(false)

    const hanhlePost = async () => {
        setLoading(true)
        const currentDate = moment().format('MM-DD-YYYY');
        console.log(currentDate);
        console.log(startDay);
        console.log(startTime);
        const startDateTime = new Date(startDay + "T" + startTime + ":00");
        console.log(startDateTime);
        const endDateTime = new Date(endDay + "T" + endTime + ":00");
        const startTimePlusOneHour = new Date(startDateTime.getTime() + (1 * 60 * 60 * 1000))
        let datetimeStart = startDay + " " + startTime;
        let datetimeEnd = endDay + " " + endTime;

        if (title === '' || description === '' || startDay === '' || startTime === "" || endDay === "" || endTime === '') {
            toast.error("You must fill in all fields on the form.")
            setLoading(false)
            return
        }
        if (startDay <= currentDate) {
            toast.error("Start date must be after current date.");
            setLoading(false);
            return;
        }
        if (endDateTime <= startTimePlusOneHour) {
            toast.error("End time must be at least 1 hour after start time.");
            setLoading(false);
            return;
        }

        let body = {
            title: title,
            description: description,
            startTime: datetimeStart,
            endTime: datetimeEnd,
            productId: productId
        }
        const postProductAuction = await censorAPI.postAuctionSession(body, accessToken)
        if (postProductAuction?.statusCode === 200) {
            toast.success(postProductAuction?.message)
        }
        else {
            toast.error("Error creating auction products")
        }
        setChange(!change)
        modalOpen(false)
    }

    return (
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
            <div className="w-full max-w-xl bg-white shadow-lg rounded-md p-6 relative">
                <div className="flex items-center pb-3 border-b text-[#007bff]">
                    <h3 className="text-xl font-bold flex-1">POST PRODUCT AUCTION</h3>
                    <button onClick={() => modalOpen(false)}>
                        <IoMdClose className="ml-2 cursor-pointer shrink-0 fill-black hover:fill-red-500 text-2xl" />
                    </button>
                </div>
                <div className="my-4">
                    <div className="space-y-4 px-2 max-w-sm mx-auto font-[sans-serif]">
                        <div className="flex items-center">
                            <label className="text-black w-36 text-sm">Title</label>
                            <input type="text" placeholder="Input Title"
                                className="px-2 py-2 w-full border-b-2 border-green-500 focus:border-[#007bff] outline-none text-sm bg-white"
                                onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="flex items-center max-w-lg mx-auto w-full font-[sans-serif]">
                            <label className="text-black text-sm w-36">Description</label>
                            <div className="w-full">
                                <textarea placeholder='Input description'
                                    className="px-2 py-2 bg-white w-full text-sm border rounded border-green-500 outline-[#007bff] font-[sans-serif]"
                                    rows="4"
                                    onChange={(e) => setDescription(e.target.value)} />
                            </div>
                        </div>
                        <div className='flex items-center justify-between'>
                            <div className='w-[58%]'>
                                <label className="text-sm mb-2 block">Start Date</label>
                                <input type="date" onChange={(e) => setStartDay(e.target.value)} className="px-4 py-3 bg-[#f0f1f2] text-black w-full text-sm outline-[#007bff] rounded" />
                            </div>
                            <div className='w-[40%]'>
                                <label className="text-sm mb-2 block">Start Time</label>
                                <input type="time" onChange={(e) => setStartTime(e.target.value)} className="px-4 py-3 bg-[#f0f1f2] text-black w-full text-sm outline-[#007bff] rounded" />
                            </div>
                        </div>
                        <div className='flex items-center justify-between'>
                            <div className='w-[58%]'>
                                <label className="text-sm mb-2 block">End Date</label>
                                <input type="date" onChange={(e) => setEndDay(e.target.value)} className="px-4 py-3 bg-[#f0f1f2] text-black w-full text-sm outline-[#007bff] rounded" />
                            </div>
                            <div className='w-[40%]'>
                                <label className="text-sm mb-2 block">End Time</label>
                                <input type="time" onChange={(e) => setEndTime(e.target.value)} className="px-4 py-3 bg-[#f0f1f2] text-black w-full text-sm outline-[#007bff] rounded" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t flex justify-end pt-6 space-x-4">
                    <button type="button"
                        className="px-6 py-2 rounded-md text-black text-sm border-none outline-none bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
                        onClick={(e) => modalOpen(false)}>Cancel</button>
                    <button type="button"
                        className="px-6 py-2 rounded-md text-white text-sm border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
                        onClick={(e) => hanhlePost()}>Post</button>
                </div>
            </div>
        </div>
    )
}

export default ModalPost

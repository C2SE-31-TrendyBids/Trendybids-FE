import React from 'react'
import { IoMdClose } from "react-icons/io";
import * as censorAPI from "../../../services/censor"
import { toast } from "sonner";
import moment from 'moment';
import { useForm } from "react-hook-form";

const ModalPost = ({ modalOpen, productId, accessToken, change, setChange }) => {

    const tomorrowFormatted = moment().add(1, 'days').format('YYYY-MM-DDTHH:mm');

    const validateEndTime = (value, startDate) => {
        const selectedEndDate = new Date(value);
        const selectedStartDate = new Date(startDate);
        const startTimePlusOneHour = new Date(selectedStartDate.getTime() + (1 * 60 * 60 * 1000));

        if (selectedEndDate <= startTimePlusOneHour) {
            return "End time must be at least 1 hour after start time.";
        }
        return true;
    };

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            title: '',
            description: '',
            startDate: '',
            endDate: ''
        },
    });

    const onSubmit = async (data) => {
        console.log(data);

        let body = {
            title: data.title,
            description: data.description,
            startTime: data.startDate,
            endTime: data.endDate,
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
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full backdrop-blur-[2px] backdrop-opacity-95 backdrop-brightness-75 overflow-auto font-[sans-serif] animate-fade-up animate-duration-200 animate-delay-[6ms] animate-ease-linear ">
            <div className="w-full max-w-xl bg-white shadow-lg rounded-md p-6 relative">
                <div className="flex items-center pb-3 border-b text-[#007bff]">
                    <h3 className="text-xl font-bold flex-1">POST PRODUCT AUCTION</h3>
                    <button onClick={() => modalOpen(false)}>
                        <IoMdClose className="ml-2 cursor-pointer shrink-0 fill-black hover:fill-red-500 text-2xl" />
                    </button>
                </div>
                <form className="my-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4 px-2 max-w-sm mx-auto font-[sans-serif]">
                        <div className="flex items-center">
                            <label className="text-black w-36 text-sm">Title</label>
                            <input type="text" placeholder="Input Title"
                                className="px-2 py-2 w-full border-b-2 border-green-500 focus:border-[#007bff] outline-none text-sm bg-white"
                                {...register("title", {
                                    require: true,
                                    minLength: {
                                        value: 5,
                                        message:
                                            "Please enter title > 5 ",
                                    },
                                    maxLength: {
                                        value: 100,
                                        message:
                                            "Please enter title < 100",
                                    },
                                })} />
                            <span className="text-red-500 text-xs">
                                {errors?.title?.message}
                            </span>
                        </div>
                        <div className="flex items-center max-w-lg mx-auto w-full font-[sans-serif]">
                            <label className="text-black text-sm w-36">Description</label>
                            <div className="w-full">
                                <textarea placeholder='Input description'
                                    className="px-2 py-2 bg-white w-full text-sm border rounded border-green-500 outline-[#007bff] font-[sans-serif]"
                                    rows="4"
                                    {...register("description", {
                                        require: true,
                                        minLength: {
                                            value: 5,
                                            message:
                                                "Please enter description > 5 ",
                                        },
                                        maxLength: {
                                            value: 100,
                                            message:
                                                "Please enter description < 1000",
                                        },
                                    })} />
                                <span className="text-red-500 text-xs">
                                    {errors?.description?.message}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center max-w-lg mx-auto w-full font-[sans-serif]">
                            <label className="text-black text-sm w-36">Start Time</label>
                            <div className="w-full">
                                <input type="datetime-local" className="px-4 py-3 bg-[#f0f1f2] text-black w-full text-sm border-green-500 outline-[#007bff] rounded"
                                    {...register("startDate", {
                                        required: "Please enter the start date.",
                                        min: {
                                            value: tomorrowFormatted,
                                            message:
                                                "Start date must be after current date.",
                                        }
                                    })} />
                                <span className="text-red-500 text-xs">
                                    {errors?.startDate?.message}
                                </span>
                            </div>

                        </div>
                        <div className="flex items-center max-w-lg mx-auto w-full font-[sans-serif]">
                            <label className="text-black text-sm w-36">End Time</label>
                            <div className="w-full">
                                <input type="datetime-local"  {...register("endDate", {
                                    required: "Please enter the end date.",
                                    validate: (value) => validateEndTime(value, watch("startDate"))

                                })} className="px-4 py-3 bg-[#f0f1f2] text-black w-full text-sm border-green-500 outline-[#007bff] rounded" />
                                <span className="text-red-500 text-xs">
                                    {errors?.endDate?.message}
                                </span>
                            </div>

                        </div>
                    </div>
                </form>
                <div className="border-t flex justify-end pt-6 space-x-4">
                    <button type="button"
                        className="px-6 py-2 rounded-md text-black text-sm border-none outline-none bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
                        onClick={(e) => modalOpen(false)}>Cancel</button>
                    <button type="button"
                        className="px-6 py-2 rounded-md text-white text-sm border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
                        onClick={handleSubmit(onSubmit)}
                    >POST</button>
                </div>
            </div>
        </div>
    )
}

export default ModalPost

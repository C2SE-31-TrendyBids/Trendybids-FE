import React, { useState } from "react";
import { Box, Typography, Button, TextField, Grid } from "@mui/material";
import Rating from "@mui/material/Rating";
import { FaStar } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
const handleSubmit = () => {
    console.log("Succcessfully submitted");
};
const Feedback = () => {
    const [value, setValue] = React.useState(2);
    const [showOptions, setShowOptions] = useState(false);

    const handleToggleOptions = () => {
        setShowOptions(!showOptions);
    };
    return (
        <div className="max-w-2xl mx-auto  p-6 text-[#333] font-[sans-serif] rounded-md border border-[#333]">
            <div className="flex flex-col items-center">
                <h2 className="mb-2 font-bold text-xl">Session Reviews</h2>
                <span className="mb-4">Please rate your experience below</span>
            </div>
            <Box
                component="form"
                sx={{
                    "& > legend": { mt: 2 },
                    "& .MuiRating-iconFilled": {
                        color: "#facc15",
                    },
                }}
                onSubmit={(e) => {
                    e.preventDefault();
                    // Xử lý việc gửi form feedback
                }}
            >
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            fontSize: "2rem", // Kích thước phù hợp với yêu cầu của bạn
                        }}
                    />
                </div>
                <TextField
                    id="review"
                    label="Review"
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 2 }}
                />
                <Grid
                    container
                    spacing={2}
                    sx={{ mt: 2, justifyContent: "flex-end" }}
                >
                    <Grid item xs={3}>
                        <button
                            // onClick={handleCancel}
                            type="button"
                            className="px-6 py-2.5 text-sm font-semibold text-black border border-gray-400 rounded hover:bg-gray-200 mr-4 w-full"
                        >
                            Cancel
                        </button>
                    </Grid>
                    <Grid item xs={3}>
                        <button
                            onClick={handleSubmit}
                            type="submit"
                            className="px-8 py-2.5 text-sm font-semibold bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
                        >
                            Submit
                        </button>
                    </Grid>
                </Grid>
            </Box>
            <div className="mt-2 ">
                <h3 className="font-bold text-base">All Reviews(2)</h3>
                <div className="mt-6 space-y-4 max-h-56 overflow-auto">
                    <div className="flex items-start">
                        <img
                            alt=""
                            src="https://readymadeui.com/team-2.webp"
                            className="w-12 h-12 rounded-full border-2 border-white"
                        />
                        <div className="ml-3">
                            <h4 className="text-sm font-bold">John Doe</h4>
                            <div className="flex space-x-1 mt-1">
                                <FaStar className="w-4 fill-[#facc15]" />
                                <FaStar className="w-4 fill-[#facc15]" />
                            </div>
                            <p className="text-xs mt-2 font-semibold">
                                2020-11-20 13:55
                            </p>
                            <p className="text-xs mt-2">
                                The service was amazing. I never had to wait
                                that long for my food. The staff was friendly
                                and attentive, and the delivery was impressively
                                prompt.
                            </p>
                        </div>
                        <div className="flex  mt-1 relative">
                            <button
                                type="button"
                                onClick={handleToggleOptions}
                                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                            >
                                <BsThreeDotsVertical />
                            </button>
                            {showOptions && (
                                <div className="absolute top-0 mt-6 b ">
                                    <div className="ml-[-30px]">
                                        <button className="text-sm font-medium text-gray-500 hover:text-gray-800 focus:outline-none ">
                                            Edit
                                        </button>
                                        <button className="text-sm font-medium text-gray-500 hover:text-gray-800 focus:outline-none ">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex items-start">
                        <img
                            alt=""
                            src="https://readymadeui.com/team-1.webp"
                            className="w-12 h-12 rounded-full border-2 border-white"
                        />
                        <div className="ml-3">
                            <h4 className="text-sm font-bold">Mark Adair</h4>
                            <div className="flex space-x-1 mt-1">
                                <svg
                                    className="w-4 fill-[#facc15]"
                                    viewBox="0 0 14 13"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                </svg>
                                <svg
                                    className="w-4 fill-[#facc15]"
                                    viewBox="0 0 14 13"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                </svg>
                                <svg
                                    className="w-4 fill-[#facc15]"
                                    viewBox="0 0 14 13"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                </svg>
                                <svg
                                    className="w-4 fill-[#CED5D8]"
                                    viewBox="0 0 14 13"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                </svg>
                                <svg
                                    className="w-4 fill-[#CED5D8]"
                                    viewBox="0 0 14 13"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                </svg>
                            </div>
                            <p className="text-xs mt-2 font-semibold">
                                2020-11-20 13:55
                            </p>
                            <p className="text-xs mt-2">
                                The service was amazing. I never had to wait
                                that long for my food. The staff was friendly
                                and attentive, and the delivery was impressively
                                prompt.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <img
                            alt=""
                            src="https://readymadeui.com/team-2.webp"
                            className="w-12 h-12 rounded-full border-2 border-white"
                        />
                        <div className="ml-3">
                            <h4 className="text-sm font-bold">John Doe</h4>
                            <div className="flex space-x-1 mt-1">
                                <FaStar className="w-4 fill-[#facc15]" />
                                <FaStar className="w-4 fill-[#facc15]" />
                            </div>
                            <p className="text-xs mt-2 font-semibold">
                                2020-11-20 13:55
                            </p>
                            <p className="text-xs mt-2">
                                The service was amazing. I never had to wait
                                that long for my food. The staff was friendly
                                and attentive, and the delivery was impressively
                                prompt.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Feedback;

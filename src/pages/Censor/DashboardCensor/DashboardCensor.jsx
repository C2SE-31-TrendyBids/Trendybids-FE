import React from "react";
import AuctionSumary from "../../../components/AuctionSumary/AuctionSumary";
import ChartBar from "../../../components/Chart/ChartBar/ChartBar";
import ChartLine from "../../../components/Chart/ChartLine/ChartLine";
import Member from "../AllMember/AllMember";

const DashboardCensor = () => {
    return (
        <div className="min-h-screen bg-gray-100"> {/* Updated to cover the entire screen */}
            <div className="my-6 mx-10">
                <AuctionSumary />
                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 grid grid-cols-2 gap-10">
                    <div className="col-span-1 border border-gray-300 rounded px-4">
                        <div className="flex flex-wrap sm:gap-5 my-4">
                            <div className="flex justify-between items-center w-full">
                                <p className="font-bold text-[20px] text-[#007bff]">
                                    Total Revenue
                                </p>
                                <div className="flex justify-between flex-end">
                                    <div className="inline-flex items-center rounded-md bg-white p-1.5">
                                        <button className="rounded bg-white px-3 py-1 text-sm font-medium text-black shadow-card hover:bg-white hover:shadow-card">
                                            Day
                                        </button>
                                        <button className="rounded px-3 py-1 text-sm font-medium text-black hover:bg-white hover:shadow-card">
                                            Week
                                        </button>
                                        <button className="rounded px-3 py-1 text-sm font-medium text-black hover:bg-white hover:shadow-card">
                                            Month
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <ChartBar />
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1 border border-gray-300 rounded px-4">
                        <div className="flex flex-wrap sm:gap-5 my-4">
                            <div className="flex justify-between items-center w-full">
                                <p className="font-bold text-[20px] text-[#007bff]">
                                    Total Number Of Participants
                                </p>
                                <div className="flex justify-between flex-end">
                                    <div className="inline-flex items-center rounded-md bg-white p-1.5">
                                        <button className="rounded bg-white px-3 py-1 text-sm font-medium text-black shadow-card hover:bg-white hover:shadow-card">
                                            Day
                                        </button>
                                        <button className="rounded px-3 py-1 text-sm font-medium text-black hover:bg-white hover:shadow-card">
                                            Week
                                        </button>
                                        <button className="rounded px-3 py-1 text-sm font-medium text-black hover:bg-white hover:shadow-card">
                                            Month
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <ChartLine />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-10">
                    <Member />
                </div>
            </div>
        </div>
    );
};

export default DashboardCensor;

import React from "react";
import { RiAuctionLine } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { AiOutlineClockCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { CiSquareRemove } from "react-icons/ci";


const AuctionSumary = () => {
    return (
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
                <div className="bg-white shadow-[0_2px_15px_-6px_rgba(0,0,0,0.2)] p-5 w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto ">
                    <div className="inline-block bg-[#edf2f7] rounded-lg p-2 px-3">
                        <RiAuctionLine className="w-7 h-6 text-[#007bff] font-bold" />
                    </div>
                    <div className="mt-3">
                        <div>
                            <span className="text-md font-medium text-[#fffff]">
                                Total Auction Sessions
                            </span>
                            <h4 className="text-lg font-bold text-black mt-3 ">
                                04 auctions
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow-[0_2px_15px_-6px_rgba(0,0,0,0.2)] p-5 w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto ">
                    <div className="inline-block bg-[#edf2f7] rounded-lg p-2 px-3">
                        <FiUsers className="w-7 h-6 text-[#007bff] font-bold" />
                    </div>
                    <div className="mt-3">
                        <div>
                            <span className="text-md font-medium text-[#fffff]">
                                Total Number Of Participants
                            </span>
                            <h4 className="text-lg font-bold text-black mt-3 ">
                                02 people
                            </h4>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow-[0_2px_15px_-6px_rgba(0,0,0,0.2)] p-5 w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto ">
                    <div className="inline-block bg-[#edf2f7] rounded-lg p-2 px-3">
                        <RiMoneyDollarCircleLine className="w-7 h-6 text-[#007bff] " />
                    </div>
                    <div className="mt-3">
                        <div>
                            <span className="text-md font-medium text-[#fffff]">
                                Total Auction Value
                            </span>
                            <h4 className="text-lg font-bold text-black mt-3 ">
                                3500$
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow-[0_2px_15px_-6px_rgba(0,0,0,0.2)] p-5 w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto ">
                    <div className="inline-block bg-[#edf2f7] rounded-lg p-2 px-3">
                        <CiSquareRemove className="w-7 h-6 text-[#007bff] " />
                    </div>
                    <div className="mt-3">
                        <div>
                            <span className="text-md font-medium text-[#fffff]">
                                Not Started Auction Sessions
                            </span>
                            <h4 className="text-lg font-bold text-black mt-3 ">
                                2 auctions
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow-[0_2px_15px_-6px_rgba(0,0,0,0.2)] p-5 w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto ">
                    <div className="inline-block bg-[#edf2f7] rounded-lg p-2 px-3">
                        <AiOutlineClockCircle className="w-7 h-6 text-[#007bff] " />
                    </div>
                    <div className="mt-3">
                        <div>
                            <span className="text-md font-medium text-[#fffff]">
                                Ongoing Auction Sessions
                            </span>
                            <h4 className="text-lg font-bold text-black mt-3 ">
                                01 auctions
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow-[0_2px_15px_-6px_rgba(0,0,0,0.2)] p-5 w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto ">
                    <div className="inline-block bg-[#edf2f7] rounded-lg p-2 px-3">
                        <AiOutlineCheckCircle className="w-7 h-6 text-[#007bff] " />
                    </div>
                    <div className="mt-3">
                        <div>
                            <span className="text-md font-medium text-[#fffff]">
                                Auction Session Ended
                            </span>
                            <h4 className="text-lg font-bold text-black mt-3 ">
                                01 auctions
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AuctionSumary;

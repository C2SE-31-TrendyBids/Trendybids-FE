import React, {useEffect, useState} from "react";
import {IoStatsChart} from "react-icons/io5";
import {FaMoneyCheckDollar} from "react-icons/fa6";
import {FaUser, FaUserSecret} from "react-icons/fa";
import {MdPostAdd} from "react-icons/md";
import * as adminServices from "../../services/admin";

const SummaryAdmin = () => {
    const [summary, setSummary] = useState({});

    useEffect(() => {
        const accessToken = localStorage.getItem("access-token");
        const fetchSummary = async () => {
            const responseSummary = await adminServices.getSummary(accessToken);
            if (responseSummary.status === 200) {
                setSummary(responseSummary.data);
            }
        }
        accessToken && fetchSummary();

    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            <div className="w-full flex items-center gap-2 bg-white rounded-lg pl-2 pr-4 py-2">
                <div className="p-3 rounded-full bg-[#F4F7FE]">
                    <IoStatsChart className="text-[#4318FF]" size={20} />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-[12px] font-medium text-[#707EAE]">Earning</p>
                    <p className="text-[16px] font-bold text-[#2B3674]">${summary?.earning || 0}</p>
                </div>
            </div>
            <div className="w-full flex items-center gap-2 bg-white rounded-lg pl-2 pr-4 py-2">
                <div className="p-3 rounded-full bg-[#F4F7FE]">
                    <FaMoneyCheckDollar className="text-[#4318FF]" size={20} />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-[12px] font-medium text-[#707EAE]">Spend This month</p>
                    <p className="text-[16px] font-bold text-[#2B3674]">$300</p>
                </div>
            </div>
            <div className="w-full flex items-center gap-2 bg-white rounded-lg pl-2 pr-4 py-2">
                <div className="p-3 rounded-full bg-[#F4F7FE]">
                    <IoStatsChart className="text-[#4318FF]" size={20} />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-[12px] font-medium text-[#707EAE]">Total Accounts</p>
                    <p className="text-[16px] font-bold text-[#2B3674]">{summary?.totalAuctions || 0}</p>
                </div>
            </div>
            <div className="w-full flex items-center gap-2 bg-white rounded-lg pl-2 pr-4 py-2">
                <div className="p-3 rounded-full bg-[#F4F7FE]">
                    <FaUserSecret className="text-[#4318FF]" size={20} />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-[12px] font-medium text-[#707EAE]">Censor</p>
                    <p className="text-[16px] font-bold text-[#2B3674]">{summary?.totalCensors || 0}</p>
                </div>
            </div>
            <div className="w-full flex items-center gap-2 bg-white rounded-lg pl-2 pr-4 py-2">
                <div className="p-3 rounded-full bg-[#F4F7FE]">
                    <FaUser className="text-[#4318FF]" size={20} />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-[12px] font-medium text-[#707EAE]">User</p>
                    <p className="text-[16px] font-bold text-[#2B3674]">{summary?.totalUsers || 0}</p>
                </div>
            </div>
            <div className="w-full flex items-center gap-2 bg-white rounded-lg pl-2 pr-4 py-2">
                <div className="p-3 rounded-full bg-[#F4F7FE]">
                    <MdPostAdd className="text-[#4318FF]" size={20} />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-[12px] font-medium text-[#707EAE]">Pro Auction</p>
                    <p className="text-[16px] font-bold text-[#2B3674]">{summary?.totalAuctions}</p>
                </div>
            </div>
        </div>
    )
}

export default SummaryAdmin
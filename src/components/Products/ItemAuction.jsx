import React from "react";

const ItemAuction = ({infoBid, type = "other"}) => {

    return (
        <div className={`flex ${type === "owner" ? "justify-end" : "justify-start"}`}>
            <div
                className="w-[40%] flex flex-col items-center py-1 px-2 bg-[#F4F5FC] rounded-full font-semibold mb-2">
                <p className="text-xm font-semibold text-black truncate">18$ by adsdfdf***</p>
                <p className="font-thin text-sm text-gray-400">2/03/2023 12:02 AM</p>
            </div>
        </div>

    )
}

export default ItemAuction
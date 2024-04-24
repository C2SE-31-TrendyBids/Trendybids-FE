import React from "react";
import moment from 'moment';
import 'moment/locale/vi';


const formatTimeDifference = (timestamp) => {
    // Set Moment.js locale to Vietnamese
    moment.locale("en");
    return moment(timestamp).format("LTS");
};


const ItemAuction = ({infoBid, isOwner = false}) => {

    const timeAgo = formatTimeDifference(infoBid?.createdAt);

    return (
        <div className={`flex ${isOwner ? "justify-end" : "justify-start"}`}>
            <div
                className={`w-[40%] flex flex-col py-1 px-2 bg-[#F4F5FC] rounded-full font-semibold mb-2`}>
                <p className={`px-2 ${isOwner ? "text-center" : "text-left"} text-xm font-semibold text-black truncate`}><span className="text-blue-500">${infoBid?.auctionPrice}</span> {` by ${isOwner ? "me" : infoBid?.user?.fullName}`}</p>
                <p className={`${isOwner ? "text-center" : "text-left"} font-thin text-sm text-gray-400 truncate px-2`}>{timeAgo}</p>
            </div>
        </div>
    )
}

export default ItemAuction
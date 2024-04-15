import React from "react";
import moment from 'moment';
import 'moment/locale/vi';


const formatTimeDifference = (timestamp) => {
    // Set Moment.js locale to Vietnamese
    moment.locale('vi');

    // Convert the message timestamp to a Moment object
    const messageTime = moment(timestamp);
    // Get the current time
    const currentTime = moment();
    // Calculate the time difference in seconds
    const timeDifferenceInSeconds = currentTime.diff(messageTime, 'seconds');

    // Convert seconds to hours, minutes, and seconds
    const hours = Math.floor(timeDifferenceInSeconds / 3600);
    const minutes = Math.floor((timeDifferenceInSeconds % 3600) / 60);
    const seconds = timeDifferenceInSeconds % 60;

    // Format the time difference manually in Vietnamese
    let timeAgo = '';
    if (hours > 0) {
        timeAgo += `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
    }
    if (minutes > 0) {
        timeAgo += ` ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
    }
    if (seconds > 0) {
        timeAgo += ` ${seconds} ${seconds === 1 ? 'second' : 'seconds'}`;
    }
    timeAgo += ' ago';

    return timeAgo;
};


const ItemAuction = ({infoBid, isOwner = false}) => {

    const timeAgo = formatTimeDifference(infoBid?.createdAt);

    return (
        <div className={`flex ${isOwner ? "justify-end" : "justify-start"}`}>
            <div
                className={`w-[40%] flex flex-col py-1 px-2 bg-[#F4F5FC] rounded-full font-semibold mb-2`}>
                <p className={`px-2 ${isOwner ? "text-center" : "text-left"} text-xm font-semibold text-black truncate`}><span className="text-blue-500">${infoBid?.auctionPrice}</span> {` by ${isOwner ? "me" : infoBid?.user?.fullName}`}</p>
                <p className="font-thin text-sm text-gray-400 truncate px-2">{timeAgo}</p>
            </div>
        </div>

    )
}

export default ItemAuction
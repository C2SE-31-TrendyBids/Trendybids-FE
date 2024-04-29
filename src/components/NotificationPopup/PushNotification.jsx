import React from 'react';
import moment from "moment/moment";
import {MdOutlineNotificationsNone} from "react-icons/md";

const PushNotification = ({item}) => {
    return (
        <div className="flex">
            <div className="flex-shrink-0">
                <MdOutlineNotificationsNone size="27px" className="text-blue-600 mt-1"/>
            </div>
            <div className="ms-3">
                <h3 className="text-blue-600 font-semibold">
                    New Notification
                </h3>
                <div className="flex flex-col justify-between cursor-pointer">
                    <p className={`text-[13px] leading-4 font-normal w-[250px] truncate-2-lines`}>
                        {item?.content}
                    </p>
                    <span className="mt-1 text-[12px] opacity-60 font-normal text-end">{moment(item?.createdAt).fromNow()}</span>
                </div>
            </div>
        </div>
    )
};

export default PushNotification;
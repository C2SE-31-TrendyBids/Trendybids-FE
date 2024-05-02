import React from 'react';
import moment from "moment/moment";
import {MdOutlineNotificationsNone} from "react-icons/md";
import {Link} from "react-router-dom";

const PushNotification = ({item}) => {
    return (
        <Link className="flex p-1 m-2.5 hover:bg-gray-50 rounded-lg" to={item?.linkAttach || '/'}>
            <div className="flex-shrink-0">
                <MdOutlineNotificationsNone size="27px" className="text-blue-600 mt-1"/>
            </div>
            <div className="ms-2">
                <h3 className="text-blue-600 font-semibold">
                    New Notification
                </h3>
                <div className="flex flex-col justify-between cursor-pointer">
                    <p className={`text-[13px] leading-5 font-normal w-[250px] truncate-2-lines`}>
                        {item.userName === null ? item?.content : (
                            <span>
                                <span className="font-semibold">{item.userName}</span>
                                {item?.content}
                            </span>
                        )}
                    </p>
                    <span className="mt-1 text-[12px] opacity-60 font-normal text-end">{moment(item?.createdAt).fromNow()}</span>
                </div>
            </div>
        </Link>
    )
};

export default PushNotification;
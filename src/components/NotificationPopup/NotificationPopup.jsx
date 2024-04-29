import React, {useContext, useEffect, useRef} from 'react';
import {useNavigate} from "react-router-dom";
import moment from "moment";
import {GoDotFill} from "react-icons/go";
import notificationSvg from "../../assets/vectors/notification.svg";
import bellSvg from "../../assets/vectors/bell-notification.svg"
import SocketContext from "../../context/socketProvider";
import * as notificationService from "../../services/notification"
import {toast} from "sonner"
import PushNotification from "./PushNotification";

const NotificationPopup = ({notification, setNotification, iconNotificationRef}) => {
    const socket = useContext(SocketContext)
    const navigate = useNavigate()
    const popupRef = useRef();
    const accessToken = localStorage.getItem("access-token")

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target) && !iconNotificationRef.current.contains(event.target)) {
                setNotification({...notification, isOpen: !notification.isOpen}); // Close the popup
            }
        }

        // Attach the click outside listener
        document.addEventListener("mousedown", handleClickOutside);

        // Return function to clean up on component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClick = async (item) => {
        if (!item?.isSeen) {
            // Call API to mark notification as read
            await notificationService.seenNotification(accessToken, item?.id)
        }
        navigateToNotification(item)
    }

    const navigateToNotification = (item) => {
        if (item?.linkAttach) {
            navigate(item?.linkAttach)
        } else {
            setNotification(prev => ({
                ...prev,
                unseenCount: prev.unseenCount - 1,
                data: prev.data.map((notificationItem) => {
                    if (notificationItem.id === item.id) {
                        return {...notificationItem, isSeen: true};
                    } else {
                        return notificationItem; // Return the item unchanged if the id does not match
                    }
                })
            }));
        }
    }

    const handleFilter = (e, isSeen) => {
        e.preventDefault()
        setNotification({...notification, isSeen})
    }

    return (
        <div ref={popupRef} className={`absolute top-16 right-[15px] z-10 bg-white rounded-lg shadow-2xl border w-[400px]`}>
            <h1 className="text-center p-2 font-bold text-blue-600 border-b">Notification</h1>
            <ul className="flex flex-wrap items-center text-sm font-medium text-center text-gray-500 pt-2 px-4">
                <li className={`me-2 cursor-pointer rounded-lg ${notification.isSeen === null ? "bg-blue-500 text-white" : "hover:text-gray-900 hover:bg-gray-100"}`} onClick={(e) => handleFilter(e, null)}>
                    <span className="inline-block px-5 py-1.5">All</span>
                </li>
                <li className={`me-2 cursor-pointer rounded-lg ${notification.isSeen === false ? "bg-blue-500 text-white" : "hover:text-gray-900 hover:bg-gray-100"}`} onClick={(e) => handleFilter(e, false)}>
                    <span className="inline-block px-4 py-1.5 ">Unread</span>
                </li>
            </ul>
            <ul className="flex flex-col gap-y-2 p-2 text-sm text-gray-700 font-semibold max-h-[550px] overflow-y-auto">
                {(notification.data && notification.data.length > 0) ? notification.data.map((item, index) => (
                    <li key={item.id} className={`relative flex items-start rounded-md transition-all gap-x-2 p-2 ${!item?.isSeen ? "bg-blue-50 hover:bg-blue-100" : "hover:bg-blue-100"}`} onClick={() => handleClick(item)}>
                        <img
                            src={bellSvg}
                            alt="avatar"
                            className="object-cover rounded-full h-14 w-14"
                        />
                        <div className="flex items-center">
                            <div className="flex flex-col justify-between cursor-pointer">
                                <h3 className="text-[13px] leading-4 mb-1">{item?.title}</h3>
                                <p className={`text-[13px] leading-4 font-normal`}>
                                    {item?.content}
                                </p>
                                <span className="mt-1 text-[12px] opacity-60 font-normal">{moment(item?.createdAt).fromNow()}</span>
                            </div>
                            {!item?.isSeen && <span className="right-2 bottom-[50%]"><GoDotFill size={20} color="#007afe"/></span>}
                        </div>
                    </li>
                )) : (
                    <div className="flex flex-col items-center justify-center p-2">
                        <img src={notificationSvg || ""} alt="messageSvg" className="h-72 w-72"/>
                        <h1 className="text-md text-gray-500">No Notification Yet</h1>
                    </div>
                )}
            </ul>
        </div>
    );
};

export default NotificationPopup;
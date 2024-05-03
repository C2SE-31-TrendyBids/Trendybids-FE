import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import moment from "moment";
import {GoDotFill} from "react-icons/go";
import Skeleton from "@mui/material/Skeleton";
import bellSvg from "../../assets/vectors/bell-notification.svg"
import notificationSvg from "../../assets/vectors/notification.svg";
import * as notificationServices from "../../services/notification";
import {useDispatch, useSelector} from "react-redux";
import {clearNotifications, fetchNotificationThunk, setUnseenCount} from "../../redux/slices/notification";

const NotificationPopup = ({setIsOpenNotification, iconNotificationRef}) => {
    const accessToken = localStorage.getItem("access-token")
    const navigate = useNavigate()
    const popupRef = useRef();
    const [hasMoreData, setHasMoreData] = useState(true);
    const [filter, setFilter] = useState({
        page: 1,
        limit: 10,
        isSeen: null
    })
    const dispatch = useDispatch()
    const {notifications, isLoading} = useSelector((state) => state.notification)
    const [isLoadMore, setIsLoadMore] = useState(false);

    useEffect(() => {
        if (accessToken && hasMoreData) {
            (() => {
                dispatch(fetchNotificationThunk({accessToken, ...filter})).unwrap().then((res) => {
                    if (res?.response?.data.length === 0) {
                        console.log('setHasMoreData')
                        setHasMoreData(false); // No more data to load
                    }
                })
            })()
        }
        filter.page > 1 && setIsLoadMore(false);
    }, [filter.isSeen, filter.page]);

    // Handle scroll to load more data
    useEffect(() => {
        const handleScroll = () => {
            const container = document.getElementById('notification-list');
            // console.log(Math.round(container.scrollTop + container.clientHeight), container.scrollHeight)
            if (Math.round(container.scrollTop + container.clientHeight) >= container.scrollHeight) {
                setIsLoadMore(true)
                setFilter(prev => ({
                    ...prev,
                    page: prev.page + 1
                }));
            }
        };

        const container = document.getElementById('notification-list');
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);


    // Handle click outside => Close popup
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target) && !iconNotificationRef.current.contains(event.target)) {
                setIsOpenNotification(false); // Close the popup
                dispatch(clearNotifications())
            }
        }

        // Attach the click outside listener
        document.addEventListener("mousedown", handleClickOutside);

        // Return function to clean up on component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Handle see notification and navigate to the link
    const handleClick = async (item) => {
        if (!item?.isSeen) {
            await notificationServices.seenNotification(accessToken, item?.id)
        }

        // Navigate to page or Set Seen
        item?.linkAttach ? navigate(item?.linkAttach) : dispatch(setUnseenCount(item?.id))
    }

    // Handle filter notification (seen and unseen)
    const handleFilter = (e, isSeen) => {
        e.preventDefault()
        dispatch(clearNotifications())
        setFilter({...filter, isSeen, page: 1, limit: 10})
        setHasMoreData(true);
        setIsLoadMore(false)
    }

    return (
        <div ref={popupRef} className={`absolute top-16 right-[15px] z-10 bg-white rounded-lg shadow-2xl border w-[400px]`}>
            <h1 className="text-center p-2 font-bold text-blue-600 border-b">Notification</h1>
            <ul className="flex flex-wrap items-center text-sm font-medium text-center text-gray-500 pt-2 px-4">
                <li className={`me-2 cursor-pointer rounded-lg ${filter.isSeen === null ? "bg-blue-500 text-white" : "hover:text-gray-900 hover:bg-gray-100"}`} onClick={(e) => handleFilter(e, null)}>
                    <span className="inline-block px-5 py-1.5">All</span>
                </li>
                <li className={`me-2 cursor-pointer rounded-lg ${filter.isSeen === false ? "bg-blue-500 text-white" : "hover:text-gray-900 hover:bg-gray-100"}`} onClick={(e) => handleFilter(e, false)}>
                    <span className="inline-block px-4 py-1.5 ">Unread</span>
                </li>
            </ul>
            <ul id="notification-list" className="flex flex-col gap-y-2 p-2 text-sm text-gray-700 font-semibold max-h-[550px] overflow-y-auto">
                {isLoading ? (
                    <div className="flex flex-col gap-y-1.5">
                        {Array(5).fill().map((_, index) => (
                            <div key={index} className="flex gap-x-2 p-2 items-center">
                                <Skeleton variant="circular" animation="wave" width={45} height={45}/>
                                <Skeleton variant="h1" animation="wave" width={300} height={40} sx={{borderRadius: "5px"}}/>
                            </div>
                        ))}
                    </div>
                ) :
                    (notifications && notifications.length > 0) ? notifications.map((item) => (
                        <li key={item.id} className={`relative flex items-start rounded-md transition-all gap-x-2 p-2 ${!item?.isSeen ? "bg-blue-50 hover:bg-blue-100" : "hover:bg-blue-100"}`} onClick={() => handleClick(item)}>
                            <img
                                src={item.thumbnail || bellSvg}
                                alt="avatar"
                                className="object-cover rounded-full h-14 w-14"
                            />
                            <div className="w-full flex justify-between items-center">
                                <div className="flex flex-col justify-between cursor-pointer">
                                    <h3 className="text-[13px] leading-4 mb-1">{item?.title}</h3>
                                    <p className={`text-[13px] leading-4 font-normal`}>
                                        {item?.content}
                                    </p>
                                    <span className="mt-1 text-[12px] opacity-60 font-normal">{moment(item?.createdAt).fromNow()}</span>
                                </div>
                                {!item?.isSeen && <span className="block"><GoDotFill size={20} color="#007afe"/></span>}
                            </div>
                        </li>
                    )) : (
                        <div className="flex flex-col items-center justify-center p-2">
                            <img src={notificationSvg || ""} alt="messageSvg" className="h-72 w-72"/>
                            <h1 className="text-md text-gray-500">No Notification Yet</h1>
                        </div>
                    )
                }
                {isLoadMore && (
                    <>
                        <div className="flex gap-x-2 p-2 items-center">
                            <Skeleton variant="circular" animation="wave" width={45} height={45}/>
                            <Skeleton variant="h1" animation="wave" width={300} height={40} sx={{borderRadius: "5px"}}/>
                        </div>
                        <div className="flex gap-x-2 p-2 items-center">
                            <Skeleton variant="circular" animation="wave" width={45} height={45}/>
                            <Skeleton variant="h1" animation="wave" width={300} height={40} sx={{borderRadius: "5px"}}/>
                        </div>
                    </>
                )}
            </ul>
        </div>
    );
};

export default NotificationPopup;
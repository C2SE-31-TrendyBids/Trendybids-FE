import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {motion} from "framer-motion";
import {useDispatch, useSelector} from "react-redux";
import AuthContext from "../../context/authProvider";
import { updateSeenConversation } from "../../redux/slices/conversation";
import Tooltip from '@mui/material/Tooltip';
import { FaPenToSquare } from "react-icons/fa6";
import {FaSearch} from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import CreateConversationModal from "./CreateConversationModal";
import {useDebounce} from "@uidotdev/usehooks";
import { GoDotFill } from "react-icons/go";

const MessageSidebar = () => {
    const navigate = useNavigate()

    const {conversations, loading} = useSelector((state) => state.conversation)
    const [showModalCreate, setShowModalCreate] = useState(false)
    const {auth} = useContext(AuthContext)
    const [currentTime, setCurrentTime] = useState(new Date());
    const conversationId = useParams().conversationId
    const [search, setSearch] = useState({
        open: false,
        value: '',
        result: []
    })
    const searchDebounce = useDebounce(search.value, 500)
    const dispatch = useDispatch()

    const getName = (fullName) => {
        if (fullName) {
            const arrStr = fullName.split(' ')
            return arrStr[arrStr.length - 1]
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 100000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (searchDebounce !== '') {
            const filterConv = conversations.filter(item => item.recipient.fullName.toLowerCase().includes(searchDebounce.toLowerCase()))
            setSearch({
                ...search,
                open: true,
                result: filterConv
            })
        } else {
            setSearch({
                ...search,
                open: false,
                result: []
            })
        }
    }, [searchDebounce])

    const handleNavigateMessage = (item) => {
        setSearch({
            open: false,
            value: '',
            result: []
        })
        dispatch(updateSeenConversation(item))
        navigate(`/messages/${item.id}`)
    }

    return (
        <aside className="h-full lg:w-[360px] md:w-[80px] border-r-[1px] overflow-hidden">
            <header className="flex flex-col justify-between items-center px-[20px] border-b-[1px]">
                <div className="w-full lg:flex lg:justify-between lg:items-center gap-x-2 py-3">
                    <Link to="/messages" className="hidden lg:flex items-center">
                        <h1 className="text-lg font-bold text-blue-500 ">Chats</h1>
                    </Link>
                    <Tooltip title="New">
                        <motion.span whileHover={{scale: 1.3}} onClick={() => setShowModalCreate(true)}>
                            <FaPenToSquare color="#007AFE" size="20px"/>
                        </motion.span>
                    </Tooltip>
                </div>
                <div className="hidden w-full lg:flex items-center px-3 mb-3 rounded-2xl border-[1px] border-gray-300 bg-gray-50 relative">
                    <FaSearch color="#007AFE" size="20px" className=""/>
                    <input
                        type="text"
                        placeholder="Search name of message ..."
                        className="w-full py-1 px-3 focus:outline-none focus:border-blue-500 bg-transparent"
                        value={search.value}
                        onChange={(e) => setSearch({...search, value: e.target.value})}
                    />
                    {search.open && (
                        <div className="absolute h-[250px] w-[90%] rounded-md top-9 p-2 overflow-y-auto bg-white shadow-2xl">
                            {search.result.length > 0 ? search.result.map((item) => (
                                <li
                                    className={`flex items-center justify-center gap-x-[15px] py-[5px] px-[10px] rounded-lg box-border cursor-pointer ${item.id === conversationId ? "bg-blue-50" : "hover:bg-gray-100"}`}
                                    key={item.id}
                                    onClick={() => handleNavigateMessage(item)}
                                >
                                    <img className="h-[40px] w-[40px] rounded-full object-cover"
                                         src={item?.recipient?.avatarUrl || "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"}
                                         alt="avatar"/>
                                    <div className="hidden lg:flex lg:flex-col w-full">
                                        <span className="w-full truncate text-start">{item?.recipient?.fullName}</span>
                                    </div>
                                </li>
                            )) : (
                                <span className="h-wull w-full text-center py-[35%]">
                                    No results were found
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </header>
            <ul className="h-sidebar-item overflow-y-auto">
                {conversations && conversations.length > 0 ? (
                    conversations.map((item) => (
                        item.id === 'create' ? (
                            <li key={item.id} className="flex items-center justify-center gap-x-[15px] py-[10px] px-[10px] mx-2 rounded-lg box-border cursor-pointer bg-blue-50">
                                <img className="lg:h-[40px] lg:w-[40px] md:h-[20px] md:w-[20px] h-[20px] w-[20px] rounded-full object-cover border"
                                     src={item?.recipient?.avatarUrl || "https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"}
                                     alt="avatar"/>
                                <span className="w-full font-medium truncate text-start">{item?.content}</span>
                            </li>
                        ) : (
                            <li
                                className={`flex items-center justify-center gap-x-[15px] py-[10px] lg:px-[10px] px-[5px] mx-2 rounded-lg box-border cursor-pointer ${item.id === conversationId ? "bg-blue-50" : "hover:bg-gray-100"}`}
                                key={item.id}
                                onClick={() => handleNavigateMessage(item)}
                            >
                                <img className="lg:h-[40px] lg:w-[40px] md:h-[35px] md:w-[35px] h-[25px] w-[25px] rounded-full object-cover border"
                                     src={item?.recipient?.avatarUrl || "https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"}
                                     alt="avatar"/>
                                <div className="hidden lg:flex lg:flex-col w-full relative">
                                    <span className="w-full font-medium truncate text-start">{item?.recipient?.fullName}</span>
                                    <div className="flex items-center justify-between flex-wrap">
                                        {item?.latestMessage?.filesAttach.length !== 0 ? (
                                            <span
                                                className={`${(item?.latestMessage?.user.id !== auth.id && !item?.latestMessage?.isSeen) ? "font-medium" : "text-gray-800"} text-[14px] truncate text-start max-w-[185px]`}>{auth.id === item?.latestMessage?.user?.id ? "Bạn đã gửi một ảnh" : `${getName(item?.latestMessage?.user?.fullName)} đã gửi một ảnh`}</span>
                                        ) : (
                                            <span
                                                className={`${(item?.latestMessage?.user.id !== auth.id && !item?.latestMessage?.isSeen) ? "font-medium" : "text-gray-800"} text-[14px] truncate text-start max-w-[185px]`}>{auth.id === item?.latestMessage?.user?.id ? `Bạn: ${item?.latestMessage?.content}` : item?.latestMessage?.content}</span>
                                        )}
                                        {/* Change the separator here */}
                                        {(item?.latestMessage?.user.id !== auth.id && !item?.latestMessage?.isSeen) && (<span className="absolute right-0 bottom-[24px]"><GoDotFill color="#007afe"/></span>)}
                                        <span className="text-[12px] font-light">{item.latestMessage && <span>{calculateDateDifference(new Date(item.latestMessage.createdAt), currentTime)}</span>}</span>
                                    </div>
                                </div>
                            </li>
                        )
                    ))
                ) : (
                    <div className="h-sidebar-item flex flex-col items-center justify-center">
                        <TiMessages color="blue" className="lg:w-[100px] lg:h-[100px] md:w-[50px] md:h-[50px]"/>
                        <p className="text-center text-gray-700 hidden lg:block">No messages yet</p>
                    </div>
                )}
            </ul>
            {showModalCreate && <CreateConversationModal openModal={showModalCreate} setOpenModal={setShowModalCreate}/>}
        </aside>
    );
};

const calculateDateDifference = (startDate, endDate) => {
    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    const seconds = timeDiff / 1000;
    let result;

    switch (true) {
        case seconds >= 12 * 30 * 24 * 60 * 60:
            // More than 1 year difference, return the number of years
            result = `${Math.floor(seconds / (12 * 30 * 24 * 60 * 60))} years`;
            break;
        case seconds >= 30 * 24 * 60 * 60:
            // More than 1 month difference, return the number of months
            result = `${Math.floor(seconds / (30 * 24 * 60 * 60))} months`;
            break;
        case seconds >= 7 * 24 * 60 * 60:
            // More than 7 days difference, return the number of weeks
            result = `${Math.floor(seconds / (7 * 24 * 60 * 60))} weeks`;
            break;
        case seconds >= 24 * 60 * 60:
            // More than 1 day difference, return the number of days
            result = `${Math.floor(seconds / (24 * 60 * 60))} days`;
            break;
        case seconds >= 60 * 60:
            // More than 1 hour difference, return the number of hours
            result = `${Math.floor(seconds / (60 * 60))} hours`;
            break;
        default:
            // Less than 1 hour difference, return the number of minutes
            result = `${Math.floor(seconds / 60)} minutes`;
    }
    return result;
}

export default MessageSidebar;
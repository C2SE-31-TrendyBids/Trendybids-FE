import React, {useContext, useEffect, useRef, useState} from 'react';
import {CircularProgress} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import Tooltip from '@mui/material/Tooltip';
import AuthContext from "../../context/authProvider";
import moment from "moment";
import {IoDocumentTextOutline} from "react-icons/io5";
import ImageGallery from "../ImageGallery/ImageGallery";
import {fetchMessagesThunk, setMoreMessage} from "../../redux/slices/message";
import {useParams} from "react-router-dom";
import * as messageService from "../../services/message";

const MessageContainer = () => {
    const {auth} = useContext(AuthContext)
    const accessToken = localStorage.getItem('access-token')
    const {messages, loading} = useSelector((state) => state.message);
    const {conversationId} = useParams()
    const dispatch = useDispatch()
    const messageListRef = useRef(null);
    const [showGallery, setShowGallery] = useState(false)
    const [listImg, setListImg] = useState([])
    const [selectedImg, setSelectedImg] = useState({})
    const [nextPage, setNextPage] = useState(2);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    useEffect(() => {
        const handleScroll = async (e) => {
            if (isLoadingMore) return;
            const { scrollTop, scrollHeight, clientHeight } = e.target;
            if ((Math.round(Math.abs(scrollTop)) === scrollHeight- clientHeight - 1)) {
                setIsLoadingMore(true);
                const moreMessage = await messageService.getConversationMessage(accessToken, conversationId, {page: nextPage, limit: 10})
                if (moreMessage.response.data.length !== 0) {
                    setNextPage(nextPage + 1);
                    console.log('moreMessage:', moreMessage.response.data.reverse())
                    dispatch(setMoreMessage(moreMessage.response.data.reverse()))
                }
                setIsLoadingMore(false);
            }
        };

        const messageListElement = messageListRef.current;
        messageListElement.addEventListener('scroll', handleScroll);

        // Cleanup function
        return () => {
            messageListElement.removeEventListener('scroll', handleScroll);
        };
    }, [nextPage, isLoadingMore]);

    useEffect(() => {
        setNextPage(2)
    }, [conversationId])

    const handleShowGallery = (item) => {
        const arrImg = messages.reduce((acc, message) => {
            const images = message.filesAttach.filter(file => file.type.split('/')[0] === 'image').map(file => ({
                id: file.id,
                url: file.url
            }));
            return [...acc, ...images];
        }, []);
        setSelectedImg(item);
        setListImg(arrImg);
        setShowGallery(true);
    }

    return (
        <div className="flex flex-1 flex-col-reverse overflow-y-scroll py-[5px] px-6" ref={messageListRef}>
            {loading ? (
                <CircularProgress className="h-12 w-12 m-auto"/>
            ) : (
                sortedMessage(messages, auth.id, handleShowGallery)
            )}
            {showGallery && <ImageGallery images={listImg} selectedImg={selectedImg} setShowGallery={setShowGallery}/>}
        </div>
    );
};

// sortedMessage function sorts and displays the list of messages
const sortedMessage = (messages, userId, handleShowGallery) => {
    const threshold = 60 * 60 * 1000; // 1 hour in milliseconds

    return messages && messages.map((item, index, arr) => {
        const currentMessage = arr[index];
        const previousMessage = arr[index + 1];
        const showAvatar = arr.length === index + 1 || currentMessage.user.id !== previousMessage.user.id;

        // Calculate the time difference between the current message and the last one
        const timeDiff = previousMessage ? new Date(item.createdAt).getTime() - new Date(previousMessage.createdAt).getTime() : threshold;

        return (
            <div key={item.id}>
                {/* If the time difference is greater than the threshold, display a timestamp */}
                {timeDiff >= threshold && (
                    <div className="text-center text-gray-500 text-sm my-6">
                        {moment(item.createdAt).calendar()}
                    </div>
                )}
                <Message item={item} userId={userId} showAvatar={showAvatar} handleShowGallery={handleShowGallery}/>
            </div>
        )
    })
}

// Message component displays a specific message
const Message = ({item, userId, showAvatar, handleShowGallery}) => {
    const isUserLogin = userId === item.user.id;

    // Determine the style css for the message
    const placement = isUserLogin ? "left" : "right";
    const alignItem = isUserLogin ? "items-end" : "items-start"
    const bgColor = isUserLogin ? "bg-blue-500 text-white" : "bg-gray-100";
    const marginLeftStyle = !isUserLogin && !showAvatar ? "ml-10" : "";
    const roundedStyle = isUserLogin ? "rounded-tl-lg" : "rounded-tr-lg";
    const justifyContent = isUserLogin ? "justify-end" : "justify-start"

    // Determine the files attached to the message
    const filesAttach = item.filesAttach;
    const imageTypes = ['png', 'jpeg', 'jpg'];

    return (
        <div key={item.id} className={`flex flex-col my-0.5 ${alignItem} ${marginLeftStyle}`}>
            <div className="flex items-start gap-x-2">
                {showAvatar && !isUserLogin && (
                    <img src={item.user.avatarUrl || "https://www.w3schools.com/howto/img_avatar.png"} alt="avatar" className="h-8 w-8 rounded-full"/>
                )}
                <div className={`flex flex-col gap-y-1 ${alignItem}`}>
                    <TimeTooltip item={item} placement={placement}>
                        {item.content !== null && <span className={`py-1.5 px-4 rounded-b-lg ${bgColor} ${roundedStyle}`}>{item.content}</span>}
                    </TimeTooltip>
                    {(filesAttach && filesAttach.length > 0) && (
                        <div className={`flex flex-wrap flex-row gap-x-1 w-[50%] ${justifyContent}`}>
                            {filesAttach.map((item, index) => (
                                <TimeTooltip key={index} item={item} placement={placement}>
                                    {imageTypes.includes(item.name.split('.').pop()) ? (
                                        <div key={index} className={`${filesAttach.length > 1 && "w-[calc(33%-10px)]"} m-1`}>
                                            <img src={item.url} alt="image" onClick={() => handleShowGallery(item)} className="w-full h-auto rounded-lg shadow-sm hover:opacity-85"/>
                                        </div>
                                    ) : (
                                        <a key={index} href={item.url} download="filename.extension" className="h-14 px-2 rounded-lg flex items-center gap-x-2 bg-gray-100 m-1">
                                        <span className="p-2 bg-gray-200 rounded-full">
                                            <IoDocumentTextOutline size="20px" color="blue"/>
                                        </span>
                                            <h3 className="text-sm truncate-2-lines">{item.name}</h3>
                                        </a>
                                    )}
                                </TimeTooltip>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

const TimeTooltip = ({children, item, placement}) => {
    if (!children) return null;
    return (
        <Tooltip title={moment(item.createdAt).format('LT')} placement={placement} componentsProps={{
            tooltip: {
                sx: {
                    backgroundColor: "#545353",
                }
            }
        }}>
            {children}
        </Tooltip>
    )
}

export default MessageContainer;
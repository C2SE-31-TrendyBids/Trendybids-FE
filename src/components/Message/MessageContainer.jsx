import React, {useContext} from 'react';
import {CircularProgress} from "@mui/material";
import {useSelector} from "react-redux";
import Tooltip from '@mui/material/Tooltip';
import AuthContext from "../../context/authProvider";
import moment from "moment";
import {IoDocumentTextOutline} from "react-icons/io5";

const MessageContainer = () => {
    const {messages, loading} = useSelector((state) => state.message);
    const {auth} = useContext(AuthContext)

    return (
        <div className="flex flex-1 flex-col-reverse overflow-y-scroll py-[5px] px-6">
            {loading ? (
                <CircularProgress className="h-12 w-12 m-auto"/>
            ) : (
                sortedMessage(messages, auth.id)
            )}
        </div>
    );
};

// sortedMessage function sorts and displays the list of messages
const sortedMessage = (messages, userId) => {
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
                <Message item={item} userId={userId} showAvatar={showAvatar} />
            </div>
        )
    })
}

// Message component displays a specific message
const Message = ({item, userId, showAvatar}) => {
    const isUserLogin = userId === item.user.id;

    // Determine the style css for the message
    const placement = isUserLogin ? "left-start" : "right-start";
    const alignItem = isUserLogin ? "items-end" : "items-start"
    const bgColor = isUserLogin ? "bg-blue-500 text-white" : "bg-gray-100";
    const marginLeftStyle = !isUserLogin && !showAvatar ? "ml-10" : "";
    const roundedStyle = isUserLogin ? "rounded-tl-lg" : "rounded-tr-lg";
    const justifyContent = isUserLogin ? "justify-end" : "justify-start"

    const filesAttach = item.filesAttach;
    const imageTypes = ['png', 'jpeg', 'jpg'];

    return (
        <div key={item.id} className={`flex flex-col my-0.5 ${alignItem} ${marginLeftStyle}`}>
            <div className="flex items-center gap-x-2">
                {showAvatar && !isUserLogin && (
                    <img src={item.user.avatarUrl || "https://www.w3schools.com/howto/img_avatar.png"} alt="avatar" className="h-8 w-8 rounded-full"/>
                )}
                    <div className={`flex flex-col gap-y-1 ${alignItem}`}>
                        <Tooltip title={moment(item.createdAt).calendar()} placement={placement}>
                            <span className={`py-1.5 px-4 rounded-b-lg ${bgColor} ${roundedStyle}`}>{item.content}</span>
                        </Tooltip>
                            {(filesAttach && filesAttach.length > 0) && (
                                <div className={`flex flex-wrap flex-row gap-x-1 w-[50%] ${justifyContent}`}>
                                    {filesAttach.map((item, index) => (
                                        imageTypes.includes(item.name.split('.').pop()) ? (
                                            <div key={index} className={`${filesAttach.length > 1 && "w-[calc(33%-10px)]"} p-1`}>
                                                <img src={item.url} alt="" className="w-full h-auto rounded-lg shadow-sm hover:opacity-60"/>
                                            </div>
                                        ) : (
                                            <a href={item.url} className="h-14 px-2 rounded-lg flex items-center gap-x-2 bg-gray-100">
                                                <span className="p-2 bg-gray-200 rounded-full">
                                                    <IoDocumentTextOutline size="20px" color="blue"/>
                                                </span>
                                                <h3 className="text-sm truncate-2-lines">{item.name}</h3>
                                            </a>
                                        )
                                    ))}
                                </div>
                            )}
                    </div>
            </div>
        </div>
    )
}

export default MessageContainer;
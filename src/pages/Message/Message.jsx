import React, {useEffect, useState} from 'react';
import Sidebar from "../../components/Message/Sidebar";
import MessageChannel from "../../components/Message/MessageChannel";
import {useDispatch, useSelector} from "react-redux";
import messageSvg from "../../assets/vectors/message.svg";
import {useNavigate, useParams} from 'react-router-dom';
import {fetchConversationsThunk} from "../../redux/slices/conversation";
import {toast} from "sonner";
import {fetchMessagesThunk} from "../../redux/slices/message";

const Message = () => {
    const accessToken = localStorage.getItem('access-token')
    const dispatch = useDispatch()
    const {conversations} = useSelector((state) => state.conversation)
    const [conversation, setConversation] = useState({})
    const navigate = useNavigate();
    const {conversationId} = useParams()

    useEffect(() => {
        // Dispatch the fetchConversationsThunk action to fetch the conversations
        dispatch(fetchConversationsThunk(accessToken)).unwrap().then((data) => {
            // If there are no conversations, show a toast message and navigate to the messages page
            if (data && data.response.conversations.length === 0) {
                toast.info("You haven't had any conversations yet. Let's create a new chat!")
                navigate('/messages');
            } else {
                let curConvId = conversationId;
                // Find the current conversation in the fetched conversations
                const curConv = data.response.conversations.find((item) => item.id === conversationId);
                if (!curConv) {
                    curConvId = data.response.conversations[0].id;
                    navigate(`/messages/${curConvId}`);
                }
                setConversation(curConv || data.response.conversations[0]);
                dispatch(fetchMessagesThunk({accessToken, conversationId: curConvId}));
            }
        })
    }, [accessToken, dispatch, conversationId, navigate]);

    return (
        <div className="h-screen-header w-screen flex flex-row">
            <Sidebar/>
            {conversations.length > 0 ? <MessageChannel conversation={conversation}/> : (
                <div className="h-full w-message-channel flex flex-col items-center justify-center">
                    <img src={messageSvg} alt="messageSvg" className="h-72 w-72"/>
                    <h1 className="text-2xl text-gray-700">No chats selected</h1>
                </div>
            )}
        </div>
    );
};

export default Message;
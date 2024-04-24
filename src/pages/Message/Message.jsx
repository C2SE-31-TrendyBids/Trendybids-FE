import React, {useContext, useEffect, useState} from 'react';
import MessageSidebar from "../../components/Message/MessageSidebar";
import MessageChannel from "../../components/Message/MessageChannel";
import {useDispatch, useSelector} from "react-redux";
import messageSvg from "../../assets/vectors/message.svg";
import {useNavigate, useParams} from 'react-router-dom';
import {
    fetchConversationsThunk,
    addConversation,
    updateConversation,
    fetchUnseenConversationsThunk
} from "../../redux/slices/conversation";
import {toast} from "sonner";
import {addMessage, fetchMessagesThunk} from "../../redux/slices/message";
import SocketContext from "../../context/socketProvider";


const Message = () => {
    const socket = useContext(SocketContext)
    const {conversationId} = useParams()
    const accessToken = localStorage.getItem('access-token')
    const dispatch = useDispatch()
    const {conversations} = useSelector((state) => state.conversation)
    const [conversation, setConversation] = useState({})
    const navigate = useNavigate();

    // Listen for the connected event
    useEffect(() => {
        socket.on('connected', (data) => console.log('Connected', data))
        socket.on('onMessage', (data) => {
            const receiveConvId = data?.conversationId;
            console.log(conversationId, receiveConvId)
            conversationId === receiveConvId && dispatch(addMessage(data));
            dispatch(fetchUnseenConversationsThunk(accessToken))
            dispatch(updateConversation({conversationId: data?.conversationId, message: data}))
        })
        socket.on('onConversation', (data) => {
            dispatch(addConversation(data));
            dispatch(fetchUnseenConversationsThunk(accessToken))
        })
        return () => {
            socket.off('connected')
            socket.off('onMessage')
            socket.off('onConversation')
        }
    }, [conversationId])

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
            }
        })
    }, []);

    useEffect(() => {
        if (conversationId) {
            const curConv = conversations.find((item) => item.id === conversationId);
            setConversation(curConv);
            dispatch(fetchMessagesThunk({accessToken, conversationId, page: 1, limit: 10}))
            socket.emit('onConversationJoin', {conversationId})
        }

        return () => {
            socket.emit('onConversationLeave', { conversationId });
        }
    }, [conversationId])

    return (
        <div className="h-screen-header w-screen flex flex-row">
            <MessageSidebar/>
            {(conversations.length > 0 && conversationId) ? <MessageChannel conversation={conversation}/> : (
                <div className="h-full w-full lg:w-msg-channel-lg md:w-msg-channel-md flex flex-col items-center justify-center">
                    <img src={messageSvg} alt="messageSvg" className="h-72 w-72"/>
                    <h1 className="text-2xl text-gray-700">No chats selected</h1>
                </div>
            )}
        </div>
    );
};

export default Message;
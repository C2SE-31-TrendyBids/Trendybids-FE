import React, {useEffect, useState} from 'react';
import MessageInputField from "../../components/Message/MessageInputField";
import {useLocation, useNavigate} from "react-router-dom";
import MessageSidebar from "../../components/Message/MessageSidebar";
import * as messageService from "../../services/message";
import {useDispatch, useSelector} from "react-redux";
import {fetchConversationsThunk} from "../../redux/slices/conversation";

const NewMessage = () => {
    const {conversations} = useSelector((state) => state.conversation)
    const newRecipient = JSON.parse(localStorage.getItem('new-recipient'));
    const formData = new FormData();
    const accessToken = localStorage.getItem('access-token');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (conversations.length === 1) {
            dispatch(fetchConversationsThunk(accessToken))
        }
    }, [])

    const sendCreateNew = async (e, content, filesAttach) => {
        e.preventDefault();
        // Create a form data object
        formData.append('recipientId', newRecipient.id)
        content !== '' && formData.append('content', content)
        filesAttach.length > 0 && filesAttach.forEach((file) => formData.append('filesAttach', file));

        try {
            const newConversation = await messageService.createConversation(accessToken, formData)
            navigate(`/messages/${newConversation.response.responseData.id}`)
            localStorage.removeItem('new-recipient')
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="h-screen-header w-screen flex flex-row">
            <MessageSidebar/>
            <div className="h-full lg:w-msg-channel-lg md:w-msg-channel-md flex flex-col overflow-hidden relative">
                <header className="text-start border-b-[1.5px] w-full h-[62px] px-[32px] shadow-sm">
                    {Object.keys(newRecipient).length !== 0 && (
                        <div className="h-full flex justify-between items-center">
                            <div className="flex items-center justify-start gap-x-[12px]">
                                <img className="bg-primaryColor h-[40px] w-[40px] rounded-full object-cover"
                                     src={newRecipient.avatarUrl || "https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"}
                                     alt="avatar"/>
                                <span className="font-bold">{newRecipient?.fullName}</span>
                            </div>
                        </div>
                    )}
                </header>

                {/*MessageContainer*/}
                <div className="flex flex-1 flex-col-reverse overflow-y-scroll py-[5px] px-6"></div>

                {/*Message input field*/}
                <MessageInputField sendCreateNew={sendCreateNew}/>
            </div>
        </div>

    );
};

export default NewMessage;

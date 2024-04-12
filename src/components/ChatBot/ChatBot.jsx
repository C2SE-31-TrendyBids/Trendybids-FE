import React, { useEffect, useState } from 'react';
import avatar from "../../assets/images/avatarChat.jpg";
import avatar1 from "../../assets/images/avatar-chatbot.jpg";
import { IoMdSend } from "react-icons/io";

const ChatBot = () => {
    const [showChatbox, setShowChatbox] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const mesExample = ['How to register as an auction organization?',
        'How can I list a product for auction?',
        'How many auction organizations are there currently?',
        'How many products are currently being auctioned?',
        'How many upcoming products will be auctioned?',
        'Products currently being auctioned with a price above $100.']
    const toggleChatbox = () => {
        setShowChatbox(!showChatbox);
    }
    const onSendButton = async () => {
        try {
            if (message === '') {
                return;
            }
            let msg1 = { name: 'User', messages: message }
            const newMessages = [...messages, msg1]
            const SERVER_ADDRESS = 'http://localhost:4000'
            const response = await fetch(`${SERVER_ADDRESS}/predict`, {
                method: 'POST',
                body: JSON.stringify({ message: message }),
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch');
            }
            const data = await response.json();
            let msg2 = { name: "TrendyBids", messages: data.answer };
            const updatedMessages = [...newMessages, msg2];
            setMessages(updatedMessages);
            setMessage('');
        } catch (error) {
            console.error('Error:', error);
            setMessage('');
        }
    }
    useEffect(() => {
        console.log(messages);
    }, [messages])
    const handleSubmit = (e) => {
        e.preventDefault();
        onSendButton();
    };


    return (
        <div className="fixed bottom-8 right-8 z-50">
            <div className={`absolute ${showChatbox ? 'animate-fade-left animate-ease-in-out animate-duration-1000 right-[50px] bottom-[90px]' : 'hidden'}`}>
                <div className="w-[380px]  rounded-xl shadow-lg">
                    <div className=" flex bg-[rgba(14,7,126,1)] text-white p-4 rounded-t-xl">
                        <img src={avatar} alt="imagename" className="w-16 h-16 rounded-full" />
                        <div className='ml-4'>
                            <h4 className="text-lg">TrendyBot</h4>
                            <p>Hi. How can I help you?</p>
                        </div>
                    </div>
                    <div className=" bg-gray-100 w-full h-96 overflow-scroll no-scrollbar">
                        {mesExample?.map((item) => (
                            <div>
                                <button className='text-[10px] border p-2 '>{item}</button>
                            </div>
                        ))}
                        {messages?.map((item) => (
                            <div className='w-full'>
                                {item?.name === 'TrendyBids' ? (
                                    <div className='flex items-start justify-start'>
                                        <div className='max-w-[60%] text-start bg-gray-600 text-white m-4 p-2 rounded-t-2xl rounded-br-2xl '>
                                            <h1 className='px-2'>{item?.messages}</h1>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='flex items-end justify-end'>
                                        <div className='max-w-[60%] text-end bg-blue-500 text-white m-4 p-2 rounded-t-2xl rounded-bl-2xl '>
                                            <h1 className='px-2'>{item?.messages}</h1>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex items-center justify-between px-4 py-5 bg-[rgba(14,7,126,1)] shadow-lg rounded-b-xl">
                            <input
                                type="text"
                                value={message}
                                placeholder="Write a message..."
                                onChange={(e) => { setMessage(e.target.value) }}
                                className="w-80 border-none px-4 py-2 rounded-full bg-gray-100"
                            />
                            <button type="submit" className="px-6 py-2 text-white"><IoMdSend className='text-3xl' /></button>
                        </div>
                    </form>

                </div>
            </div>
            <button className="bg-white p-2 rounded-full shadow-lg relative" onClick={toggleChatbox}>
                <img src={avatar1} alt="name" className="w-16 h-16 rounded-full" />
                <div className="active bg-green-500 rounded-full w-4 h-4 absolute top-2 right-0 "></div>
            </button>
        </div>
    );
}

export default ChatBot;

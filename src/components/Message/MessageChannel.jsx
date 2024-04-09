import React, {useState} from 'react';
import MessageContainer from "./MessageContainer";
import MessageInputField from "./MessageInputField";
import {FaSearch} from "react-icons/fa";
import {motion} from "framer-motion";

const MessageChannel = ({conversation}) => {
    const [openSearch, setOpenSearch] = useState(false)

    return (
        <div className="h-full w-message-channel flex flex-col overflow-hidden relative">
            <header className="text-start border-b-[1.5px] w-full h-[62px] px-[32px] shadow-sm">
                {conversation && (
                    <div className="h-full flex justify-between items-center">
                        <div className="flex items-center justify-start gap-x-[12px]">
                            <img className="bg-primaryColor h-[40px] w-[40px] rounded-full object-cover"
                                 src={conversation?.recipient?.avatarUrl || "https://www.w3schools.com/howto/img_avatar.png"}
                                 alt="avatar"/>
                            <span className="font-bold">{conversation?.recipient?.fullName}</span>
                        </div>
                        <motion.button whileHover={{scale: 1.2}} className="p-2 rounded-lg bg-gray-100" onClick={() => setOpenSearch(!openSearch)}>
                            <FaSearch color="#007AFE" size="20px"/>
                        </motion.button>
                    </div>
                )}
            </header>
            {openSearch && (
                <div className="absolute top-[60px] w-full flex items-center gap-x-4 px-3 py-2 rounded-b-lg border-t-[1px] border-b-[1px] border-gray-300 bg-white drop-shadow">
                    <input
                        type="text"
                        placeholder="Search keyword..."
                        className="w-full py-1 px-3 my-1 focus:outline-none focus:border-blue-500 bg-gray-100 rounded-md"
                    />
                    <button className="py-1 px-4 bg-gray-100 rounded-md" onClick={() => setOpenSearch(!openSearch)}>Close</button>
                </div>
            )}

            {/*<MessageContainer/>*/}
            <MessageContainer/>

            {/*Message input field*/}
            <MessageInputField />
        </div>
    );
};

export default MessageChannel;
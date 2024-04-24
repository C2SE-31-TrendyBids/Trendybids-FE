import React, {useContext, useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {motion} from "framer-motion";
import {setMessage} from "../../redux/slices/message";
import SocketContext from "../../context/socketProvider";
import * as messageService from "../../services/message";
import MessageContainer from "./MessageContainer";
import MessageInputField from "./MessageInputField";
import {FaSearch} from "react-icons/fa";

const MessageChannel = ({conversation}) => {
    const socket = useContext(SocketContext)
    const accessToken = localStorage.getItem('access-token');
    const {conversationId} = useParams()
    const dispatch = useDispatch()
    const [isTyping, setIsTyping] = useState(false);
    const typingTimeoutRef = useRef(null);
    const [search, setSearch] = useState({
        open: false,
        value: '',
        previousValue: '',
        result: [],
        currentIndex: -1
    })

    const [isAllPage, setIsAllPage] = useState(false);
    const messageRef = useRef({});

    useEffect(() => {
        socket.on('onTypingStart', () => setIsTyping(true));
        socket.on('onTypingStop', () => setIsTyping(false));

        return () => {
            socket.off('onTypingStart');
            socket.off('onTypingStop');
        }
    }, [])

    const handleStartTyping = () => {
        socket.emit('onTypingStart', {conversationId: conversation.id});
    }

    const handleStopTyping = () => {
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
            socket.emit('onTypingStop', {conversationId: conversation.id});
        }, 1000); // 1000ms = 1.0s
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        if (search.value === '') {
            setSearch({...search, result: [], currentIndex: -1, previousValue: ''})
            return;
        }

        const msg = await messageService.getConversationMessage(accessToken, conversation.id);
        const msgConv = msg.response.data;

        const result = msgConv.filter((msg) => msg?.content?.toLowerCase().includes(search?.value?.toLowerCase()))

        // If the search value hasn't changed, increment the current index, otherwise reset it to 0
        const currentIndex = search.value === search.previousValue ? search.currentIndex - 1 : result.length - 1;
        setSearch({...search, result: result, currentIndex: currentIndex, previousValue: search.value})

        await dispatch(setMessage(msgConv))
        await setIsAllPage(true);

        // Scroll to the next result
        const oldResultId = result[currentIndex]?.id
        setTimeout(() => {
            if (messageRef.current[oldResultId]) {
                messageRef.current[oldResultId].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 0);
    }

    useEffect(() => {
        setIsAllPage(false)
        setSearch({
            ...search,
            open: false,
            value: '',
            previousValue: '',
            result: [],
            currentIndex: -1
        })
    }, [conversationId])

    return (
        <div className="h-full w-full lg:w-msg-channel-lg md:w-msg-channel-md flex flex-col overflow-hidden relative">
            <header className="text-start border-b-[1.5px] w-full h-[62px] px-[32px] shadow-sm">
                {conversation && (
                    <div className="h-full flex justify-between items-center">
                        <div className="flex items-center justify-start gap-x-[12px]">
                            <img className="bg-primaryColor h-[40px] w-[40px] rounded-full object-cover border"
                                 src={conversation?.recipient?.avatarUrl || "https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"}
                                 alt="avatar"/>
                            <span className="font-bold">{conversation?.recipient?.fullName}</span>
                        </div>
                        <motion.button whileHover={{scale: 1.2}} className="p-2 rounded-lg bg-gray-100" onClick={() => setSearch({...search, open: !search.open, value: '', previousValue: '', result: [], currentIndex: -1})}>
                            <FaSearch color="#007AFE" size="20px"/>
                        </motion.button>
                    </div>
                )}
            </header>
            {search.open && (
                <form onSubmit={handleSearch} className="absolute top-[60px] w-full flex items-center gap-x-4 px-3 py-2 rounded-b-lg border-t-[1px] border-b-[1px] border-gray-300 bg-white drop-shadow z-50">
                    <input
                        type="text"
                        placeholder="Search keyword..."
                        className="w-full py-1 px-3 my-1 focus:outline-none focus:border-blue-500 bg-gray-100 rounded-md text-sm"
                        value={search.value}
                        onChange={(e) => setSearch({...search, value: e.target.value})}
                    />
                    {search.result && search.result.length > 0 ? (
                        <span className="absolute right-[7rem] text-sm">{search.result.length} result</span>
                    ) : (
                        <span className="absolute right-[7rem] text-sm">{search.result.length} result</span>
                    )}
                    <span className="py-1 px-4 bg-gray-100 rounded-md cursor-pointer text-sm" onClick={() => setSearch({...search, open: !search.open, value: '', previousValue: '', result: [], currentIndex: -1})}>Close</span>
                </form>
            )}

            {/*<MessageContainer/>*/}
            <MessageContainer messageRef={messageRef} isAllPage={isAllPage} searchValue={search.previousValue.split(" ")}/>

            {/*User is typing*/}
            {isTyping && (
                <div className="flex flex-row items-center gap-3 px-6 pt-[10px]">
                    <img src={conversation?.recipient?.avatarUrl || "https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"} alt="avatar" className="h-8 w-8 rounded-full object-cover"/>
                    <div className="flex gap-[3px] items-center justify-center bg-[#f8f6f6] py-[12px] px-[15px] rounded-md">
                        <div className="jump1"></div>
                        <div className="jump2"></div>
                        <div className="jump3"></div>
                    </div>
                </div>
            )}

            {/*Message input field*/}
            <MessageInputField handleStartTyping={handleStartTyping} handleStopTyping={handleStopTyping}/>
        </div>
    );
};

export default MessageChannel;
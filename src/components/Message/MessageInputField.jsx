import React, {useState, useRef, useContext, useEffect} from 'react';
import {motion} from "framer-motion";
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import Tooltip from '@mui/material/Tooltip';
import {IoIosImages} from "react-icons/io";
import {IoCloseCircle, IoSend, IoDocumentTextOutline} from "react-icons/io5";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import {addMessage} from "../../redux/slices/message";
import {useDispatch} from "react-redux";
import AuthContext from "../../context/authProvider";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import * as messageService from "../../services/message"
import {updateConversation} from "../../redux/slices/conversation";

const MessageInputField = ({sendCreateNew, handleStartTyping, handleStopTyping}) => {
    const {conversationId} = useParams()
    const accessToken = localStorage.getItem('access-token')
    const fileRef = useRef();
    const [showEmojis, setShowEmojis] = useState(false);
    const [content, setContent] = useState('');
    const [filesAttach, setFilesAttach] = useState([]);
    const dispatch = useDispatch();
    const {auth} = useContext(AuthContext);
    const formData = new FormData();
    const location = useLocation()

    const addEmoji = (e) => {
        let emoji = e.native;
        setContent(content + emoji);
    };

    const addFile = (e) => {
        e.preventDefault();
        const files = e.target.files;
        setFilesAttach([...filesAttach, files[0]]);

        // Reset the value of imgRef
        fileRef.current.value = null;
    }

    const sendMessage = async (e) => {
        e.preventDefault();
        if(content === '' && filesAttach.length === 0) return;

        const { id, fullName, avatarUrl } = auth;
        // Create temporary object and dispatch the setMessage action
        const messageData = {
            id: Math.random().toString(36).substr(2, 9),
            content: content || null,
            filesAttach: filesAttach.length > 0 ? filesAttach.map(item => ({
                id: Math.random().toString(36).substr(2, 9),
                name: item.name,
                type: item.type,
                url: URL.createObjectURL(item)
            })) : [],
            createdAt: new Date(),
            user: { id, fullName, avatarUrl }
        }
        dispatch(addMessage(messageData))
        dispatch(updateConversation({conversationId, message: messageData}))

        // Create a form data object
        formData.append('conversationId', conversationId)
        content !== '' && formData.append('content', content)
        filesAttach.length > 0 && filesAttach.forEach((file) => formData.append('filesAttach', file));

        // Call API the createMessage service and reset the content and filesAttach
        try {
            await Promise.allSettled([
                messageService.createMessage(accessToken, formData),
                setContent(''),
                setFilesAttach([]),
            ])
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="w-full px-[15px] py-4">
            <div className="flex justify-center items-end gap-x-0.5 relative">
                {/*Upload Image*/}
                <div>
                    <input type="file" hidden ref={fileRef}
                        onChange={addFile}
                    />
                    <Tooltip title="Attach file">
                        <button
                            className="p-1.5 rounded-full hover:bg-gray-100"
                            onClick={(e) => {
                                e.preventDefault()
                                fileRef.current.click();
                            }}
                        >
                            <IoIosImages color="blue" size="30px"/>
                        </button>
                    </Tooltip>
                </div>

                {/*Emoji*/}
                <div>
                    <Tooltip title="Emoji">
                        <button
                            className="p-1.5 rounded-full hover:bg-gray-100"
                            onClick={(e) => {
                                e.preventDefault()
                                setShowEmojis(!showEmojis)
                            }}
                        >
                            <MdOutlineEmojiEmotions color="blue" size="30px"/>
                        </button>
                    </Tooltip>
                    {showEmojis &&
                        <div className="absolute bottom-14">
                            <Picker theme="light" emojiButtonSize={32} data={data} onEmojiSelect={addEmoji}/>
                        </div>
                    }
                </div>

                {/*Input*/}
                <form onSubmit={(e) => {
                    if (location.pathname.includes('/messages/new')) {
                        return sendCreateNew(e, content, filesAttach)
                    } else {
                        return sendMessage(e)
                    }
                }} className="w-full lg:flex flex-col px-3 rounded-lg border-[1px] border-gray-300 bg-gray-50 focus-within:border-blue-500">
                    {filesAttach.length > 0 && <FilePreview filesAttach={filesAttach} setFilesAttach={setFilesAttach}/>}
                    <div className="flex items-center">
                        <input
                            type="text"
                            className="w-full py-2 outline-none bg-transparent"
                            placeholder="Aa"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            onKeyDown={handleStartTyping}
                            onKeyUp={handleStopTyping}
                        />
                        <Tooltip title="Send">
                            <button type="submit" className="hover:bg-gray-200 rounded-full p-2">
                                <IoSend color="blue" size='20px'/>
                            </button>
                        </Tooltip>
                    </div>
                </form>
            </div>
        </div>
    );
};

const FilePreview = ({filesAttach, setFilesAttach}) => {
    return (
        <div className="flex flex-wrap gap-x-2 items-center py-2">
            {filesAttach.map((item, index) => (
                <div key={index} className="relative border rounded-lg shadow-2xl">
                    {item.type.includes('image') ? (
                        <img src={item && URL.createObjectURL(item)} alt="preview" className="w-14 h-14 object-cover rounded-lg"/>
                    ) : (
                        <div className="w-[150px] h-14 px-2 rounded-lg flex items-center gap-x-2">
                            <span  className="p-2 bg-gray-200 rounded-full">
                                <IoDocumentTextOutline size="20px" color="blue"/>
                            </span>
                            <h3 className="text-sm truncate-2-lines">{item.name}</h3>
                        </div>
                    )}
                    <motion.span whileHover={{scale: 1.3}} className="absolute top-[-7px] right-[-9px] p-1 bg-transparent rounded-full" onClick={() => setFilesAttach(filesAttach.filter(file => file !== item))}>
                        <IoCloseCircle color="red" size="20px"/>
                    </motion.span>
                </div>
            ))}
        </div>
    )
}

export default MessageInputField;
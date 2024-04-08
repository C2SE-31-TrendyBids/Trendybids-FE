import React, {useState, useRef} from 'react';
import {motion} from "framer-motion";
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import Tooltip from '@mui/material/Tooltip';
import {IoIosImages} from "react-icons/io";
import {IoCloseCircle, IoSend, IoDocumentTextOutline} from "react-icons/io5";
import { MdOutlineEmojiEmotions } from "react-icons/md";

const MessageInputField = () => {
    const imgRef = useRef();
    const [showEmojis, setShowEmojis] = useState(false);
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);

    const addEmoji = (e) => {
        let emoji = e.native;
        setContent(content + emoji);
    };

    const addFile = (e) => {
        e.preventDefault();
        const files = e.target.files;
        console.log(files);
        setImages([...images, files[0]]);
    }

    return (
        <div className="w-full px-[15px] py-4">
            <form action="" className="flex justify-center items-end gap-x-0.5 relative">
                {/*Upload Image*/}
                <div>
                    <input type="file" hidden ref={imgRef}
                        onChange={addFile}
                    />
                    <Tooltip title="Attach file">
                        <button
                            className="p-1.5 rounded-full hover:bg-gray-100"
                            onClick={(e) => {
                                e.preventDefault()
                                imgRef.current.click();
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
                <div className="hidden w-full lg:flex flex-col px-3 rounded-lg border-[1px] border-gray-300 bg-gray-50 focus-within:border-blue-500">
                    <FilePreview images={images} setImages={setImages}/>
                    <div className="flex items-center">
                        <input
                            type="text"
                            className="w-full py-2 outline-none bg-transparent"
                            placeholder="Aa"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <Tooltip title="Send">
                            <button className="hover:bg-gray-200 rounded-full p-2">
                                <IoSend color="blue" size='20px'/>
                            </button>
                        </Tooltip>
                    </div>
                </div>
            </form>
        </div>
    );
};

const FilePreview = ({images, setImages}) => {
    return (
        images.length > 0 && (
            <div className="flex flex-wrap gap-x-2 items-center py-2">
                {images.map((image, index) => (
                    <div key={index} className="relative border rounded-lg shadow-2xl">
                        {image.type.includes('image') ? (
                            <img src={image && URL.createObjectURL(image)} alt="preview" className="w-14 h-14 object-cover rounded-lg"/>
                        ) : (
                            <div className="w-[150px] h-14 px-2 rounded-lg flex items-center gap-x-2">
                                <span  className="p-2 bg-gray-200 rounded-full">
                                    <IoDocumentTextOutline size="20px" color="blue"/>
                                </span>
                                <h3 className="text-sm truncate-2-lines">{image.name}</h3>
                            </div>
                        )}
                        <motion.button whileHover={{scale: 1.3}} className="absolute top-[-7px] right-[-9px] p-1 bg-transparent rounded-full" onClick={(e) => {
                            e.preventDefault();
                            setImages(images.filter(item => item !== image));
                        }}>
                            <IoCloseCircle color="red" size="20px"/>
                        </motion.button>
                    </div>
                ))}
            </div>
        )
    )
}

export default MessageInputField;
import React, {useEffect, useState} from 'react';
import {Button, Modal, ModalClose, ModalDialog, Typography} from "@mui/joy";
import Skeleton from '@mui/material/Skeleton';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import * as userService from "../../services/user";
import {useDebounce} from "@uidotdev/usehooks";
import {IoIosCloseCircle} from "react-icons/io";
import {InputAdornment} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {motion} from "framer-motion";

const CreateConversationModal = ({openModal, setOpenModal}) => {
    const accessToken = localStorage.getItem('access-token')
    const [selectedUser, setSelectedUser] = useState({})
    const [searchResult, setSearchResult] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [loading, setLoading] = useState(false)
    const searchDebounce = useDebounce(searchValue, 1000)
    const navigate = useNavigate()
    const location = useLocation()
    const {conversations} = useSelector((state) => state.conversation)

    useEffect(() => {
        (async () => {
            const result = await userService.searchUser(accessToken, searchDebounce)
            setLoading(false)
            setSearchResult(result.response.users)
        })();
    }, [searchDebounce])

    const handleSearch = async (e) => {
        setSearchValue(e.target.value)
        setLoading(true)
    }

    const handleSelectUser = (item) => {
        setSearchResult([])
        setSelectedUser(item)
    }

    const handleCancelUser = () => {
        setSelectedUser({})
        setSearchValue('')
    }

    const handleChat = () => {
        const existedConversation = conversations.find((item) => item.recipient.id === selectedUser.id)
        if (existedConversation) {
            const existedConversation = conversations.find((item) => item.recipient.id === selectedUser.id);
            !location.pathname.includes(existedConversation.id) && navigate(`/messages/${existedConversation.id}`)
            setOpenModal(false)
        } else {
            localStorage.setItem('new-recipient', JSON.stringify(selectedUser));
            navigate(`/messages/new?to=${selectedUser.fullName}`)
        }
    }
    return (
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <ModalDialog>
                <ModalClose />
                <Typography
                    component="h2"
                    id="modal-title"
                    level="h4"
                    color="primary"
                    fontWeight="lg"
                    mb={1}
                    sx={{ textAlign: 'center' }}
                >
                    New Conversation
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: "column", rowGap: '1rem', width: "500px" }} component="form">
                    <TextField
                        id="outlined-multiline-static"
                        label="Send To"
                        value={searchValue}
                        onChange={handleSearch}
                        InputProps={{
                            startAdornment: <InputAdornment position="start" style={{color: 'red'}}>Name:</InputAdornment>
                        }}
                    />
                    {Object.keys(selectedUser).length !== 0 && (
                        <div className={`absolute top-[82px] left-[90px] bg-blue-50 rounded-md px-4 py-1 shadow`}>
                            <motion.div whileHover={{scale: "1.2"}} className="absolute bg-white rounded-full top-[-5px] right-[-9px]" onClick={handleCancelUser}>
                                <IoIosCloseCircle className="block h-5 w-5 text-center" color="#007AFE"/>
                            </motion.div>
                            {selectedUser?.fullName}
                        </div>
                    )}
                    <div className="w-full h-[250px] border p-2 overflow-y-auto">
                        <h3 className="text-sm px-1 text-[#277cd1]">Search Results</h3>
                        <ul className="flex flex-col gap-y-1 mt-2">
                            {loading ? (
                                <div className="flex flex-col gap-y-1.5">
                                    {Array(4).fill().map((_, index) => (
                                        <div key={index} className="flex gap-x-2 items-center">
                                            <Skeleton variant="circular" animation="wave" width={45} height={45}/>
                                            <Skeleton variant="h1" animation="wave" width={420} height={40} sx={{borderRadius: "5px"}}/>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                searchResult.length > 0) && searchResult.map((item) => (
                                    <li key={item.id} className="flex items-center gap-x-2 hover:bg-blue-100 transition-all p-2 rounded-md cursor-pointer" onClick={() => handleSelectUser(item)}>
                                        <img
                                            src={item?.avatarUrl || ""}
                                            onError={(e) => { e.target.onerror = null; e.target.src = "https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"; }}
                                            alt="avatar"
                                            className="h-10 w-10 rounded-full object-cover border"
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-sm">{item.fullName}</span>
                                            <span className="text-sm opacity-50">{item.email}</span>
                                        </div>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                    <Button size="lg" disabled={Object.keys(selectedUser).length === 0 || false} variant="outlined"
                            sx={{
                                paddingX: '30px',
                                '&.Mui-disabled': {
                                    color: '#b4d4f4',
                                    borderColor: '#b4d4f4',
                                }}}
                            onClick={handleChat}
                    >
                        Chat
                    </Button>
                </Box>
            </ModalDialog>
        </Modal>
    );
};

export default CreateConversationModal;
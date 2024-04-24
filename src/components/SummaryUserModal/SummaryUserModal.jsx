import React from 'react';
import {Typography, Tooltip, Box, Avatar, Button} from "@mui/joy";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { IoMdPhonePortrait } from "react-icons/io";
import * as messageService from "../../services/message"

const SummaryUserModal = ({children, owner}) => {
    const accessToken = localStorage.getItem('access-token');

    const handleRedirectChat = async () => {
        const res = await messageService.getConversations(accessToken)
        console.log(res.response?.conversations)
        const conversations = res.response?.conversations;
        const conversation = conversations.find(conversation => conversation?.recipient?.id === owner?.id)
        if (!conversation) {
            localStorage.setItem('new-recipient', JSON.stringify(owner));
            window.open(`/messages/new?to=${owner?.fullName}`, '_blank');
        } else {
            window.open(`/messages/${conversation?.id}`, '_blank');
        }
    }

    return (
        <Tooltip title={
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: 420,
                    justifyContent: 'center',
                    p: 2,
                }}
            >
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 0.5 ,alignItems: 'center'}}>
                    <Avatar alt="avatar" size='lg' variant="outlined" src={owner?.avatarUrl || "https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"} />
                    <Typography
                        fontSize="lg"
                        fontWeight="lg"
                        sx={{ textAlign: "center" }}
                    >
                        {owner?.fullName}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, width: '100%', mt: 1, flexDirection: "column", alignItems: "center" }}>
                    <div className="px-2 w-full">
                        <Typography fontWeight="lg" fontSize="md" sx={{ display: "flex", flexDirection: "row", alignItems: "start", columnGap: 0.8, mb: 1 }}>
                            <span className="flex items-center gap-x-1.5">
                                <MdOutlineMail fontSize="18px" color="#0b6bcb"/> Email:
                            </span>
                            <span className="font-normal whitespace-normal " >{owner?.email}</span>
                        </Typography>
                        <Typography fontWeight="lg" fontSize="md" sx={{ display: "flex", flexDirection: "row", alignItems: "start", columnGap: 0.8, mb: 1 }}>
                            <span className="flex items-center gap-x-1.5">
                                <IoMdPhonePortrait fontSize="18px" color="#0b6bcb"/> Phone:
                            </span>
                            <span className="font-normal whitespace-normal">{owner?.phone || "None"}</span>
                        </Typography>
                        <Typography fontWeight="lg" fontSize="md" sx={{ display: "flex", flexDirection: "row", alignItems: "start", columnGap: 0.8, mb: 1, width: "100%" }}>
                            <span className="flex items-center gap-x-1.5">
                                <GrLocation fontSize="18px" color="#0b6bcb"/>
                                Address:
                            </span>
                            <span className="font-normal whitespace-normal">{owner?.address || "None"}</span>
                        </Typography>
                    </div>
                    <Button variant="outlined" className="w-full" onClick={handleRedirectChat}>
                        <span className="flex items-center gap-1.5">
                            <IoChatboxEllipsesOutline className="text-2xl" />
                            Chat
                        </span>
                    </Button>
                </Box>
            </Box>
        }
             placement={'right-end'}
             variant="outlined"
             arrow
        >{children}</Tooltip>
    );
};

export default SummaryUserModal;
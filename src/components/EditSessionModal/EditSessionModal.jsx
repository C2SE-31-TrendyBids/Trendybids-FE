import React from 'react';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {Modal, ModalDialog, Typography, ModalClose, Button} from "@mui/joy";
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import {format} from "date-fns";
import {toast} from "sonner";
import * as censorService from "../../services/censor";

const EditSessionModal = ({openModal, setOpenModal, sessionSelected, setSessionSelected, isUpdated, setIsUpdated}) => {
    const accessToken = localStorage.getItem('access-token')
    const handleEditSession = async (e) => {
        if (!sessionSelected.title || !sessionSelected.description || !sessionSelected.startTime || !sessionSelected.endTime) {
            toast.error("Please fill out all fields");
            return;
        }
        const updateSession = await censorService.updateAuctionSession({
            title: sessionSelected.title,
            description: sessionSelected.description,
            startTime: sessionSelected.startTime,
            endTime: sessionSelected.endTime,
            status: sessionSelected.status
        }, accessToken, sessionSelected.id)
        if (updateSession.statusCode === 200) {
            console.log(updateSession.response)
            toast.success("Update session successfully")
            setIsUpdated(!isUpdated)
            setOpenModal(false)
        } else {
            toast.error("Has error when update")
        }
    }

    const handleCancelEdit = (e) => {
        e.preventDefault()
        setSessionSelected({})
        setOpenModal(false)
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
                >
                    Edit Auction Session
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: "130px 130px 130px 130px", gap: '24px' }} component="form">
                    <TextField
                        id="outlined-multiline-static"
                        label="Title"
                        multiline
                        rows={1}
                        value={sessionSelected?.title}
                        error={sessionSelected?.title === '' && true}
                        helperText={sessionSelected?.title === '' && "Please fill out the title field"}
                        sx={{gridColumn: 'span 4 / span 4'}}
                        onChange={(e) => setSessionSelected({...sessionSelected, title: e.target.value})}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        value={sessionSelected?.description}
                        error={sessionSelected?.description === '' && true}
                        helperText={sessionSelected?.description === '' && "Please fill out the description field"}
                        sx={{gridColumn: 'span 4 / span 4'}}
                        onChange={(e) => setSessionSelected({...sessionSelected, description: e.target.value})}
                    />
                    <TextField
                        type="datetime-local"
                        id="outlined-basic"
                        label="Start Time"
                        variant="outlined"
                        sx={{gridColumn: 'span 2 / span 2'}}
                        value={sessionSelected.startTime && format(sessionSelected?.startTime, "yyyy-MM-dd'T'HH:mm", { timeZone: 'Asia/Ho_Chi_Minh' })}
                        onChange={(e) => setSessionSelected({...sessionSelected, startTime: e.target.value})}
                    />
                    <TextField
                        type="datetime-local"
                        id="outlined-basic"
                        label="End Time"
                        variant="outlined"
                        value={sessionSelected.endTime && format(sessionSelected?.endTime, "yyyy-MM-dd'T'HH:mm", { timeZone: 'Asia/Ho_Chi_Minh' })}
                        sx={{gridColumn: 'span 2 / span 2'}}
                        onChange={(e) => setSessionSelected({...sessionSelected, endTime: e.target.value})}
                    />
                    <Select
                        placeholder="Status..."
                        indicator={<KeyboardArrowDown />}
                        variant="outlined"
                        color="primary"
                        sx={{
                            height: 50,
                            [`& .${selectClasses.indicator}`]: {
                                transition: '0.2s',
                                [`&.${selectClasses.expanded}`]: {
                                    transform: 'rotate(-180deg)',
                                },
                            },
                            gridColumn: 'span 4 / span 4',
                            marginX: '30%'
                        }}
                        value={sessionSelected.status}
                        onChange={(e, newValue) => setSessionSelected({...sessionSelected, status: newValue})}
                    >
                        <Option value="not_started">Not Started</Option>
                        <Option value="ongoing">On Going</Option>
                        <Option value="ended">Ended</Option>
                        <Option value="cancelled">Cancelled</Option>
                    </Select>
                    <Box sx={{gridColumn: 'span 4 / span 4', display: 'flex', gap: '10px', justifyContent: 'right'}}>
                        <Button size="md" variant="outlined" color="danger" sx={{paddingX: '30px'}} onClick={handleCancelEdit}>Cancel</Button>
                        <Button size="md" sx={{paddingX: '40px'}} onClick={handleEditSession}>Update</Button>
                    </Box>
                </Box>
            </ModalDialog>
        </Modal>
    );
};

export default EditSessionModal;
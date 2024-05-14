import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import {useDispatch, useSelector} from "react-redux";
import * as adminServices from "../../services/admin";
import {updateStatusChange} from "../../redux/slices/rule";
import {toast} from "sonner";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius:"10px",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

export default function DeleteModel({open = false, setOpen , itemDeleted}) {

    const {statusChange} = useSelector((state) => state.rule)
    const dispatch = useDispatch()
    const handleOpen = () => {
        setOpen(true);
    };

    console.log(itemDeleted)

    const handleDelete = async () => {
        const accessToken = localStorage.getItem('access-token')
        const deleteRule = await adminServices.deleteRule(accessToken, itemDeleted.id)
        if (deleteRule.status === 200) {
            dispatch(updateStatusChange({statusChange: !statusChange}))
            toast.success("Delete Rule Successfully!")
            setOpen(false)
        } else {
            toast.success("Delete Rule Fail!")
        }
    };

    return (
        <>
            <Button onClick={handleOpen}>Open Child Modal</Button>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{...style, width: 400 }}>
                    <h2 id="child-modal-title" className="text-xl font-bold">Are you sure you should delete this rule?</h2>
                    <div className="flex items-center gap-2 mt-4">
                        <Button variant="outlined" color="success"
                            onClick={handleDelete}
                        >
                            Yes
                        </Button>
                        <Button variant="outlined" color="error"
                            onClick={() => setOpen(false)}
                        >
                            Error
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}
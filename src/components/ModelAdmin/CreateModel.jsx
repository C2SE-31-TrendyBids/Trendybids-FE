import React, {useState} from 'react';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Slide from '@mui/material/Slide';
import * as adminServices from "../../services/admin";
import {toast} from "sonner";
import {useDispatch, useSelector} from "react-redux";
import {updateStatusChange} from "../../redux/slices/rule";


const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const CreateModel = ({open, setOpen, rule}) => {

    const [value, setValue] = useState('');
    const {statusChange} = useSelector((state) => state.rule)
    const dispatch = useDispatch()

    const handleClose = () => {
        setOpen(false);
    };


    const handleAddRule = async () => {
        const accessToken = localStorage.getItem('access-token')
        const createRule = await adminServices.createRule(accessToken, {
            ruleNumber: rule?.ruleNumber,
            description: value
        })
        if (createRule?.status === 201) {
            dispatch(updateStatusChange({statusChange: !statusChange}))
            setOpen(false)
            toast.success("Create Rule Successfully!")
        } else {
            toast.error("Create Rule Fail!")
        }
    }

    return (
        <>
            <BootstrapDialog
                sx={{'& .MuiPaper-root': {width: '80%', maxWidth: 800}}}
                onClose={handleClose}
                TransitionComponent={Transition}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
                    Create New Item Rule
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
                <DialogContent sx={{paddingX: "12px", paddingY: "8px"}} dividers>
                    <div className="mt-3 mb-2">
                        <TextField
                            fullWidth
                            sx={{maxHeight: '150px'}}
                            id="outlined-textarea"
                            label="New Rule"
                            size="small"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            multiline
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{fontWeight: "bold"}}
                        autoFocus onClick={handleAddRule}>
                        Create
                    </Button>
                    <Button
                        sx={{fontWeight: "bold"}}
                        autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </>
    );
}

export default CreateModel;
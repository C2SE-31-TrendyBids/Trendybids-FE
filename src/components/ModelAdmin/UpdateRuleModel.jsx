import React, {useState} from 'react';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {LuClipboardEdit} from "react-icons/lu";
import {MdOutlineDelete} from "react-icons/md";
import TextField from '@mui/material/TextField';
import {FaCircleDot} from "react-icons/fa6";
import Slide from '@mui/material/Slide';
import * as adminServices from "../../services/admin";
import {toast} from "sonner";
import DeleteModel from "./DeleteModel";
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

export default function UpdateRuleModel({open, setOpen, rule}) {

    const [value, setValue] = useState('');
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [itemUpdated, setItemUpdated] = useState({})
    const [itemDelete, setItemDelete] = useState({})
    const {statusChange} = useSelector((state) => state.rule)
    const dispatch = useDispatch()
    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdate = async () => {
        const accessToken = localStorage.getItem('access-token')
        const updateRule = await adminServices.updateRule(accessToken, itemUpdated.id, {
            ruleNumber: itemUpdated.ruleNumber,
            description: value
        })
        if (updateRule.status === 200) {
            dispatch(updateStatusChange({statusChange: !statusChange}))
            toast.success("Rule Updated Successfully!")
            setOpen(false)
        } else {
            toast.error("Rule Updated Fail!")
        }
    };


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
                    Rule {rule?.ruleNumber}
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
                    <div className="grid grid-cols-4 w-full mt-1">
                        {
                            rule?.ruleItems?.map((item, index) => {
                                return (
                                    <div key={item?.id}
                                         className="w-full col-span-4 flex items-center justify-between mt-2">
                                        <p className="text-sm text-left flex justify-start items-center break-all">
                                            <FaCircleDot className="block mx-1" size={6}/>
                                            {item?.description}
                                        </p>
                                        <div className="flex items-center gap-1">
                                            <LuClipboardEdit className="block hover:cursor-pointer text-green-500 mx-1"
                                                             size={18}
                                                             onClick={() => {
                                                                 setItemUpdated(item)
                                                                 setValue(item?.description)
                                                                 setOpenEdit(true)
                                                             }}
                                            />
                                            <MdOutlineDelete className="block hover:cursor-pointer text-red-500 mx-1"
                                                             onClick={() => {
                                                                 setItemDelete(item)
                                                                 setOpenDelete(true);
                                                             }}
                                                             size={20}/>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div>
                        {
                            openEdit &&
                            <div className="mt-3 mb-2">
                                <TextField
                                    fullWidth
                                    sx={{maxHeight: '150px'}}
                                    id="outlined-textarea"
                                    label="Rule Item"
                                    size="small"
                                    placeholder="Update Rule"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    multiline
                                />
                            </div>
                        }
                    </div>
                </DialogContent>
                <DialogActions>
                    {openEdit &&
                        <Button
                            sx={{fontWeight: "bold"}}
                            autoFocus onClick={handleUpdate}>
                            Update
                        </Button>
                    }
                    <Button
                        sx={{fontWeight: "bold"}}
                        autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </BootstrapDialog>
            {/*    */}
            {
                openDelete && <DeleteModel open={openDelete} setOpen={setOpenDelete} itemDeleted={itemDelete}/>
            }
        </>
    );
}
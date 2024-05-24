import React, {useEffect} from 'react';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import {FaCircleDot} from "react-icons/fa6";


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


const RuleModel = ({open, setOpen, rules = []}) => {

    const handleClose = () => {
        setOpen(false);
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
                    Terms of Service
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
                    <div className="w-full mt-2">
                        <table className="w-full">
                            <tbody>
                            {
                                    rules.map(rule => {
                                            return (
                                                <tr key={rule?.ruleNumber} className="w-full grid grid-cols-8 gap-2 place-items-center bg-white">
                                                    <th className="w-full text-center col-span-1 px-4 pt-1 text-md font-semibold text-gray-700">
                                                        Term {rule?.ruleNumber}:
                                                    </th>
                                                    <th className="w-full h-auto text-center col-span-7 pt-1 text-md font-semibold text-gray-700 text-wrap">
                                                        {rule?.ruleItems?.map((item, index) => {
                                                            return (
                                                                <div key={item?.id} className="px-2 mt-2">
                                                                    <p className="w-auto pl-2 text-sm text-wrap text-left flex justify-start items-center break-all">
                                                                        <FaCircleDot className="block mx-1" size={6}/>
                                                                        {item?.description}
                                                                    </p>
                                                                </div>
                                                            )
                                                        })}
                                                    </th>
                                                </tr>
                                            )
                                        }
                                    )

                            }
                            </tbody>
                        </table>
                    </div>
                </DialogContent>
                <DialogActions>
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

export default RuleModel;
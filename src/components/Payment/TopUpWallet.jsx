import React, { useEffect, useState } from 'react'
import WalletImage from '../../assets/images/wallet.jpg'
import { FaUser } from "react-icons/fa";
import { IoWallet } from "react-icons/io5";
import { RiFolderUploadFill } from "react-icons/ri";
import Paypal from './Paypal';
import PaymentQrCode from './PaymentQrCode';
import { ImPaypal } from "react-icons/im";
import { BsBank2 } from "react-icons/bs";
import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import logoBank from '../../assets/images/logo-bank.png'
import { toast } from 'sonner';
import CircularProgress from '@mui/material/CircularProgress';

const TopUpWallet = ({ setOpenModal, wallet, change, setChange }) => {
    const accessToken = localStorage.getItem("access-token");
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(false);
    const [amount, setAmount] = useState('')
    const [loading, setLoading] = useState(true)

    const handleOpen = () => {
        if (amount === '') {
            return toast.error("You have not entered an amount")
        }
        setOpen(true);
    }
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute',
        borderRadius: 5,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    useEffect(() => {
        const interval = setInterval(() => {
            const paymentSuccess = localStorage.getItem("payment-success");
            if (paymentSuccess === 'true') {
                setChange(!change);
                toast.success('Payment Successfully');
                setOpenModal(false);
                clearInterval(interval);
                localStorage.removeItem("payment-success")
            }
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        if (status) {
            setChange(!change);
            toast.success('Payment Successfully');
            setOpenModal(false);
        }
    }, [status])

    return (
        <div className='w-full'>
            <div className='flex items-center justify-center'>
                <img src={WalletImage} alt="logo" className='w-36 h-36' />
                <div className='text-3xl font-bold'>
                    <span className='text-orange-600'>E-</span>
                    <span className='text-red-500'>WALLET</span>
                    <span className='ml-2 text-blue-600'>TRENDYBIDS</span>
                </div>
            </div>
            <div className='grid grid-cols-2 gap-2 mt-4'>
                <div className='col-span-1'>
                    <div className='flex items-center justify-start text-xl py-2 font-semibold'>
                        <span><FaUser className='text-2xl text-blue-600' /></span>
                        <span className='ml-2'>E-Wallet Owner</span>
                    </div>
                    <div className='flex items-center justify-start text-xl py-2 font-semibold'>
                        <span><IoWallet className='text-2xl text-blue-600' /></span>
                        <span className='ml-2'>The Money In Wallet</span>
                    </div>
                    <div className='flex items-center justify-start text-xl py-4 font-semibold'>
                        <span><RiFolderUploadFill className='text-2xl text-blue-600' /></span>
                        <span className='ml-2'>Amount deposit</span>
                    </div>

                    <div className='py-3 border border-solid border-gray-800 rounded-lg text-center shadow-lg mt-4'>
                        <div className='text-5xl flex items-center justify-center p-2 text-[#007bff]'>
                            <ImPaypal />
                        </div>
                        <span className='font-bold text-2xl text-[#007bff]'>PAY</span>
                        <span className='font-bold text-2xl text-orange-500'>PAL</span>
                        <div className='mt-16 mx-2'>
                            <Paypal accessToken={accessToken} amount={amount} index={1} />
                        </div>
                    </div>

                </div>
                <div className='col-span-1'>
                    <div className='flex items-center justify-start text-xl py-2'>{wallet?.user?.fullName}</div>
                    <div className='flex items-center justify-start text-xl py-2'>$ {wallet?.money}</div>
                    <div className='flex items-center justify-start py-2'>
                        <input type="number" className='w-full border py-2 px-2 rounded-lg border-solid border-gray-800' placeholder='Input amount' onChange={(e) => setAmount(e.target.value)} />
                    </div>
                    <div className='py-3 border border-solid border-gray-800 rounded-lg text-center shadow-lg mt-4'>
                        <div className='text-5xl flex items-center justify-center p-2 text-[#007bff]'>
                            <BsBank2 />
                        </div>
                        <span className='font-bold text-2xl text-[#007bff]'>BANK</span>
                        <span className='font-bold text-2xl text-orange-500'>TRANSFER</span>
                        <div className='w-full flex items-center justify-center mt-7'>
                            <img src={logoBank} alt="logo" className=' w-32' />
                        </div>
                        <div className='mt-6 mb-6'>
                            <button className='border rounded-lg w-[90%] font-semibold py-2 bg-blue-500 text-white hover:bg-blue-700' onClick={handleOpen}>PAYMENT</button>
                        </div>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <PaymentQrCode amount={amount} setOpen={setOpen} setStatus={setStatus} index={1} receiverId={null} />
                            </Box>
                        </Modal>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default TopUpWallet

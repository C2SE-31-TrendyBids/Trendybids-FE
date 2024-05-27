import React, { useEffect, useState } from 'react'
import logo from '../../assets/images/logo.jpg'
import { getWallet, paymentWallet, otpTranferMoney, verifyOtp } from '../../services/payment';
import { toast } from 'sonner';
import OtpInput from './Otp';
import { Box, Modal } from '@mui/material';
import PageLoading from '../Loading/PageLoading'

const PayEWallet = ({ amount, accessToken, setStatus, setOpen, index, receiverId, auctionId }) => {
    const [wallet, setWallet] = useState('');
    const [openModalOtp, setOpenModalOtp] = useState(false);
    const handleOpenModalOtp = () => setOpenModalOtp(true);
    const handleCloseModalOtp = () => setOpenModalOtp(false);
    const [openModalLoading, setOpenModalLoading] = useState(false);
    const handleOpenModalLoading = () => setOpenModalLoading(true);
    const handleCloseModalLoading = () => setOpenModalLoading(false);
    const userData = JSON.parse(localStorage.getItem('auth'));
    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await getWallet(accessToken)
                setWallet(response?.data?.wallet)
            }
            if (accessToken) {
                fetchData()
            }
        } catch (error) {
            console.log(error);
        }
    }, [])
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
    const styleLoading = {
        position: 'absolute',
        borderRadius: 5,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 200,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const handlePayment = async () => {
        handleOpenModalLoading()
        try {
            const otpData = await otpTranferMoney(accessToken)
            if (otpData.status === 200) {
                handleCloseModalLoading()
                handleOpenModalOtp()
            }
        } catch (error) {
            toast.error('Payment Error')
        }
    }
    const handleClose = () => setOpen(false);
    const onOtpSubmit = async (otp) => {
        try {
            const verify = await verifyOtp(accessToken, otp)
            if (verify.status === 200) {
                let body = { index: index, amount: amount, receiverId: receiverId, auctionId: auctionId }
                const payment = await paymentWallet(accessToken, body)
                console.log(payment);
                if (payment.status === 200) {
                    toast.success("Payment Successfully")
                    setStatus(true)
                    setOpen(false)
                } else {
                    toast.error('Payment Error')
                }
            }
            else {
                toast.success("The OTP you entered is incorrect")
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className='w-full'>
            <div className='w-full flex items-center justify-center'>
                <img src={logo} alt="logo " className='w-32 h-32' />
                <div className='text-3xl font-bold'>
                    <span className='text-orange-600'>E-</span>
                    <span className='text-red-500'>WALLET</span>
                    <span className='ml-2 text-blue-600'>TRENDYBIDS</span>
                </div>
            </div>
            <div className='grid grid-cols-3 gap-2 mt-6'>
                <div className='col-span-2 font-semibold text-base'>
                    <div className='py-1'>E-Wallet owner</div>
                    <div className='py-1'>Receiver</div>
                    <div className='py-1'>Remaining amount in E-Wallet</div>
                    <div className='py-1'>Amount to be paid for the service</div>
                    <div className='py-1'>The remaining amount in the wallet</div>
                </div>
                <div className='col-span-1 font-semibold text-base'>
                    <div className='py-1'>{userData?.fullName}</div>
                    <div className='py-1'>Admin</div>
                    <div className='py-1'>$ {wallet?.money} </div>
                    <div className='py-1'>$ {amount}</div>
                    <div className='py-1'>$ {wallet?.money - amount}</div>
                </div>

            </div>
            <div className='text-end mt-6'>
                <button className='bg-blue-600 px-4 py-2 border rounded-lg mx-4 font-semibold text-gray-200 hover:bg-blue-800 hover:text-white' onClick={handlePayment}> PAYMENT</button>
                <button className='bg-red-600 px-5 py-2 border rounded-lg mx-4 font-semibold text-gray-200 hover:bg-red-800 hover:text-white' onClick={handleClose}>CANCE</button>
            </div>
            <Modal
                open={openModalOtp}
                onClose={handleCloseModalOtp}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <OtpInput length={6}
                        onOtpSubmit={onOtpSubmit} />
                </Box>
            </Modal>
            <Modal
                open={openModalLoading}
                onClose={handleCloseModalLoading}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleLoading}>
                    <PageLoading />
                </Box>
            </Modal>
        </div>
    )
}

export default PayEWallet

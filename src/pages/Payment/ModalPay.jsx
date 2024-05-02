import React, { useEffect, useState } from 'react'
import { IoMdClose, IoLogoUsd } from "react-icons/io";
import { GiWallet } from "react-icons/gi";
import { ImPaypal } from "react-icons/im";
import { BsBank2 } from "react-icons/bs";
import Paypal from '../../components/Payment/Paypal';
import PayEWallet from '../../components/Payment/PayEWallet';
import PaymentQrCode from '../../components/Payment/PaymentQrCode';
import TopUpWallet from '../../components/Payment/TopUpWallet';
import logoBank from '../../assets/images/logo-bank.png'
import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import { getWallet } from '../../services/payment';
import money from '../../assets/images/money.png'


const ModalPay = ({ modalOpen, amount, accessToken, status, setStatus, index }) => {
    const [open, setOpen] = useState(false);
    const [openEWallet, setOpenEWallet] = useState(false);
    const [openTopUp, setOpenTopUp] = useState(false);
    const [wallet, setWallet] = useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenEWallet = () => setOpenEWallet(true);
    const handleCloseEWallet = () => setOpenEWallet(false);
    const handleOpenTopUp = () => setOpenTopUp(true);
    const handleCloseTopUp = () => setOpenTopUp(false);

    useEffect(() => {
        if (status) {
            modalOpen(false)
        }
    }, [status])

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

    return (
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif] animate-fade-up animate-duration-200 animate-delay-[6ms] animate-ease-linear">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-md p-6 relative">
                <div className="flex items-center pb-3 border-b text-[#007bff]">
                    <h3 className="text-2xl font-bold flex-1">PAYMENT</h3>
                    <button onClick={() => modalOpen(false)}>
                        <IoMdClose className="ml-2 cursor-pointer shrink-0 fill-black hover:fill-red-500 text-2xl" />
                    </button>
                </div>
                <div className='w-full flex items-center justify-center'>
                    <div className='m-4'>
                        <div className='flex items-center justify-center'>
                            <div className='flex my-2 border px-6 py-4 font-bold text-4xl rounded-lg border-gray-800 shadow-lg items-center justify-center '>
                                <img src={money} alt="" className='w-24 h-24' />
                                <span className='text-red-500'><IoLogoUsd /></span>
                                <span className='ml-2 text-red-500 font-semibold'>{amount}</span>
                            </div>
                        </div>
                        <div className='my-4'>
                            <div className='text-2xl font-semibold mb-2'>Select payment method :</div>
                            <div className='w-[700px] grid grid-cols-3 gap-2'>
                                <div className='col-span-1 py-3 border border-solid border-gray-800 rounded-lg text-center shadow-lg'>
                                    <div className='text-5xl flex items-center justify-center p-2 text-[#007bff]'>
                                        <GiWallet />
                                    </div>
                                    <span className='font-bold text-2xl text-[#007bff]'>WAL</span>
                                    <span className='font-bold text-2xl text-orange-500'>LET</span>
                                    <div className='mt-2'>
                                        <span>Balance in account :</span>
                                        <div className='flex text-xl items-center justify-center'>
                                            <span><IoLogoUsd /></span>
                                            <span className='font-semibold'>{wallet?.money}</span>
                                        </div>
                                    </div>
                                    <div className='mt-4'>
                                        {amount < wallet?.money ? (
                                            <button className='border rounded-lg w-[90%] font-semibold py-2 bg-blue-500 text-white hover:bg-blue-700' onClick={handleOpenEWallet}>PAYMENT</button>
                                        ) : (
                                            <button className='border rounded-lg w-[90%] font-semibold py-2 bg-blue-500 text-white hover:bg-blue-700' disabled>PAYMENT</button>
                                        )}
                                        <button className='border rounded-lg w-[90%] font-semibold py-2 mt-2 bg-gray-200 hover:bg-gray-700 hover:text-white' onClick={handleOpenTopUp}>RECHARGE</button>
                                        <Modal
                                            open={openEWallet}
                                            onClose={handleCloseEWallet}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={style}>
                                                <PayEWallet amount={amount} setOpen={setOpenEWallet} accessToken={accessToken} setStatus={setStatus} index={index} />
                                            </Box>
                                        </Modal>
                                        <Modal
                                            open={openTopUp}
                                            onClose={handleCloseTopUp}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={style}>
                                                <TopUpWallet setOpenModal={setOpenTopUp} />
                                            </Box>
                                        </Modal>
                                    </div>
                                </div>
                                <div className='col-span-1 py-3 border border-solid border-gray-800 rounded-lg text-center shadow-lg'>
                                    <div className='text-5xl flex items-center justify-center p-2 text-[#007bff]'>
                                        <ImPaypal />
                                    </div>
                                    <span className='font-bold text-2xl text-[#007bff]'>PAY</span>
                                    <span className='font-bold text-2xl text-orange-500'>PAL</span>
                                    <div className='mt-16 mx-2'>
                                        <Paypal accessToken={accessToken} amount={amount} index={index} />
                                    </div>
                                </div>
                                <div className='col-span-1 py-3 border border-solid border-gray-800 rounded-lg text-center shadow-lg'>
                                    <div className='text-5xl flex items-center justify-center p-2 text-[#007bff]'>
                                        <BsBank2 />
                                    </div>
                                    <span className='font-bold text-2xl text-[#007bff]'>BANK</span>
                                    <span className='font-bold text-2xl text-orange-500'>TRANSFER</span>
                                    <div className='w-full flex items-center justify-center mt-6'>
                                        <img src={logoBank} alt="logo" className=' w-32' />
                                    </div>
                                    <div className='mt-6'>
                                        <button className='border rounded-lg w-[90%] font-semibold py-2 bg-blue-500 text-white hover:bg-blue-700' onClick={handleOpen}>PAYMENT</button>
                                    </div>
                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <PaymentQrCode amount={amount} setOpen={setOpen} setStatus={setStatus} />
                                        </Box>
                                    </Modal>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ModalPay

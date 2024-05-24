import React, { useEffect, useState } from 'react'
import logo from '../../assets/images/logo.jpg'
import { getWalletById } from '../../services/payment'
import PayEWallet from './PayEWallet'
import { Box, Modal } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
const TranferMoney = ({ setOpenModal, wallet, accessToken, change, setChange }) => {
    const [money, setMoney] = useState('')
    const [status, setStatus] = useState(false)
    const [openEWallet, setOpenEWallet] = useState(false);
    const [accountOwner, setAccountOwner] = useState('')
    const [accountNumber, setAccountNumber] = useState('')
    const [receiverId, setReceiverId] = useState('')
    const handleOpenEWallet = () => setOpenEWallet(true);
    const handleCloseEWallet = () => setOpenEWallet(false);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await getWalletById(accessToken, accountNumber)
                setAccountOwner(response?.data?.wallet?.user?.fullName)
                setReceiverId(response?.data?.wallet?.user?.id)
                console.log(response);
            }
            fetchData()
        } catch (error) {
            console.log(error);
        }
    }, [accountNumber])

    useEffect(() => {
        console.log(status);
        if (status) {
            setOpenModal(false)
            setChange(!change)
        }
    }, [status])

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
        <div className='w-full'>
            <div className='flex items-center justify-center'>
                <img src={logo} alt="LogoTrendybids" className='w-36' />
            </div>
            <div className='text-center text-2xl text-blue-600 font-bold'>
                TRANSFER MONEY
            </div>
            <form className='border mt-8 rounded-lg shadow-lg'>
                <div className='text-start ml-12 text-base font-semibold mt-2'>
                    Amount Of Money :
                </div>
                <div className='text-center '>
                    <input type="number" className='w-[40%] border border-solid border-gray-800 outline-none py-4 my-2 text-3xl px-4 rounded-lg'
                        placeholder='00.00 USD' onChange={(e) => setMoney(e.target.value)} />
                </div>
                <div className='text-start ml-12 text-base font-semibold mt-2'>
                    Account Number :
                </div>
                <div className='text-center '>
                    <input type="text" className='w-[80%] border border-solid border-gray-800 outline-none py-2 my-2 text-xl px-4 rounded-lg' value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                </div>
                <div className='text-start ml-12 text-base font-semibold mt-2'>
                    Account Owner :
                </div>
                <div className='text-center '>
                    <input type="text" className='w-[80%] border border-solid border-gray-800 outline-none py-2 my-2 text-xl px-4 rounded-lg' disabled value={accountOwner} />
                </div>
                <div className='flex items-center justify-between my-4'>
                    {loading ? (
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <button type='button' className='ml-10 w-[40%] py-2 border bg-blue-600 text-white rounded-lg font-bold text-xl hover:bg-blue-800' onClick={(e) => { handleOpenEWallet(); setLoading(true) }}>TRANFER</button>
                    )}
                    <button className='mr-10 w-[40%] py-2 border bg-red-600 text-white rounded-lg font-bold text-xl hover:bg-red-800'>CANCE</button>
                </div>
                <Modal
                    open={openEWallet}
                    onClose={handleCloseEWallet}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <PayEWallet amount={money} setOpen={setOpenEWallet} accessToken={accessToken} setStatus={setStatus} index={5} receiverId={receiverId} />
                    </Box>
                </Modal>
            </form >
        </div >
    )
}

export default TranferMoney

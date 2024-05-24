
import React, { useEffect, useState } from 'react'
import bgWallet from '../../assets/images/bg-wallet.jpg'
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import tranfer from '../../assets/images/tranferMoney.png'
import AuctionBid from '../../assets/images/auctionBid.jpg'
import RigisterCensor from '../../assets/images/register.jpg'
import TopUp from '../../assets/images/topUp.jpg'
import UploadProduct from '../../assets/images/upload.png'
import PayProduct from '../../assets/images/payProduct.png'
import { getWallet } from '../../services/payment'
import TopUpWallet from '../../components/Payment/TopUpWallet';
import { toast } from 'sonner';
import { Box, Modal } from '@mui/material';
import { Link } from 'react-router-dom';
import TranferMoney from '../../components/Payment/TranferMoney';
import { IoCopyOutline } from "react-icons/io5";
const EWallet = () => {
    const [change, setChange] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showAccount, setShowAccount] = useState(false);
    const accessToken = localStorage.getItem('access-token');
    const [wallet, setWallet] = useState('');

    const [openTopUp, setOpenTopUp] = useState(false);
    const [openTranfer, setOpenTranfer] = useState(false);
    const handleOpenTopUp = () => setOpenTopUp(true);
    const handleCloseTopUp = () => setOpenTopUp(false);
    const handleOpenTranfer = () => setOpenTranfer(true);
    const handleCloseTranfer = () => setOpenTranfer(false);
    useEffect(() => {
        try {
            const fetchData = async () => {
                const respone = await getWallet(accessToken)
                if (respone?.status === 200) {
                    setWallet(respone?.data?.wallet)
                }
                else {
                    toast.error("Error accessToken")
                }
            }
            if (accessToken) {
                fetchData()
                console.log(wallet);
            }
        } catch (error) {

        }
    }, [accessToken, change])
    const copyText = () => {
        const textToCopy = wallet?.id;
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                toast.success("Copied successfully");
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                toast.error("Failed to copy");
            });
    }
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
        <div className='max-w-[1230px] mx-auto px-[30px] h-auto py-4'>
            <div className='relative'>
                <img src={bgWallet} alt="bg" />
                <div className='text-4xl font-bold absolute top-16'>
                    <span className='text-orange-600'>E-</span>
                    <span className='text-red-500'>WALLET</span>
                    <span className='ml-2 text-blue-600'>TRENDY-BIDS</span>
                </div>
            </div>
            <div className='grid grid-cols-12 gap-2 mt-10'>
                <div className='col-span-6'>
                    <div className='flex items-center justify-center'>
                        <div className='w-4/5 border p-4 font-semibold border-solid border-gray-900 shadow-lg rounded-lg h-[200px]'>
                            <div className='flex text-2xl'>
                                <span><FaUser className='text-2xl text-blue-600' /></span>
                                <span className='ml-2'>E-Wallet Owner :</span>
                            </div>
                            <div className='text-end text-2xl'>
                                {wallet?.user?.fullName}
                            </div>
                            <div className='flex text-2xl mt-2'>
                                <span><GiWallet className='text-2xl text-blue-600' /></span>
                                <span className='ml-2'>Wallet Account Number :</span>
                            </div>
                            <div className='relative text-3xl my-2'>
                                {showAccount ? (
                                    <span class="bg-gray-100 flex gap-5 items-center justify-between py-2 px-4 w-[90%] text-base rounded-full">
                                        <code class="text-blue-900 text-left whitespace-nowrap overflow-hidden overflow-ellipsis">
                                            {wallet?.id}
                                        </code>
                                        <span class="text-blue-900 cursor-pointer">
                                            <IoCopyOutline onClick={copyText} />
                                        </span>
                                    </span>
                                ) : (
                                    <h1 className=' text-center py-1'> ********</h1>
                                )}

                                <span className="absolute right-2 top-2">
                                    {showAccount ? (
                                        <MdOutlineVisibility onClick={() => setShowAccount(false)} />
                                    ) : (
                                        <MdOutlineVisibilityOff onClick={() => setShowAccount(true)} />
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-span-6'>
                    <div className='flex items-center justify-center'>
                        <div className='w-3/5 border p-4 font-semibold border-solid border-gray-900 shadow-lg rounded-lg h-[115px]'>
                            <span className='text-2xl mb-1 text-blue-600'> TOTAL AMOUNT : </span>
                            <div className='relative mt-2'>
                                {showPassword ? (
                                    <h1 className='text-4xl text-center text-red-500'> ${wallet?.money}</h1>
                                ) : (
                                    <h1 className='text-5xl text-center'> ********</h1>
                                )}

                                <span className="absolute right-2 text-4xl top-0">
                                    {showPassword ? (
                                        <MdOutlineVisibility onClick={() => setShowPassword(false)} />
                                    ) : (
                                        <MdOutlineVisibilityOff onClick={() => setShowPassword(true)} />
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-center'>
                        <button className='w-3/5 border p-3 rounded-lg mt-6 font-semibold text-xl border-solid border-green-600 bg-blue-800 text-gray-100 hover:bg-blue-500' onClick={handleOpenTopUp}>TOP UP YOUR WALLET</button>
                        <Modal
                            open={openTopUp}
                            onClose={handleCloseTopUp}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <TopUpWallet setOpenModal={setOpenTopUp} wallet={wallet} change={change} setChange={setChange} />
                            </Box>
                        </Modal>
                    </div>

                </div>
            </div>
            <div className='w-full my-4 '>
                <div className='ml-4 text-2xl font-bold p-2'>E-Wallet Trendy Bids is possible</div>
                <div className='grid grid-cols-12 gap-2 mt-4'>
                    <div className='col-span-4 flex items-center justify-center'>
                        <div className='w-4/5 border py-2 rounded-lg border-solid border-gray-900 cursor-pointer hover:scale-105 hover:border-green-500 shadow-lg  transition-transform duration-300'
                            onClick={handleOpenTranfer}>
                            <div className='flex items-center justify-center'>
                                <img src={tranfer} alt="tranfer" className='w-64 h-40' />
                            </div>
                            <div className='text-center text-2xl font-semibold'>
                                Transfer Money
                            </div>
                        </div>
                        <Modal
                            open={openTranfer}
                            onClose={handleCloseTranfer}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <TranferMoney setOpenModal={setOpenTranfer} wallet={wallet} accessToken={accessToken} change={change} setChange={setChange} />
                            </Box>
                        </Modal>
                    </div>

                    <div className='col-span-4 flex items-center justify-center '>
                        <div className='w-4/5 border py-2 rounded-lg border-solid border-gray-900 cursor-pointer hover:scale-105 hover:border-green-500 shadow-lg transition-transform duration-300'>
                            <div className='flex items-center justify-center'>
                                <img src={PayProduct} alt="Pay product" className='w-64 h-40' />
                            </div>
                            <div className='text-center text-2xl font-semibold'>
                                Payment Product
                            </div>
                        </div>
                    </div>
                    <div className='col-span-4 flex items-center justify-center '>
                        <div className='w-4/5 border py-2 rounded-lg border-solid border-gray-900 cursor-pointer hover:scale-105 hover:border-green-500 shadow-lg transition-transform duration-300'>
                            <Link to='/product-auction'>
                                <div className='flex items-center justify-center'>
                                    <img src={AuctionBid} alt="auctionbid" className='w-64 h-40' />
                                </div>
                                <div className='text-center text-2xl font-semibold'>
                                    Participate Session
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className='col-span-4 flex items-center justify-center mt-10'>
                        <div className='w-4/5 border py-2 rounded-lg border-solid border-gray-900 cursor-pointer hover:scale-105 hover:border-green-500 shadow-lg transition-transform duration-300'>
                            <Link to='/profile/management-post'>
                                <div className='flex items-center justify-center'>
                                    <img src={UploadProduct} alt="Upload" className='w-64 h-40' />
                                </div>
                                <div className='text-center text-2xl font-semibold'>
                                    Post Product
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className='col-span-4 flex items-center justify-center mt-10'>
                        <div className='w-4/5 border py-2 rounded-lg border-solid border-gray-900 cursor-pointer hover:scale-105 hover:border-green-500 shadow-lg transition-transform duration-300'>
                            <Link to='/register-censor'>
                                <div className='flex items-center justify-center'>
                                    <img src={RigisterCensor} alt="register censor" className='w-64 h-40' />
                                </div>
                                <div className='text-center text-2xl font-semibold'>
                                    Register Organization
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className='col-span-4 flex items-center justify-center mt-10' >
                        <div className='w-4/5 border py-2 rounded-lg border-solid border-gray-900 cursor-pointer hover:scale-105 hover:border-green-500 shadow-lg transition-transform duration-300' onClick={handleOpenTopUp}>
                            <div className='flex items-center justify-center'>
                                <img src={TopUp} alt="topup" className='w-64 h-40' />
                            </div>
                            <div className='text-center text-2xl font-semibold'>
                                Top Up Money
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default EWallet

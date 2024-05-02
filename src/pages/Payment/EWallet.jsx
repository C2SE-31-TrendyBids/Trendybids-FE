import React, { useState } from 'react'
import bgWallet from '../../assets/images/bg-wallet.jpg'
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import tranfer from '../../assets/images/tranferMoney.png'
import AuctionBid from '../../assets/images/auctionBid.jpg'
import RigisterCensor from '../../assets/images/register.jpg'
import TopUp from '../../assets/images/topUp.jpg'
import UploadProduct from '../../assets/images/upload.png'
import PayProduct from '../../assets/images/payProduct.png'

const EWallet = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showAccount, setShowAccount] = useState(false);


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
                        <div className='w-4/5 border p-4 font-semibold border-solid border-gray-900 shadow-lg rounded-lg'>
                            <div className='flex text-2xl'>
                                <span><FaUser className='text-2xl text-blue-600' /></span>
                                <span className='ml-2'>E-Wallet Owner :</span>
                            </div>
                            <div className='text-end text-2xl'>
                                Quang
                            </div>
                            <div className='flex text-2xl mt-2'>
                                <span><GiWallet className='text-2xl text-blue-600' /></span>
                                <span className='ml-2'>Wallet Account Number :</span>
                            </div>
                            <div className='relative text-3xl mt-2'>
                                {showAccount ? (
                                    <h1 className='ml-4 rounded-lg py-1 w-[80%] text-center text-red-500 bg-gray-200 text-base'> ab6d9878-7122-47e5-a25d-c02f0076648f</h1>
                                ) : (
                                    <h1 className=' text-center'> ********</h1>
                                )}

                                <span className="absolute right-2  top-0">
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
                        <div className='w-3/5 border p-4 font-semibold border-solid border-gray-900 shadow-lg rounded-lg'>
                            <span className='text-2xl mb-1 text-blue-600'> TOTAL AMOUNT : </span>
                            <div className='relative'>
                                {showPassword ? (
                                    <h1 className='text-5xl text-center text-red-500'> $12000</h1>
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
                        <button className='w-3/5 border p-3 rounded-lg mt-6 font-semibold text-xl border-solid border-green-600 bg-blue-800 text-gray-100 hover:bg-blue-500'>TOP UP YOUR WALLET</button>
                    </div>
                </div>
            </div>
            <div className='w-full my-4 '>
                <div className='ml-4 text-2xl font-bold p-2'>E-Wallet Trendy Bids is possible</div>
                <div className='grid grid-cols-12 gap-2 mt-4'>
                    <div className='col-span-4 flex items-center justify-center '>
                        <div className='w-4/5 border py-2 rounded-lg border-solid border-gray-900 cursor-pointer hover:scale-110 hover:border-green-500 shadow-lg'>
                            <div className='flex items-center justify-center'>
                                <img src={tranfer} alt="tranfer" className='w-64 h-40' />
                            </div>
                            <div className='text-center text-2xl font-semibold'>
                                Tranfer Money
                            </div>
                        </div>
                    </div>
                    <div className='col-span-4 flex items-center justify-center '>
                        <div className='w-4/5 border py-2 rounded-lg border-solid border-gray-900 cursor-pointer hover:scale-110 hover:border-green-500 shadow-lg'>
                            <div className='flex items-center justify-center'>
                                <img src={PayProduct} alt="Pay product" className='w-64 h-40' />
                            </div>
                            <div className='text-center text-2xl font-semibold'>
                                Payment Product
                            </div>
                        </div>
                    </div>
                    <div className='col-span-4 flex items-center justify-center '>
                        <div className='w-4/5 border py-2 rounded-lg border-solid border-gray-900 cursor-pointer hover:scale-110 hover:border-green-500 shadow-lg'>
                            <div className='flex items-center justify-center'>
                                <img src={AuctionBid} alt="auctionbid" className='w-64 h-40' />
                            </div>
                            <div className='text-center text-2xl font-semibold'>
                                Participate Session
                            </div>
                        </div>
                    </div>
                    <div className='col-span-4 flex items-center justify-center mt-10'>
                        <div className='w-4/5 border py-2 rounded-lg border-solid border-gray-900 cursor-pointer hover:scale-110 hover:border-green-500 shadow-lg'>
                            <div className='flex items-center justify-center'>
                                <img src={UploadProduct} alt="Upload" className='w-64 h-40' />
                            </div>
                            <div className='text-center text-2xl font-semibold'>
                                Post Product
                            </div>
                        </div>
                    </div>
                    <div className='col-span-4 flex items-center justify-center mt-10'>
                        <div className='w-4/5 border py-2 rounded-lg border-solid border-gray-900 cursor-pointer hover:scale-110 hover:border-green-500 shadow-lg'>
                            <div className='flex items-center justify-center'>
                                <img src={RigisterCensor} alt="register censor" className='w-64 h-40' />
                            </div>
                            <div className='text-center text-2xl font-semibold'>
                                Register Organization
                            </div>
                        </div>
                    </div>
                    <div className='col-span-4 flex items-center justify-center mt-10'>
                        <div className='w-4/5 border py-2 rounded-lg border-solid border-gray-900 cursor-pointer hover:scale-110 hover:border-green-500 shadow-lg'>
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

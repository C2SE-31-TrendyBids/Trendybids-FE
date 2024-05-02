import React, { useEffect, useState } from 'react'
import logo from '../../assets/images/logo.jpg'
import { getWallet, paymentWallet } from '../../services/payment';
import { toast } from 'sonner';

const PayEWallet = ({ amount, accessToken, setStatus, setOpen, index, receiverId }) => {
    const [wallet, setWallet] = useState('');
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
    const handlePayment = async () => {
        try {
            let body = { index: index, amount: amount, receiverId: receiverId }
            const payment = await paymentWallet(accessToken, body)
            if (payment.status === 200) {
                toast.success("Payment Successfully")
                setStatus(true)
                setOpen(false)
            } else {
                toast.error('Payment Error')
            }
        } catch (error) {
            toast.error('Payment Error')
        }
    }
    const handleClose = () => setOpen(false);

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
        </div>
    )
}

export default PayEWallet

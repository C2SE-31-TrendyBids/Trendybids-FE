import React, { useEffect, useState } from 'react'
import { paymentWithQr, qrSuccess } from '../../services/payment'
import { Link } from "react-router-dom";
import logo from "../../public/images/logoTrendy1.jpg";

const PaymentQrCode = ({ amount, setStatus, setOpen, receiverId, auctionId, index }) => {
    const accessToken = localStorage.getItem('access-token');
    const [data, setData] = useState('')
    useEffect(() => {
        const returnData = async () => {
            try {
                if (amount) {
                    const data = await paymentWithQr(accessToken, amount);
                    setData(data?.data?.data)
                }
            } catch (error) {
                console.log(error);
            }
        };
        returnData();
    }, [amount]);
    const handlePayment = async () => {
        console.log(receiverId);
        console.log(auctionId);
        console.log(amount);
        console.log(index);
        let body = {
            index: index,
            amount: amount,
            receiverId: receiverId,
            auctionId: auctionId
        }
        try {
            const qrSuccessfully = await qrSuccess(accessToken, body)
            if (qrSuccessfully.status === 200) {
                setStatus(true)
                setOpen(false)
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="bg-gray-100 h-auto flex items-center justify-center">
            <div className="bg-white p-6 w-[600px]  md:mx-auto text-center">
                <Link to="/" className='flex items-center justify-center'>
                    <div className="">
                        <img
                            src={logo}
                            alt=""
                            className="max-w-32 max-h-32"
                        />
                    </div>
                </Link>
                <div className='text-sm mb-2'>NGÂN HÀNG QUÂN ĐỘI MBBANK</div>
                <div className='text-2xl font-bold text-blue-500 mb-2'>TRENDY BIDS </div>
                <div className='rounded-lg bg-blue-100 font-semibold text-xl p-2'>9704229202077780927</div>
                <div className='flex items-center justify-center relative'>
                    <img src={data} alt="qrcode" className='w-80 h-80 ' />
                </div>
                <button className='border p-2 rounded-lg border-green-400 font-semibold hover:bg-green-700 hover:text-white'
                    onClick={((e) => handlePayment())}>Payment Successfully</button>
            </div>
        </div>
    )
}

export default PaymentQrCode

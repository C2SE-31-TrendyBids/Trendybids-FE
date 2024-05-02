import React from 'react'
import { createPaymentPaypal } from '../../services/payment'

const Paypal = ({ accessToken, amount, index }) => {

    const SubmitEvent = async () => {
        let body = {
            amount: amount,
            index: index
        }
        try {
            const paymentPaypal = await createPaymentPaypal(accessToken, body)
            console.log(paymentPaypal);
            if (paymentPaypal.status === 200) {
                window.open(paymentPaypal.data, "_blank");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <button className='w-full p-1 text-xl border bg-[#FFC439] rounded-lg font-semibold italic hover:bg-[#F8B20F]' onClick={() => SubmitEvent()} >
                <span className='text-[#003087]'>Pay</span>
                <span className='text-[#009CDE]'>Pal</span>
            </button>
            <button className='mt-2 w-full p-2 text-sm border bg-gray-900 rounded-lg font-semibold text-gray-300 hover:text-white' onClick={() => SubmitEvent()} >
                <span>Debit or credit card</span>
            </button>
            <span className='text-xs mt-2'>Supported by
                <span className='text-[#003087] font-semibold'>Pay</span>
                <span className='text-[#009CDE] font-semibold'>Pal</span>
            </span>
        </div>



    )
}

export default Paypal

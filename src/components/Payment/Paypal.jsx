import React from 'react'
import { createPaymentPaypal } from '../../services/payment'
import { toast } from 'sonner'

const Paypal = ({ accessToken, amount, receiverId, auctionId, index }) => {

    const SubmitEvent = async () => {
        if (amount === '') {
            return toast.error("You have not entered an amount")
        }
        let body = {
            amount: amount,
            index: index,
            receiverId: receiverId,
            auctionId: auctionId
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
        <div >
            <button className='w-full py-2  border bg-[#FFC439] rounded-lg font-semibold italic hover:bg-[#F8B20F] block' onClick={() => SubmitEvent()} >
                <span className='text-[#003087]'>Pay</span>
                <span className='text-[#009CDE]'>Pal</span>
            </button>

            <button className='w-full py-2 mt-2 border bg-gray-900 rounded-lg font-semibold text-gray-300 hover:text-white block' onClick={() => SubmitEvent()} >
                <span>Debit or credit card</span>
            </button>
        </div>
    )
}

export default Paypal

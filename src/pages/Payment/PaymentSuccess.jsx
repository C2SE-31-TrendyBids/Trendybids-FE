import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { paypalSuccess } from '../../services/payment';
import { Link } from "react-router-dom";
import logo from "../../public/images/logoTrendy1.jpg";

const PaymentSuccess = () => {
    const location = useLocation();
    const queryString = location.search;
    const urlParams = new URLSearchParams(queryString);
    const accessToken = localStorage.getItem('access-token');

    useEffect(() => {
        const paymentId = urlParams.get('paymentId');
        const token = urlParams.get('token');
        const payerId = urlParams.get('PayerID');
        const body = {
            paymentId: paymentId,
            token: token,
            payerId: payerId
        }
        const returnData = async () => {
            try {
                const data = await paypalSuccess(accessToken, body);
                if (data.status === 200) {
                    localStorage.setItem("payment-success", true);
                }
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };
        returnData();
    }, []);

    return (
        <div className="bg-gray-100 h-screen flex items-center justify-center">
            <div className="bg-white p-6  md:mx-auto">
                <Link to="/" className='flex items-center justify-center'>
                    <div className="">
                        <img
                            src={logo}
                            alt=""
                            className="max-w-32 max-h-32 lg:mt-4"
                        />
                    </div>
                </Link>
                <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                    <path fill="currentColor"
                        d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                    </path>
                </svg>
                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Done!</h3>
                    <p className="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
                    <p> Have a great day!  </p>
                    <Link to="/">
                        <div className="py-10 text-center">
                            <button className="w-full px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                                GO BACK
                            </button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PaymentSuccess;

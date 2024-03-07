import React, { useState } from 'react'
import logo from "../../../public/images/logoTrendy.jpg"
import { Button, CircularProgress, Link } from '@mui/material'
import * as authApi from '../../../services/auth'
import { useNavigate } from "react-router-dom";
const CodeOtp = ({ closeModal, email, password, index }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [numberOne, setNumberOne] = useState("")
    const [numberTwo, setNumberTwo] = useState("")
    const [numberThree, setNumberThree] = useState("")
    const [numberFour, setNumberFour] = useState("")
    const [numberFive, setNumberFive] = useState("")
    const [numberSix, setNumberSix] = useState("")

    const validationOTP = () => {
        if (numberOne === "" || numberTwo === "" || numberThree === "" || numberFour === "" || numberFive === "" || numberSix === "") {
            return false;
        }
        return true;
    }
    const handleSubmit = async () => {
        setLoading(true)
        if (validationOTP) {
            const otpString = numberOne + numberTwo + numberThree + numberFour + numberFive + numberSix
            if (index === 'register') {
                const verifyOtp = await authApi.verifyEmail(email, otpString)
                if (verifyOtp?.statusCode === 200) {
                    console.log('Đăng kí thành công');
                    navigate('/login');
                    closeModal(false)
                    setLoading(false)
                }
                else {
                    console.log('otp sai ....');
                    setLoading(false)

                }
            }
            else if (index === 'reset') {
                const resetPasRe = await authApi.resetPassword(email, password, otpString)
                if (resetPasRe?.statusCode === 200) {
                    console.log('Đặt lại mật khẩu thành công');
                    navigate('/login');
                    closeModal(false)
                    setLoading(false)

                }
                else {
                    console.log('otp sai ....');
                    setLoading(false)
                }
            }
        }
    }

    return (
        <div className="block overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-10 justify-center items-center w-full md:inset-0 h-full bg-black/50 hover:cursor-pointer no-scrollbar"
            onClick={() => closeModal(false)}>
            <div
                className="relative top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 p-4 w-full max-w-2xl max-h-full"
                onClick={(e) => e.stopPropagation()}>
                <div className="relative bg-white rounded-lg shadow">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                        <button type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                            data-modal-hide="default-modal"
                            onClick={() => closeModal(false)} >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                    strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="h-40 w-40 overflow-hidden">
                            <img src={logo} alt="" className="h-full w-full object-cover scale-150" />
                        </div>
                    </div>
                    <div className='flex items-center justify-center pb-10 mt-2'>
                        <div className='w-[70%]'>
                            <div className="flex flex-col space-y-5">
                                <div className="flex flex-row items-center justify-between mx-auto w-full">
                                    <div className="w-12 h-12 ">
                                        <input
                                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                            type="text"
                                            value={numberOne}
                                            onChange={(e) => setNumberOne(e.target.value)}
                                        />
                                    </div>
                                    <div className="w-12 h-12 ">
                                        <input
                                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                            type="text"
                                            value={numberTwo}
                                            onChange={(e) => setNumberTwo(e.target.value)}
                                        />
                                    </div>
                                    <div className="w-12 h-12 ">
                                        <input
                                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                            type="text"
                                            value={numberThree}
                                            onChange={(e) => setNumberThree(e.target.value)}
                                        />
                                    </div>
                                    <div className="w-12 h-12 ">
                                        <input
                                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                            type="text"
                                            value={numberFour}
                                            onChange={(e) => setNumberFour(e.target.value)}
                                        />
                                    </div>
                                    <div className="w-12 h-12 ">
                                        <input
                                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                            type="text"
                                            value={numberFive}
                                            onChange={(e) => setNumberFive(e.target.value)}
                                        />
                                    </div>
                                    <div className="w-12 h-12 ">
                                        <input
                                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                            type="text"
                                            value={numberSix}
                                            onChange={(e) => setNumberSix(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center justify-center mt-4'>
                                {loading ? (
                                    <CircularProgress />
                                ) : (

                                    <Button variant="contained" color="success" onClick={(e) => { handleSubmit() }}>
                                        Submit
                                    </Button>
                                )}
                                <Button variant="outlined" color="error" sx={{ ml: 4 }} onClick={() => closeModal(false)}>
                                    Cance
                                </Button>
                            </div>
                            <div className='flex items-center justify-center mt-4'>
                                <span>I didn't receive the code:</span>
                                <Link href="/" underline="always" sx={{ ml: 2 }}>
                                    {'Resend OTP'}
                                </Link>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </div>
    )
}

export default CodeOtp

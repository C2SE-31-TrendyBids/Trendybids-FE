import React, { useState } from 'react'
import background from "../../../public/images/wave_background.png"
import logo from "../../../public/images/logoTrendy.jpg"
import Link from '@mui/material/Link';
import { TextField, Button } from '@mui/material';
import CodeOtp from '../InputOtp/CodeOtp';


const ForgotPassword = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('');
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            return;
        }
        setModalOpen(true)

    };

    return (
        <div className=' max-w-screen h-screen' >
            <img src={background} alt="" className='w-full h-full object-cover' />
            <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 bg-white text-black shadow-lg rounded-lg">
                <div className='grid grid-cols-2 gap-2'>
                    <div className='m-6'>
                        <img src={logo} alt="" className='scale-105' />
                        <div className='border-t border-t-gray-500'>
                            <span className='flex items-center justify-center m-4'>
                                <Link href="/login" underline="always">
                                    {'Go back login'}
                                </Link>
                            </span>
                        </div>
                    </div>
                    <div className=''>
                        <div className='text-3xl font-bold mt-12 mb-8'> FORGOT PASSWORD </div>
                        <span className='text-base'>Please fill in your email to receive an OTP code to change your new password</span>
                        <div className='mt-5 flex items-center justify-center'>
                            <TextField
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                value={email}
                                id="outlined-basic"
                                label="Your Email"
                                variant="outlined"
                                error={Boolean(emailError)}
                                helperText={emailError}
                                className='w-[90%]'
                            />
                        </div>
                        <div className='flex items-center justify-center m-4'>
                            <Button variant="contained" sx={{ px: 5, py: 1 }} onClick={(e) => { handleLogin(e) }} >
                                SEND
                            </Button>
                            {
                                modalOpen && <CodeOtp closeModal={setModalOpen} email={email} />
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default ForgotPassword

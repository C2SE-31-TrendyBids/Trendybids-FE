import React, { useState } from 'react'
import background from "../../../public/images/wave_background.png"
import logo from "../../../public/images/logoTrendy1.jpg"
import Link from '@mui/material/Link';
import { TextField, Button, CircularProgress } from '@mui/material';
import * as authApi from '../../../services/auth'
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Box, Modal } from '@mui/material';
import OtpInput from '../../../components/Payment/Otp';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('');
    const [loading, setLoading] = useState(false);
    const [openModalOtp, setOpenModalOtp] = useState(false);
    const handleOpenModalOtp = () => setOpenModalOtp(true);
    const handleCloseModalOtp = () => setOpenModalOtp(false);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleLogin = async (e) => {
        setLoading(true)
        e.preventDefault();
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            setLoading(false)
            return;
        }
        const fogotReq = await authApi.forgotPassword(email)
        if (fogotReq?.statusCode === 200) {
            handleOpenModalOtp()
        }
        else {
            toast.error(fogotReq?.response?.message)
        }
        setLoading(false)

    };
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
    const onOtpSubmit = async (otp) => {
        try {
            const verify = await authApi.verifyFogot(email, otp)
            console.log(verify);
            if (verify.statusCode === 200) {
                toast.success('OTP Successfully')
                navigate(`/reset-password/${email}`)
                setLoading(false)
            }
            else {
                toast.error("The OTP you entered is incorrect")
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className=' max-w-screen h-screen' >
            <img src={background} alt="" className='w-full h-full object-cover' />
            <div className="min-w-[400px] absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 bg-white text-black shadow-lg rounded-lg">
                <div className='grid grid-cols-1 lg:grid-cols-2  gap-2'>
                    <div className='lg:m-6 mx-auto'>
                        <img src={logo} alt="" className='max-lg:w-36 max-lg:h-36' />
                        <div className='border-t border-t-gray-500 max-lg:hidden'>
                            <span className='flex items-center justify-center m-4'>
                                <Link href="/login" underline="always">
                                    {'Go back login'}
                                </Link>
                            </span>
                        </div>
                    </div>
                    <div className='text-center'>
                        <div className='text-3xl font-bold lg:mt-12 mb-8'> FORGOT PASSWORD </div>
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
                            {loading ? (
                                <CircularProgress />
                            ) : (

                                <Button variant="contained" sx={{ px: 5, py: 1 }} onClick={(e) => { handleLogin(e) }} >
                                    SEND
                                </Button>
                            )}
                        </div>
                        <div className='lg:hidden block '>
                            <span className='flex items-center justify-center m-4'>
                                <Link href="/login" underline="always">
                                    {'Go back login'}
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                open={openModalOtp}
                onClose={handleCloseModalOtp}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <OtpInput length={6}
                        onOtpSubmit={onOtpSubmit} />
                </Box>
            </Modal>
        </div >

    )
}

export default ForgotPassword

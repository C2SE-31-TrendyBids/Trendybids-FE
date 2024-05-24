import React, { useState } from 'react'
import background from "../../../public/images/wave_background.png"
import logo from "../../../public/images/logoTrendy1.jpg"
import Link from '@mui/material/Link';
import { Button, CircularProgress, TextField } from '@mui/material';
import { CiLock } from "react-icons/ci";
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import * as authApi from '../../../services/auth'
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('')
    const { email } = useParams();
    const [passError, setPassError] = useState('')

    const [conFirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true)
    const handleHiddenPassword = () => {
        showPassword ? setShowPassword(false) : setShowPassword(true);
    };
    const handleHiddenConfirmPassword = () => {
        showConfirmPassword ? setShowConfirmPassword(false) : setShowConfirmPassword(true);
    };


    const handleLogin = async (e) => {
        setLoading(true)
        if (password !== conFirmPassword) {
            setPassError("Passwords do not match");
            setLoading(false)
            return
        }
        const resetPasRe = await authApi.resetPassword(email, password)
        if (resetPasRe?.statusCode === 200) {
            toast.success(resetPasRe?.response?.message)
            console.log('Đặt lại mật khẩu thành công');
            navigate('/login');
            setLoading(false)

        }
        else {
            console.log('otp sai ....');
            setLoading(false)
        }
        setLoading(false)
    };

    return (
        <div className=' max-w-screen h-screen' >
            <img src={background} alt="" className='w-full h-full object-cover' />
            <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 bg-white text-black shadow-lg rounded-lg min-w-[400px]">
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
                        <div className='text-3xl font-bold lg:mt-12 mb-8'> RESET PASSWORD </div>
                        <div className='mt-3 flex items-center justify-start relative'>
                            <div>
                                <CiLock className='text-3xl mr-2' />
                            </div>
                            <TextField
                                id="standard-password-input"
                                label="Password"
                                type={showPassword ? 'password' : 'text'}
                                autoComplete="current-password"
                                variant="standard"
                                error={Boolean(passError)}
                                helperText={passError}
                                onChange={(e) => { setPassword(e.target.value) }}
                                sx={{ width: '80%' }}
                            />
                            <div>
                                {showPassword ? (
                                    <span onClick={handleHiddenPassword}
                                        className="absolute top-5 right-6 text-xl">
                                        <MdOutlineVisibilityOff />
                                    </span>
                                ) : (
                                    <span onClick={handleHiddenPassword}
                                        className="absolute top-5 right-6 text-xl">
                                        <MdOutlineVisibility />
                                    </span>

                                )}
                            </div>
                        </div>
                        <div className='mt-3 flex items-center justify-start relative'>
                            <div>
                                <CiLock className='text-3xl mr-2' />
                            </div>
                            <TextField
                                id="standard-password-input"
                                label="Confirm Password"
                                type={showConfirmPassword ? 'password' : 'text'}
                                onChange={(e) => { setConfirmPassword(e.target.value) }}
                                autoComplete="current-password"
                                error={Boolean(passError)}
                                helperText={passError}
                                variant="standard"
                                sx={{ width: '80%' }}
                            />
                            <div>
                                {showConfirmPassword ? (
                                    <span onClick={handleHiddenConfirmPassword}
                                        className="absolute top-5 right-6 text-xl">
                                        <MdOutlineVisibilityOff />
                                    </span>
                                ) : (
                                    <span onClick={handleHiddenConfirmPassword}
                                        className="absolute top-5 right-6 text-xl">
                                        <MdOutlineVisibility />
                                    </span>

                                )}
                            </div>

                        </div>

                        <div className='flex items-center justify-center mt-10'>
                            {loading ? (
                                <CircularProgress />
                            ) : (

                                <Button variant="contained" sx={{ px: 7, py: 1 }} onClick={(e) => { handleLogin(e) }} >
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
        </div >

    )
}

export default ResetPassword

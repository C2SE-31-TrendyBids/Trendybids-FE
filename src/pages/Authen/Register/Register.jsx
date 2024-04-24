import React, { useContext, useState } from 'react'
import background from "../../../public/images/wave_background.png"
import logo from "../../../public/images/logoTrendy1.jpg"
import Link from '@mui/material/Link';
import { TextField, Button, CircularProgress } from '@mui/material';
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";
import * as authApi from "../../../services/auth"
import CodeOtp from '../InputOtp/CodeOtp';
import { toast } from "sonner";
import MethodContext from '../../../context/methodProvider';

const Register = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [email, setEmail] = useState('')
    const [fullName, setFullName] = useState('')
    const [password, setPassword] = useState('')
    const [conFirmPassword, setConfirmPassword] = useState('')
    const [emailError, setEmailError] = useState('');
    const [passError, setPassError] = useState('')
    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true)
    const [loading, setLoading] = useState(false);
    const { validateEmail } = useContext(MethodContext)

    const handleHiddenPassword = () => {
        showPassword ? setShowPassword(false) : setShowPassword(true);
    };
    const handleHiddenConfirmPassword = () => {
        showConfirmPassword ? setShowConfirmPassword(false) : setShowConfirmPassword(true);
    };
    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            setLoading(false)
            return;
        }
        if (password !== conFirmPassword) {
            setPassError("Passwords do not match");
            setLoading(false)
            return
        }
        const registerReq = await authApi.register(email, password, fullName)
        console.log(registerReq?.response);
        if (registerReq?.statusCode === 201) {
            setModalOpen(true)
            setLoading(false)
            toast.success(registerReq?.response?.message)
        }
        else if (registerReq?.statusCode === 200) {
            toast.error(registerReq?.response?.message)
        }
        else toast.error(registerReq?.response?.message);
        setLoading(false)
    }
    return (
        <div className=' max-w-screen h-screen' >
            <img src={background} alt="" className='w-full h-full object-cover' />
            <div className="min-w-[400px] absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 bg-white text-black shadow-lg rounded-lg">
                <div className='flex items-center justify-center'>
                    <img src={logo} alt="" className='max-lg:w-36 max-lg:h-36 lg:hidden' />
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
                    <form onSubmit={handleRegister}>
                        <div className='text-4xl font-bold lg:mt-12 mt-4 text-center'> REGISTER </div>
                        <div className='w-full'>
                            <div className='mt-4 flex items-center justify-center'>
                                <TextField id="standard-basic"
                                    label="Full Name"
                                    variant="standard"
                                    sx={{ width: '80%' }}
                                    onChange={(e) => { setFullName(e.target.value) }} />
                            </div>
                            <div className='mt-3 flex items-center justify-center'>
                                <TextField
                                    id="standard-basic"
                                    label="Email"
                                    variant="standard"
                                    error={Boolean(emailError)}
                                    helperText={emailError}
                                    sx={{ width: '80%' }}
                                    onChange={(e) => { setEmail(e.target.value) }} />
                            </div>
                            <div className='mt-3 flex items-center justify-center relative'>
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
                            <div className='mt-3 flex items-center justify-center relative'>
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
                            {
                                modalOpen && <CodeOtp closeModal={setModalOpen} email={email} password={null} index={"register"} />
                            }
                        </div>

                        <div className='flex items-center justify-center mt-6 pb-4'>
                            {loading ? (
                                <CircularProgress />

                            ) : (
                                <button
                                    className="w-[80%] font-semibold p-3 rounded-lg bg-[#3B82F6] hover:opacity-80 text-2xl text-white"
                                    onClick={(e) => { handleRegister(e) }}
                                >
                                    REGISTER
                                </button>
                            )}
                        </div>
                    </form>
                    <div className='lg:m-6 mb-4'>
                        <img src={logo} alt="" className='max-lg:w-36 max-lg:h-36 max-lg:hidden' />
                        <div className='lg:border-t border-t-gray-500'>
                            <span className='flex items-center justify-center lg:m-4'>
                                <Link href="/login" underline="always">
                                    {'I already have an account'}
                                </Link>
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default Register

import React, { useContext, useEffect, useState } from 'react'
import background from "../../../public/images/wave_background.png"
import logo from "../../../public/images/logoTrendy1.jpg"
import Link from '@mui/material/Link';
import { Checkbox, TextField, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, CircularProgress } from '@mui/material';
import { FcGoogle } from "react-icons/fc";
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import * as authApi from '../../../services/auth'
import * as userApi from '../../../services/user'
import AuthContext from "../../../context/authProvider";
import { toast } from "sonner";

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('');
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false)

    useEffect(() => {
        const storedEmail = getCookie('email');
        const storedPassword = getCookie('password');
        if (storedEmail && storedPassword) {
            setEmail(storedEmail);
            setPassword(storedPassword);
            setRememberMe(true);
        }
    }, []);
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };
    const loginWithGoogle = async () => {
        const googleLoginURL = 'http://localhost:5000/api/auth/google';
        const width = 500;
        const height = 600;
        const left = window.innerWidth / 2 - width / 2;
        const top = window.innerHeight / 2 - height / 2;
        window.open(googleLoginURL, "_blank", `width=${width}, height=${height}, left=${left}, top=${top}`);
    }
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleNavigate = (role) => {

        if (role === "Admin")
            navigate('/admin');
        // navigate('/admin/dashboard')
        else
            navigate('/');

    }
    const handleLogin = async (e) => {
        setLoading(true)
        console.log(rememberMe);
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            return;
        }
        // fetch api login
        const loginResponse = await authApi.loginApi(email, password)

        if (loginResponse?.statusCode === 200) {
            const accessToken = loginResponse?.response?.accessToken;
            const refreshToken = loginResponse?.response?.refreshToken;
            if (rememberMe) {
                document.cookie = `email=${email}; max-age=604800`;
                document.cookie = `password=${password}; max-age=604800`;
            }
            const getUser = await userApi.getCurrentUser(accessToken);
            if (getUser?.statusCode === 200) {
                const auth = getUser?.response
                const role = getUser?.response?.role?.name
                setAuth(auth)
                localStorage.setItem('auth', JSON.stringify({ ...auth }));
                localStorage.setItem("access-token", accessToken)
                localStorage.setItem("refresh-token", refreshToken)
                handleNavigate(role)
                toast.success(loginResponse?.response?.message);
                setLoading(false)
            }
        } else {
            console.log(loginResponse);
            if (loginResponse?.error?.response?.status === 404)
                toast.error(loginResponse?.error?.response?.data?.message);
            else
                toast.error(loginResponse?.error?.response?.data?.message);
            setLoading(false)
        }
    }

    return (
        <div className=' max-w-screen h-screen' >
            <img src={background} alt="" className='w-full h-full object-cover' />
            <div className="min-w-[400px] absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 bg-white text-black shadow-lg rounded-lg">
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
                    <div className='lg:m-6 mx-auto'>
                        <img src={logo} alt="" className='max-lg:w-36 max-lg:h-36' />
                        <div className='hidden lg:block border-t border-t-gray-500 mt-1'>
                            <span className='flex items-center justify-center m-4'>
                                <Link href="/register" underline="always">
                                    {'Create an account'}
                                </Link>
                            </span>
                        </div>
                    </div>
                    <div className=''>
                        <div className='text-4xl font-bold mt-4 lg:mt-12 text-center'> LOGIN </div>
                        <div className='flex items-center justify-center '>
                            <div className='flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-500 text-white m-4
                                   cursor-pointer hover:bg-blue-400 hover:shadow-md duration-100 ease-in-out transition-all'
                                onClick={loginWithGoogle}
                            >
                                <FcGoogle className='text-4xl bg-white p-1 rounded-md' />
                                Sign in with Google
                            </div>
                        </div>
                        <div>
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
                            <FormControl sx={{ m: 2.5, width: '90%' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                        </div>
                        <div className='mt-4 flex items-center justify-between'>
                            <div>
                                <Checkbox checked={rememberMe} onClick={(e) => setRememberMe(e.target.checked)} />
                                <span>Remember me</span>
                            </div>
                            <div className='mr-10'>
                                <Link href="/forgot-password" underline="hover">
                                    {'Forgot password'}
                                </Link>
                            </div>
                        </div>
                        <div className='flex items-center justify-center m-4'>
                            {loading ? (
                                <CircularProgress />
                            ) : (
                                <Button variant="contained" size="large" onClick={(e) => { handleLogin(e) }} >
                                    LOGIN
                                </Button>
                            )}

                        </div>
                        <div className='lg:hidden block '>
                            <span className='flex items-center justify-center m-4'>
                                <Link href="/register" underline="always">
                                    {'Create an account'}
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Login

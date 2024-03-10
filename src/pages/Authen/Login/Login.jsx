import React, { useContext, useEffect, useState } from 'react'
import background from "../../../public/images/wave_background.png"
import logo from "../../../public/images/logoTrendy.jpg"
import Link from '@mui/material/Link';
import { Checkbox, TextField, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, CircularProgress } from '@mui/material';
import { FcGoogle } from "react-icons/fc";
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import * as authApi from '../../../services/auth'
import * as userApi from '../../../services/user'
import AuthContext from "../../../context/authProvider";

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
        const emailCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('email='));
        const passwordCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('password='));

        if (emailCookie && passwordCookie) {
            const emailFromCookie = emailCookie.split('=')[1];
            const passwordFromCookie = passwordCookie.split('=')[1];
            setEmail(emailFromCookie);
            setPassword(passwordFromCookie);
        }
    }, []);


    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };
    const loginWithGoogle = async () => {
        console.log();
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
                localStorage.setItem("access-token", JSON.stringify({ accessToken }))
                localStorage.setItem("refresh-token", JSON.stringify({ refreshToken }))

                handleNavigate(role)
                console.log('đăng nhập thành công ');
                setLoading(false)
            }
        } else {
            console.log(loginResponse);
            if (loginResponse?.error?.response?.status === 404)
                console.log(loginResponse?.error?.response?.data?.message);
            else
                console.log(loginResponse?.error?.response?.data?.message);
            setLoading(false)
        }
    }

    return (
        <div className=' max-w-screen h-screen' >
            <img src={background} alt="" className='w-full h-full object-cover' />
            <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 bg-white text-black shadow-lg rounded-lg">
                <div className='grid grid-cols-2 gap-2'>
                    <div className='m-6'>
                        <img src={logo} alt="" className='scale-105' />
                        <div className='border-t border-t-gray-500'>
                            <span className='flex items-center justify-center m-4'>
                                <Link href="/register" underline="always">
                                    {'Create an account'}
                                </Link>
                            </span>
                        </div>
                    </div>
                    <div className=''>
                        <div className='text-4xl font-bold mt-12 text-center'> LOGIN </div>
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
                            <div className='mt-5'>
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
                            <FormControl sx={{ mt: 2, width: '90%' }} variant="outlined">
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
                                <Checkbox onClick={(e) => setRememberMe(e.target.checked)} />
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
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Login

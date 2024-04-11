import React, { useContext, useEffect, useState } from "react";
import background from "../../../public/images/wave_background.png";
import logo from "../../../public/images/logoTrendy1.jpg";
import {
    Checkbox,
    TextField,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    CircularProgress,
    Button,
} from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import * as authApi from "../../../services/auth";
import * as userApi from "../../../services/user";
import AuthContext from "../../../context/authProvider";
import MethodContext from "../../../context/methodProvider";
import { toast } from "sonner";

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const { validateEmail } = useContext(MethodContext)
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        const storedEmail = getCookie("email");
        const storedPassword = getCookie("password");
        if (storedEmail && storedPassword) {
            setEmail(storedEmail);
            setPassword(storedPassword);
            setRememberMe(true);
        }
    }, []);
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
    };
    const loginWithGoogle = async () => {
        const googleLoginURL = "http://localhost:5000/api/auth/google";
        const width = 500;
        const height = 600;
        const left = window.innerWidth / 2 - width / 2;
        const top = window.innerHeight / 2 - height / 2;
        window.open(
            googleLoginURL,
            "_blank",
            `width=${width}, height=${height}, left=${left}, top=${top}`
        );
    };
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleNavigate = (role) => {
        if (role === "Admin") navigate("/admin");
        if (role === "Censor") navigate("/all-product")
        else navigate("/");
    };
    const handleLogin = async (e) => {
        setLoading(true);
        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address");
            setLoading(false)
            return;
        }
        // fetch api login
        const loginResponse = await authApi.loginApi(email, password);
        if (loginResponse?.statusCode === 200) {
            const accessToken = loginResponse?.response?.accessToken;
            const refreshToken = loginResponse?.response?.refreshToken;
            if (rememberMe) {
                document.cookie = `email=${email}; max-age=604800`;
                document.cookie = `password=${password}; max-age=604800`;
            }
            const getUser = await userApi.getCurrentUser(accessToken);
            if (getUser?.statusCode === 200) {
                const auth = getUser?.response;
                const role = getUser?.response?.role?.name;
                setAuth(auth);
                localStorage.setItem("auth", JSON.stringify({ ...auth }));
                localStorage.setItem("access-token", accessToken);
                localStorage.setItem("refresh-token", refreshToken);
                handleNavigate(role);
                toast.success(loginResponse?.response?.message);
                setLoading(false);
                console.log(accessToken);
            }
        } else {
            console.log(loginResponse);
            if (loginResponse?.error?.response?.status === 404)
                toast.error(loginResponse?.error?.response?.data?.message);
            else toast.error(loginResponse?.error?.response?.data?.message);
            setLoading(false);
        }
    };

    return (
        <div className=" max-w-screen h-screen">
            <img
                src={background}
                alt=""
                className="w-full h-full object-cover"
            />
            <div className="min-w-[400px] absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 bg-white text-black shadow-lg rounded-lg">
                <div className=" grid grid-cols-1 lg:grid-cols-2 gap-2">
                    <div className="lg:m-6 mx-auto ">
                        <Link to="/">
                            <div className="">
                                <img
                                    src={logo}
                                    alt=""
                                    className="max-lg:w-36 max-lg:h-36 lg:mt-20"
                                />
                            </div>
                        </Link>
                        <div className="hidden lg:block">
                            <span className="flex items-center justify-center font-medium">
                                <span className="text-black mr-1 tracking-wide">
                                    Do not have an account?
                                </span>
                                <Link
                                    to="/register"
                                    className="text-blue-500 hover:opacity-70"
                                >
                                    Sign Up
                                </Link>
                            </span>
                        </div>
                    </div>
                    <div className="">
                        <div className="text-[38px] font-extrabold lg:my-4 lg:mt-12 text-center text-blue-500 tracking-wide">
                            Login
                        </div>
                        <div className="flex items-center justify-center">
                            <div
                                className="flex items-center justify-center gap-2 px-[90px] lg:px-20 py-1 rounded-full bg-white text-black my-4 cursor-pointer hover:bg-gray-100 hover:shadow-lg duration-100 ease-in-out transition-all  border-gray-300 border-solid border-2 "
                                onClick={loginWithGoogle}
                            >
                                <FcGoogle className="text-4xl bg-white p-1 rounded-md tracking-tighter" />
                                <span className="">Sign in with Google</span>
                            </div>
                        </div>
                        <div className="mb-3 flex items-center justify-around">
                            <div className="w-[120px] h-0.5 bg-gray-300 bg-opacity-60 rounded-[100px] mr-2" />
                            <span className="font-semibold">Or</span>
                            <div className="w-[120px] h-0.5 bg-gray-300 bg-opacity-60 rounded-[100px] ml-2" />
                        </div>
                        <form onSubmit={handleLogin}>
                            <div>
                                <div className="mt-5 flex items-center justify-center">
                                    <TextField
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email"
                                        value={email}
                                        id="outlined-basic"
                                        label="Your Email"
                                        variant="outlined"
                                        error={Boolean(emailError)}
                                        helperText={emailError}
                                        className="w-[90%]"
                                    />
                                </div>
                                <FormControl
                                    sx={{ m: 2.5, width: "90%" }}
                                    variant="outlined"
                                >
                                    <InputLabel htmlFor="outlined-adornment-password">
                                        Password
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        type={showPassword ? "text" : "password"}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    style={{
                                                        backgroundColor: "transparent",
                                                    }} >
                                                    {showPassword ? (
                                                        <MdOutlineVisibility />
                                                    ) : (
                                                        <MdOutlineVisibilityOff />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                        style={{ background: "transparent" }}
                                    />
                                </FormControl>
                                <div className="mx-2 flex items-center justify-between">
                                    <div>
                                        <Checkbox
                                            checked={rememberMe}
                                            onClick={(e) =>
                                                setRememberMe(e.target.checked)
                                            }
                                        />
                                        <span className="text-[16px] font-normal">
                                            Remember password
                                        </span>
                                    </div>
                                    <div className="mr-2 font-medium text-blue-500 hover:opacity-80">
                                        <Link
                                            href="/forgot-password"
                                            underline="hover"
                                        >
                                            {"Forgot password"}
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-center my-4 lg:my-8 px-4 ">
                                {loading ? (
                                    <CircularProgress />
                                ) : (
                                    <Button
                                        style={{
                                            fontWeight: "bold",
                                            width: "100%",
                                            fontSize: "1.25rem",
                                            padding: "0.5rem 1.rem",
                                            borderRadius: "1rem",
                                            backgroundColor: "#3B82F6",
                                            transition: "opacity 0.3s ease",
                                            "&:hover": {
                                                opacity: 0.8,
                                            },
                                        }}
                                        variant="contained"
                                        size="large"
                                        onClick={(e) => { handleLogin(e) }}
                                    >
                                        Login
                                    </Button>
                                )}
                            </div>
                        </form>
                        <div className="lg:hidden block ">
                            <span className="flex items-center justify-center m-4 text-blue-500 font-bold">
                                <Link href="/register" underline="always">
                                    {"Create an account"}
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

import React, {useContext, useEffect} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import * as userApi from "../../services/user";
import AuthContext from "../../context/authProvider";

const LoginGoogleSuccess = () => {
    const { setAuth } = useContext(AuthContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const accessToken = searchParams.get("accessToken")
    const refreshToken = searchParams.get("refreshToken")

    useEffect(() => {
        (async () => {
            const getUser = await userApi.getCurrentUser(accessToken);
            if (getUser?.statusCode === 200) {
                const userData = getUser?.response
                const role = getUser?.response?.role?.name
                setAuth(userData)
                localStorage.setItem('auth', JSON.stringify({ ...userData }));
                localStorage.setItem("access-token", JSON.stringify({ accessToken }))
                localStorage.setItem("refresh-token", JSON.stringify({ refreshToken }))
                window.opener && window.close()
                if (role === "Admin")
                    window.opener.location.href = '/admin';
                else
                    window.opener.location.href = '/';
            }
        })()
    }, []);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className='flex items-center justify-center'>
                <CircularProgress />
                <span className="ml-4 text-4xl text-gray-700">Loading...</span>
            </div>
        </div>
    );
};

export default LoginGoogleSuccess;
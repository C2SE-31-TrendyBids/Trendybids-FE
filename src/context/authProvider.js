import {createContext, useEffect, useState} from "react";
import * as userApi from "../services/user";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const myDataString = localStorage.getItem("auth");
        if (myDataString !== null) {
            const myDataObject = JSON.parse(myDataString);
            setAuth(myDataObject);
            setIsLogin(true);
        } else {
            setAuth({});
            setIsLogin(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{auth, setAuth, isLogin, setIsLogin}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

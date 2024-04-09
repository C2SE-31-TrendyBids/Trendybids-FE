import { createContext, useEffect, useState } from "react";
import * as userApi from "../services/user";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const myDataString = localStorage.getItem("auth");
    if (myDataString !== null) {
      const myDataObject = JSON.parse(myDataString);
      setAuth(myDataObject);
    } else {
      setAuth({});
    }
  }, []);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const accessToken = localStorage.getItem("access-token");
      if (!accessToken) return;
      try {
        const responseUser = await userApi.getCurrentUser(accessToken);

        if (responseUser?.statusCode === 200) {
          const userInfo = responseUser?.response;
          setUser(userInfo);
          const newAuth = { ...auth, userInfo };
          localStorage.setItem("auth", JSON.stringify(newAuth));
          setIsLogin(true);
        }
      } catch (error) {
        console.error("Error parsing access token:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, user, isLogin, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

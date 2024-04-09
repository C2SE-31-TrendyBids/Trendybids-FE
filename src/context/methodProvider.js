import { createContext } from 'react';
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import * as userServices from "../services/user";

const MethodContext = createContext({});

export const MethodProvider = ({ children }) => {
    const navigate = useNavigate();

    const fetchUser = async (accessToken) => {
        const getUser = await userServices.getCurrentUser(accessToken);
        if (getUser?.statusCode === 200) {
            return getUser?.response;
        }
        return null;
    }

    const fetchUserDetails = async (roleName = "User") => {
        const accessToken = localStorage.getItem('access-token');
        if (!accessToken) {
            toast.error('Please login to continue!');
            navigate('/login');
        } else {
            const auth = JSON.parse(localStorage.getItem('auth'))
            if (auth) {
                const role = auth?.role?.name;
                if (role !== roleName) {
                    toast.error('Deny access, your role cannot be accessed!');
                    navigate('/')
                }
            } else {
                const userInfo = await fetchUser(accessToken);
                if (userInfo) {
                    localStorage.setItem('auth', JSON.stringify({ ...auth }))
                } else {
                    toast.error('Access failed!');
                    navigate('/login');
                }
            }
        }
    }

    function convertToLowerCase(text) {
        // Convert the string to lowercase
        let lowerCaseText = text.toLowerCase();

        // Split the words in the string
        let words = lowerCaseText.split(' ');

        // Iterate through each word to check and add a hyphen (-) between two-character words
        for (let i = 1; i < words.length; i++) {
            if (words[i - 1].length === 2 && words[i].length === 2) {
                words[i - 1] += '-';
            }
        }
        // Combine the words back to form a new string
        let result = words.join(' ');

        return result.replace(/ /g, '-'); // Replace spaces with hyphens
    }
    const validateEmail = (email) => {
        // Biểu thức chính quy để kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return <MethodContext.Provider value={{ fetchUserDetails, convertToLowerCase, validateEmail }}>{children}</MethodContext.Provider>;
};

export default MethodContext;
import {createContext} from 'react';
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";
import * as userServices from "../services/user";

const MethodContext = createContext({});

export const MethodProvider = ({children}) => {
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
                    localStorage.setItem('auth', JSON.stringify({...auth}))
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

    const calculateTimeLeft = (targetDate) => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / (1000 * 60)) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        } else {
            // If the time has passed, set the hour value to 0
            timeLeft = {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            };
        }

        return timeLeft;
    };


    return <MethodContext.Provider value={{fetchUserDetails , convertToLowerCase , calculateTimeLeft}}>{children}</MethodContext.Provider>;
};

export default MethodContext;
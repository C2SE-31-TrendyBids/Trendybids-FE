import {createContext} from 'react';
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";
import * as userServices from "../services/user";
import * as authServices from "../services/auth";

const MethodContext = createContext({});

export const MethodProvider = ({children}) => {
    const accessToken = localStorage.getItem('access-token');
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

    const validateEmail = (email) => {
        // Biểu thức chính quy để kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
        return phoneRegex.test(phone);
    };


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

    const anonymizeFullName = (fullName) => {
        const maxLength = 12; // Maximum length allowed
        const anonymizedLength = 4; // Number of characters to be displayed for longer names

        if (fullName.length > maxLength) {
            // If the length of the name exceeds maxLength, anonymize it
            const visiblePart = fullName.substring(0, 8); // Get the first 8 characters of the name
            const asterisks = '*'.repeat(anonymizedLength); // Create a string of asterisks
            return visiblePart + asterisks; // Combine the visible part and asterisks
        } else {
            // If the length of the name doesn't exceed maxLength, keep the name as it is
            const visiblePart = fullName.substring(0, fullName.length - 4); // Get the name excluding the last 4 characters
            const asterisks = '*'.repeat(4); // Create a string of asterisks
            return visiblePart + asterisks; // Combine the visible part and asterisks
        }
    }

    const handleLogout = async () => {
        await authServices.logOut(accessToken);
        localStorage.removeItem("auth");
        localStorage.removeItem("refresh-token");
        localStorage.removeItem("access-token");
        toast.success('Log Out Successfully')
        navigate("/login");
    };


    return <MethodContext.Provider value={{
        fetchUserDetails,
        convertToLowerCase,
        validateEmail,
        calculateTimeLeft,
        anonymizeFullName,
        handleLogout,
        validatePhone
    }}>{children}</MethodContext.Provider>;

};

export default MethodContext;
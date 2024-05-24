import { useEffect, useRef, useState } from "react";
import logo from "../../public/images/logoTrendy.jpg"
import { Button, CircularProgress, Link } from "@mui/material";

const OtpInput = ({ length = 6, onOtpSubmit = () => { } }) => {
    const [otp, setOtp] = useState(new Array(length).fill(""));
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef([]);

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (index, e) => {
        const value = e.target.value;
        if (isNaN(value)) return;

        const newOtp = [...otp];
        // allow only one input
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // submit trigger
        // const combinedOtp = newOtp.join("");
        // if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

        // Move to next input if current field is filled
        if (value && index < length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleClick = (index) => {
        inputRefs.current[index].setSelectionRange(1, 1);

        // optional
        if (index > 0 && !otp[index - 1]) {
            inputRefs.current[otp.indexOf("")].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (
            e.key === "Backspace" &&
            !otp[index] &&
            index > 0 &&
            inputRefs.current[index - 1]
        ) {
            // Move focus to the previous input field on backspace
            inputRefs.current[index - 1].focus();
        }
    };
    const handleSubmit = () => {
        onOtpSubmit(otp.join(""))
    }

    return (
        <div>
            <div className="flex items-center justify-center">
                <div className="h-40 w-40 overflow-hidden">
                    <img src={logo} alt="" className="h-full w-full object-cover scale-150" />
                </div>
            </div>
            <div className="flex justify-center items-center">
                {otp.map((value, index) => (
                    <input
                        key={index}
                        type="text"
                        ref={(input) => (inputRefs.current[index] = input)}
                        value={value}
                        onChange={(e) => handleChange(index, e)}
                        onClick={() => handleClick(index)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-12 h-12 border border-gray-300 rounded-md text-center text-lg mx-2"
                    />
                ))}
            </div>
            <div className='flex items-center justify-center mt-4'>
                {loading ? (
                    <CircularProgress />
                ) : (

                    <Button variant="contained" color="success"
                        onClick={(e) => { handleSubmit() }}
                    >
                        Submit
                    </Button>
                )}
                <Button variant="outlined" color="error" sx={{ ml: 4 }}
                >
                    Cance
                </Button>
            </div>
            <div className='flex items-center justify-center mt-4'>
                <span>I didn't receive the code:</span>
                <Link href="/" underline="always" sx={{ ml: 2 }}>
                    {'Resend OTP'}
                </Link>
            </div>
        </div>
    );
};

export default OtpInput;

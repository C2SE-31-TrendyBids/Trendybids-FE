import React, {useState, useEffect, useContext} from 'react';
import MethodContext from "../../context/methodProvider";

function CountdownTimer({ targetDate, width = 500 }) {
    const {calculateTimeLeft} = useContext(MethodContext);
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft(targetDate));
        }, 1000);

        return () => clearTimeout(timer);
    });


    return (
        <div
            className={`flex items-center justify-around absolute left-2 right-2 bottom-3 bg-[#F4F5FC]/80 rounded ${width < 300 ? "pt-1" : "pt-2"} pb-1 px-3 opacity-100 group-hover:left-2 group-hover:right-2 group-hover:-bottom-10 group-hover:opacity-0 transition-all duration-300`}>
            <div className="flex flex-col items-center justify-center">
                <p className={`${width < 300 ? "text-2xl" : "text-3xl"} font-bold leading-6`}>{timeLeft.days}</p>
                <p className="text-xs font-thin">Days</p>
            </div>
            <div className="flex flex-col items-center justify-center">
                <p className={`${width < 300 ? "text-2xl" : "text-3xl"} font-bold leading-6`}>{timeLeft.hours}</p>
                <p className="text-xs font-thin">Hours</p>
            </div>
            <div className="flex flex-col items-center justify-center">
                <p className={`${width < 300 ? "text-2xl" : "text-3xl"} font-bold leading-6`}>{timeLeft.minutes}</p>
                <p className="text-xs font-thin">Minutes</p>
            </div>
            <div className="flex flex-col items-center justify-center">
                <p className={`${width < 300 ? "text-2xl" : "text-3xl"} font-bold leading-6`}>{timeLeft.seconds}</p>
                <p className="text-xs font-thin">Seconds</p>
            </div>
        </div>
    );
}

export default CountdownTimer;

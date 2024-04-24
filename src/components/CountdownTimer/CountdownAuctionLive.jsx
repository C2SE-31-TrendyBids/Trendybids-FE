import React, {useState, useEffect, useContext} from 'react';
import MethodContext from "../../context/methodProvider";

function CountdownAuctionLive({targetDate}) {
    const {calculateTimeLeft} = useContext(MethodContext);
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft(targetDate));
        }, 1000);

        return () => clearTimeout(timer);
    });


    return (
        <div className="flex items-center justify-around gap-8">
            <div className="flex flex-col items-center justify-center">
                <p className={`text-xl font-bold leading-6`}>{timeLeft.days}</p>
                <p className="text-xs font-thin">Days</p>
            </div>
            <div className="flex flex-col items-center justify-center">
                <p className={`text-xl font-bold leading-6`}>{timeLeft.hours}</p>
                <p className="text-xs font-thin">Hours</p>
            </div>
            <div className="flex flex-col items-center justify-center">
                <p className={`text-xl font-bold leading-6`}>{timeLeft.minutes}</p>
                <p className="text-xs font-thin">Minutes</p>
            </div>
            <div className="flex flex-col items-center justify-center">
                <p className={`text-xl font-bold leading-6`}>{timeLeft.seconds}</p>
                <p className="text-xs font-thin">Seconds</p>
            </div>
        </div>
    );
}

export default CountdownAuctionLive;

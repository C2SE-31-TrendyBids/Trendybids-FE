import React, { useState, useEffect } from 'react';

function CountdownTimer({ targetDate }) {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / (1000 * 60)) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    return (
        <div className="flex items-center justify-around absolute left-2 right-2 bottom-3 bg-[#F4F5FC]/80 rounded pt-2 pb-1 px-3 opacity-100 group-hover:left-2 group-hover:right-2 group-hover:-bottom-10 group-hover:opacity-0 transition-all duration-300">
            <div className="flex flex-col items-center justify-center">
                <p className="text-3xl font-bold leading-6">{timeLeft.days}</p>
                <p className="text-xs font-thin">Days</p>
            </div>
            <div className="flex flex-col items-center justify-center">
                <p className="text-3xl font-bold leading-6">{timeLeft.hours}</p>
                <p className="text-xs font-thin">Hours</p>
            </div>
            <div className="flex flex-col items-center justify-center">
                <p className="text-3xl font-bold leading-6">{timeLeft.minutes}</p>
                <p className="text-xs font-thin">Minutes</p>
            </div>
            <div className="flex flex-col items-center justify-center">
                <p className="text-3xl font-bold leading-6">{timeLeft.seconds}</p>
                <p className="text-xs font-thin">Seconds</p>
            </div>
        </div>
    );
}

export default CountdownTimer;

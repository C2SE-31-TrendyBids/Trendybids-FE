import CountdownTimer from "../CountdownTimer/CountdownTimer";
import {FaPlus} from "react-icons/fa";
import React, {useEffect, useRef, useState} from 'react';

const ProductItem = ({infoAuction = {}}) => {
    const divRef = useRef(null);
    const [width, setWidth] = useState()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        if (divRef.current) {
            setWidth(divRef.current.offsetWidth);
        }
    }, [windowWidth]);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <div ref={divRef} className="w-full h-full grid grid-rows-6">
            <div className="relative row-span-6 rounded-t-lg group transition-all overflow-y-hidden overflow-x-hidden">
                <img
                    className="w-full h-full rounded-t-lg object-cover group-hover:scale-125 transition-all duration-500"
                    src={infoAuction?.product?.prdImages[0]?.prdImageURL}
                    alt={infoAuction?.product?.productName}/>
                <div
                    className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                {/*Countdown*/}
                <CountdownTimer targetDate="2024-03-19T00:00:00" width={width}/>
                <div
                    className="absolute left-1/2 -translate-x-1/2 opacity-0 -bottom-10 bg-[#1972F5] rounded group-hover:opacity-100 group-hover:bottom-3 transition-all duration-300">
                    <button
                        className={`${width < 300 ? "gap-1 px-2 text-[12px]" : "gap-3 px-6 text-[10px] sm:text-[16px]"} py-2 flex items-center font-bold text-white`}>
                        <FaPlus size={width < 300 ? 12 : 18}/>
                        Join Auction
                    </button>
                </div>
            </div>
            <div className="row-span-2 h-full bg-gray-200 ">
                <div className="text-left text-[#0B1133] px-2 pt-3">
                    <p className="font-semibold text-xs">{infoAuction?.product?.category?.name}</p>
                    <h5 className="text-lg font-bold">{infoAuction?.product?.productName}</h5>
                </div>
                <div className="text-right text-[#0B1133] px-2 pb-3">
                    <p className="font-semibold text-xs">Start Bid:</p>
                    <h5 className="text-lg font-bold">${infoAuction?.product?.startingPrice}</h5>
                </div>
            </div>
        </div>
    )
}
export default ProductItem
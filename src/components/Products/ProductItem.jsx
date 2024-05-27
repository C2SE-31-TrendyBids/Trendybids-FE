import CountdownTimer from "../CountdownTimer/CountdownTimer";
import {FaPlus} from "react-icons/fa";
import React, {useEffect, useRef, useState} from 'react';
import * as userServices from '../../services/user'
import * as censorServices from '../../services/censor'
import {toast} from "sonner";
import {Link, useNavigate} from "react-router-dom";
import logo from "../../assets/images/logo.jpg";
import moment from "moment/moment";

const ProductItem = ({infoAuction = {}, type = "item"}) => {
    console.log(">>>"+infoAuction?.product?.startingPrice);
    const divRef = useRef(null);
    const [width, setWidth] = useState()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const navigator = useNavigate()
    const [auction, setAuction] = useState(infoAuction || {});

    useEffect(() => {
        if (divRef.current) {
            setWidth(divRef.current.offsetWidth);
        }
    }, [windowWidth]);

    useEffect(() => {
        setAuction(auction);
    },[infoAuction]);

    useEffect(() => {
        // Check if the API has been called before
        if (!sessionStorage.getItem(`hasCalledAPI_${infoAuction?.id}`)) {
            const currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
            const startDate = moment(infoAuction?.startTime).format('YYYY-MM-DD HH:mm:ss');
            const endDate = moment(infoAuction?.endTime).format('YYYY-MM-DD HH:mm:ss');
            let timeoutId;
            const delay = 1000 * Math.floor(Math.random() * 4);

            if (currentDate >= startDate && currentDate < endDate) {
                timeoutId = setTimeout(async () => {
                    console.log('Time is up!');
                    await censorServices.updateStatus(infoAuction?.id);
                    setAuction(prevState => ({...prevState, status: "ongoing"}));
                    sessionStorage.setItem(`hasCalledAPI_${infoAuction?.id}`, 'true'); // Set the flag after calling the API
                }, delay);
            } else if (currentDate >= endDate) {
                timeoutId = setTimeout(async () => {
                    console.log('Time is Down!');
                    await censorServices.updateStatus(infoAuction?.id);
                    setAuction(prevState => ({...prevState, status: "ended"}));
                    sessionStorage.setItem(`hasCalledAPI_${infoAuction?.id}`, 'true'); // Set the flag after calling the API
                }, delay);
            }

            return () => clearTimeout(timeoutId); // Clean up when the component is unmounted
        }
    }, [infoAuction]);


    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const handleJoinAuction = async (sessionId) => {
        const accessToken = localStorage.getItem("access-token");
        if (accessToken) {
            const responseJoin = await userServices.joinSession(accessToken, sessionId)
            if (responseJoin?.status === 200) {
                toast.success("Join to auction session successfully!");
            } else {
                const errorMessage = responseJoin?.error?.response?.data?.message
                if (errorMessage === "The user has participated in this auction") {
                    toast.error("You already to join this session!");
                } else
                    toast.error("Join to auction session fail!");
            }
        } else {
            toast.error("Required login to join auction session!");
            navigator("/login");
        }
    }


    return (
        <Link
            className={type === "itemSlider" && "mx-3 block"}
            to={`${auction?.status === "ongoing" ? "/auction-live/" : "/product-auction/"}${infoAuction?.id}`}
            relative={"route"}>
            <div ref={divRef} className="w-full max-h-[350px] grid grid-rows-6 shadow rounded-t-lg">
                <div
                    className="relative row-span-6 rounded-t-lg group transition-all overflow-y-hidden overflow-x-hidden">
                    <img
                        className="w-full min-h-[200px] rounded-t-lg object-contain group-hover:scale-125 transition-all duration-500"
                        src={infoAuction?.product?.prdImages[0]?.prdImageURL || ""}
                        alt={infoAuction?.product?.productName}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = logo;
                        }}
                    />

                    <div
                        className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    {/*Countdown*/}
                    {auction?.status === "not_started" && <CountdownTimer targetDate={infoAuction?.startTime}/>}
                    {/*auction session starting*/}
                    {auction?.status === "ongoing" &&
                        <p className="absolute left-2 top-2 bg-green-400 text-xm rounded px-4 py-1  text-white font-normal">ongoing</p>}
                    {/*auction session ended*/}
                    {auction?.status === "ended" &&
                        <p className="absolute left-2 top-2 bg-red-500 text-xm rounded px-4 py-1 text-white font-normal">ended</p>}
                    {/*auction session not started*/}
                    {auction?.status === "not_started" &&
                        <div
                            className="absolute left-1/2 -translate-x-1/2 opacity-0 -bottom-10 bg-[#1972F5] rounded group-hover:opacity-100 group-hover:bottom-3 transition-all duration-300">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleJoinAuction(infoAuction?.id);
                                }}
                                className={`${width < 300 ? "gap-1 px-2 text-[12px]" : "gap-3 px-6 text-[10px] sm:text-[16px]"} py-2 flex items-center font-bold text-white`}>
                                <FaPlus size={width < 300 ? 12 : 18}/>
                                Join Auction
                            </button>
                        </div>}
                </div>
                <div className="row-span-2 h-full bg-gray-200 ">
                    <div className="text-left text-[#0B1133] px-2 pt-3">
                        <p className="font-semibold text-xs">{infoAuction?.product?.category?.name}</p>
                        <h5 className="text-lg font-bold truncate">{infoAuction?.product?.productName}</h5>
                    </div>
                    <div className="text-right text-[#0B1133] px-2 pb-3">
                        <p className="font-semibold text-xs">Start Bid:</p>
                        <h5 className="text-lg font-bold">${infoAuction?.product?.startingPrice}</h5>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProductItem
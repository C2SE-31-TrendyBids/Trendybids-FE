import CountdownTimer from "../CountdownTimer/CountdownTimer";
import {FaPlus} from "react-icons/fa";
import ProductItem from "../Products/ProductItem";
import React, {useEffect, useState} from "react";
import * as censorServices from "../../services/censor";
import * as userServices from "../../services/user";
import {toast} from "sonner";
import {Link, useNavigate} from "react-router-dom";
import logo from "../../assets/images/logo.jpg";
import moment from "moment";

const TrendingAuction = () => {

    const [auctionSessions, setAuctionSession] = useState([])
    const [firstSessions, setFirstSessions] = useState({})
    const navigator = useNavigate()

    useEffect(() => {
        const fetchAPI = async () => {
            const responseCensor = await censorServices.getAuctionSession({limit: 5})
            responseCensor?.status === 200 && setAuctionSession(responseCensor?.data?.productAuctions)
            responseCensor?.status === 200 && setFirstSessions(responseCensor?.data?.productAuctions[0])
        }
        fetchAPI()
    }, [])

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

    useEffect(() => {
        // Check if the API has been called before
        if (!sessionStorage.getItem(`hasCalledAPI_${firstSessions?.id}`)) {
            const currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
            const startDate = moment(firstSessions?.startTime).format('YYYY-MM-DD HH:mm:ss');
            const endDate = moment(firstSessions?.endTime).format('YYYY-MM-DD HH:mm:ss');
            let timeoutId;
            const delay = 1000 * Math.floor(Math.random() * 4);

            if (currentDate >= startDate && currentDate < endDate) {
                timeoutId = setTimeout(async () => {
                    console.log('Time is up!');
                    await censorServices.updateStatus(firstSessions?.id);
                    setFirstSessions(prevState => ({...prevState, status: "ongoing"}));
                    sessionStorage.setItem(`hasCalledAPI_${firstSessions?.id}`, 'true'); // Set the flag after calling the API
                }, delay);
            } else if (currentDate >= endDate) {
                timeoutId = setTimeout(async () => {
                    console.log('Time is Down!');
                    await censorServices.updateStatus(firstSessions?.id);
                    setFirstSessions(prevState => ({...prevState, status: "ended"}));
                    sessionStorage.setItem(`hasCalledAPI_${firstSessions?.id}`, 'true'); // Set the flag after calling the API
                }, delay);
            }

            return () => clearTimeout(timeoutId); // Clean up when the component is unmounted
        }
    }, [firstSessions]);


    return (
        <Link
            to={`${firstSessions?.status === "ongoing" ? "/auction-live/" : "/product-auction/"}${firstSessions?.id}`}
            relative={"route"}>
            <div className="px-10 mx-auto mt-20 mb-4">
                <h2 className="text-[#0B1133] text-2xl font-bold">Trending Auctions</h2>
                <p className="text-[#5F5F5F] text-xm font-thin">See what's popular across thousands of
                    items.</p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-7">
                    <div className="w-full h-full grid grid-rows-6">
                        <div
                            className="relative row-span-6 rounded-t-lg group transition-all overflow-y-hidden overflow-x-hidden min-h-[400px]">
                            <img
                                className="w-full h-full rounded-t-lg object-contain group-hover:scale-125 transition-all duration-500"
                                src={firstSessions?.prdImages?.[0]?.prdImageURL || ""}
                                alt={firstSessions?.title || ""}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = logo;
                                }}
                            />
                            <div
                                className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                            {/* Countdown */}
                            {/*Countdown*/}
                            {firstSessions?.status === "not_started" && <CountdownTimer targetDate={firstSessions?.startTime}/>}
                            {/*auction session starting*/}
                            {firstSessions?.status === "ongoing" &&
                                <p className="absolute left-2 top-2 bg-green-400 text-xm rounded px-4 py-1  text-white font-normal">ongoing</p>}
                            {/*auction session ended*/}
                            {firstSessions?.status === "ended" &&
                                <p className="absolute left-2 top-2 bg-red-500 text-xm rounded px-4 py-1 text-white font-normal">ended</p>}
                            {/*auction session not started*/}
                            {firstSessions?.status === "not_started" &&
                                <div
                                    className="absolute left-1/2 -translate-x-1/2 opacity-0 -bottom-10 bg-[#1972F5] rounded group-hover:opacity-100 group-hover:bottom-3 transition-all duration-300">
                                    <button className="px-6 py-2 flex items-center gap-3 font-bold text-[16px] text-white"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                handleJoinAuction(firstSessions?.id);
                                            }}
                                    >
                                        <FaPlus size={18}/>
                                        Join Auction
                                    </button>
                                </div>}
                            {/*<CountdownTimer targetDate={firstSessions?.startTime || ""}/>*/}
                            {/*<div*/}
                            {/*    className="absolute left-1/2 -translate-x-1/2 opacity-0 -bottom-10 bg-[#1972F5] rounded group-hover:opacity-100 group-hover:bottom-3 transition-all duration-300">*/}
                            {/*    <button className="px-6 py-2 flex items-center gap-3 font-bold text-[16px] text-white"*/}
                            {/*            onClick={(e) => {*/}
                            {/*                e.preventDefault();*/}
                            {/*                e.stopPropagation();*/}
                            {/*                handleJoinAuction(firstSessions?.id);*/}
                            {/*            }}*/}
                            {/*    >*/}
                            {/*        <FaPlus size={18}/>*/}
                            {/*        Join Auction*/}
                            {/*    </button>*/}
                            {/*</div>*/}
                        </div>
                        <div className="row-span-2 h-full bg-gray-200 ">
                            <div className="text-left text-[#0B1133] px-2 pt-3">
                                <p className="font-semibold text-xs">{firstSessions?.product?.category?.name || ""}</p>
                                <h5 className="text-lg font-bold">{firstSessions?.product?.productName || ""}</h5>
                            </div>
                            <div className="text-right text-[#0B1133] px-2 pb-3">
                                <p className="font-semibold text-xs">Start Bid:</p>
                                <h5 className="text-lg font-bold">${firstSessions?.product?.startingPrice || ""}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-5">
                        {
                            auctionSessions.slice(1).map((item) => {
                                return (
                                    <ProductItem key={item?.id} infoAuction={item}/>
                                )
                            })
                        }
                    </div>

                </div>
            </div>
        </Link>

    )
}

export default TrendingAuction
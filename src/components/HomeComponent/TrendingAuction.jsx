import CountdownTimer from "../CountdownTimer/CountdownTimer";
import {FaPlus} from "react-icons/fa";
import ProductItem from "../Products/ProductItem";
import {useEffect, useState} from "react";
import * as censorServices from "../../services/censor";

const TrendingAuction = () => {

    const [auctionSessions , setAuctionSession] = useState([])
    const [firstSessions , setFirstSessions] = useState({})

    useEffect(() => {
        const fetchAPI = async () => {
            const responseCensor = await censorServices.getAuctionSession({limit:5})
            responseCensor?.status === 200 && setAuctionSession(responseCensor?.data?.productAuctions)
            responseCensor?.status === 200 && setFirstSessions(responseCensor?.data?.productAuctions[0])
        }
        fetchAPI()
    }, [])

    return (
        <div className="px-10 mx-auto mt-20 mb-4">
            <h2 className="text-[#0B1133] text-2xl font-bold">Trending Auctions</h2>
            <p className="text-[#5F5F5F] text-xm font-thin">See what's popular across thousands of
                items.</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-7">
                <div className="w-full h-full grid grid-rows-6">
                    <div className="relative row-span-6 rounded-t-lg group transition-all overflow-y-hidden overflow-x-hidden">
                        <img
                            className="w-full h-full rounded-t-lg object-cover group-hover:scale-125 transition-all duration-500"
                            src={firstSessions?.prdImages?.[0]?.prdImageURL || ""}
                            alt={firstSessions?.title || ""}
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                        {/* Countdown */}
                        <CountdownTimer targetDate={firstSessions?.startTime || ""} />
                        <div className="absolute left-1/2 -translate-x-1/2 opacity-0 -bottom-10 bg-[#1972F5] rounded group-hover:opacity-100 group-hover:bottom-3 transition-all duration-300">
                            <button className="px-6 py-2 flex items-center gap-3 font-bold text-[16px] text-white">
                                <FaPlus size={18} />
                                Join Auction
                            </button>
                        </div>
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

    )
}

export default TrendingAuction
import CountdownTimer from "../CountdownTimer/CountdownTimer";
import {FaPlus} from "react-icons/fa";
import ProductItem from "../Products/ProductItem";

const TrendingAuction = ({auctionSessions = []}) => {

    console.log(auctionSessions)

    return (
        <div className="px-10 mx-auto mt-28 mb-24">
            <h2 className="text-[#0B1133] text-2xl font-bold">Trending Auctions</h2>
            <p className="text-[#5F5F5F] text-xm font-thin">See what's popular across thousands of
                items.</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-7">
                <div className="w-full h-full grid grid-rows-6">
                    <div
                        className="relative row-span-6 rounded-t-lg group transition-all overflow-y-hidden overflow-x-hidden">
                        <img
                            className="w-full h-full rounded-t-lg object-cover group-hover:scale-125 transition-all duration-500"
                            src="https://www.radiofrance.fr/s3/cruiser-production/2023/04/62ca129c-acbb-4520-82e9-f7f9ec38877b/870x489_sc_nonoghetto-a-man-working-on-a-computer-in-an-open-plan-office-t-9fe2b751-63cf-427c-8e19-9c502d040788.jpg"
                            alt="anh"/>
                        <div
                            className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                        {/*Countdown*/}
                        <CountdownTimer targetDate="2024-03-19T00:00:00"/>
                        <div
                            className="absolute left-1/2 -translate-x-1/2 opacity-0 -bottom-10 bg-[#1972F5] rounded group-hover:opacity-100 group-hover:bottom-3 transition-all duration-300">
                            <button
                                className="px-6 py-2 flex items-center gap-3 font-bold text-[16px] text-white">
                                <FaPlus size={18}/>
                                Join Auction
                            </button>
                        </div>
                    </div>
                    <div className="row-span-2 h-full bg-gray-200 ">
                        <div className="text-left text-[#0B1133] px-2 pt-3">
                            <p className="font-semibold text-xs">Cameras</p>
                            <h5 className="text-lg font-bold">Gopro Max</h5>
                        </div>
                        <div className="text-right text-[#0B1133] px-2 pb-3">
                            <p className="font-semibold text-xs">Start Bid:</p>
                            <h5 className="text-lg font-bold">$350,5</h5>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-5">
                    {
                        auctionSessions.map((item) => {
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
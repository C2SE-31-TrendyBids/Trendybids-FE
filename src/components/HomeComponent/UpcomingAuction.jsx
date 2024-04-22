import ProductItem from "../Products/ProductItem";
import {useEffect, useState} from "react";
import * as censorServices from "../../services/censor";

const UpcomingAuction = () => {

    const [auctionSessions, setAuctionSession] = useState([])

    useEffect(() => {
        const fetchAPI = async () => {
            const responseCensor = await censorServices.getAuctionSession({limit: 4, order: [["startTime", "DESC"]]})
            responseCensor?.status === 200 && setAuctionSession(responseCensor?.data?.productAuctions)
        }
        fetchAPI()
    }, [])

    return (
        <div
            className="bg-[#EAECF9] w-full sm:mt-28 h-[150px] mb-[300%] sm:mb-[650px] md:mb-[800px] lg:mb-[350px] pt-10">
            <h2 className="max-w-[1200px] mx-auto px-10 text-[#0B1133] text-2xl font-bold">Upcoming
                Auctions</h2>
            <div className="max-w-[1200px] mx-auto px-10 mt-14 -translate-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
                    {
                        auctionSessions
                            .filter(item => item.status !== "ended" && item.status !== "ongoing") // Filter out items with status not equal to "ended"
                            .map(item => (
                                <ProductItem key={item?.id} infoAuction={item}/>
                            ))
                    }
                </div>
            </div>
        </div>
    )
}

export default UpcomingAuction
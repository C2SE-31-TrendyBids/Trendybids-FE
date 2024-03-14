import ProductItem from "../Products/ProductItem";

const UpcomingAuction = ({auctionSessions = []}) => {

    return (
        <div
            className="bg-[#EAECF9] w-full sm:mt-28 h-[150px]  mb-[300%] sm:mb-[650px] md:mb-[800px] lg:mb-[300px] pt-10">
            <h2 className="max-w-[1200px] mx-auto px-10 text-[#0B1133] text-2xl font-bold">Upcoming
                Auctions</h2>
            <div className="max-w-[1200px] mx-auto px-10 mt-14 -translate-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
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

export default UpcomingAuction
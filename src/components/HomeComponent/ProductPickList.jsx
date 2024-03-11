import ProductItem from "../Products/ProductItem";

const ProductPickList = ({auctionSessions = []}) => {


    return (
        <div className="px-10 mx-auto mt-20 mb-32">
            <h2 className="text-[#0B1133] text-2xl font-bold">Products picked by hand</h2>
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
    )
}

export default ProductPickList
import SuggestBid from "./SuggestBid";
import React, {useState} from "react";

const FormBid = () => {
    const [highestPrice, setHighestPrice] = useState(1)
    const [bidPrice, setBidPrice] = useState('');
    const initialSuggestBidPrice = [
        {id: 1, label: "Background", text: "+10% cool gray", type: "percent", value: 0.1, active: false},
        {id: 2, label: "Background", text: "+20% cool gray", type: "percent", value: 0.2, active: false},
        {id: 3, label: "Background", text: "+30% cool gray", type: "percent", value: 0.3, active: false},
        {id: 4, label: "Background", text: "+10$ cool gray", type: "price", value: 10, active: false},
        {id: 5, label: "Background", text: "+20$ cool gray", type: "price", value: 20, active: false},
        {id: 6, label: "Background", text: "+30$ cool gray", type: "price", value: 30, active: false},
    ]
    const [suggestBids, setSuggestBis] = useState(initialSuggestBidPrice);


    const handleSuggestBid = (item) => {
        // handle set suggestion active
        setSuggestBis(prevState => (
            prevState.map(suggest => ({
                ...suggest,
                active: item?.id === suggest.id
            }))
        ));
        // handle set bid price
        if (item?.type === "percent") {
            setBidPrice((highestPrice * (1 + item.value)).toFixed(2));
        } else if (item?.type === "price") {
            setBidPrice((highestPrice + item.value).toFixed(2));
        }
    }

    const handleBidPrice = async (e, itemSuggest) => {
        e.preventDefault();
        const accessToken = localStorage.getItem("access-token");
        console.log(itemSuggest)
    }

    return (<div className="mt-4">
        <h3 className="font-bold text-lg">Suggest</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {
                suggestBids.map(suggest => {
                    return (
                        <SuggestBid key={suggest?.id} item={suggest}
                                    handleSuggestBidPrice={handleSuggestBid}/>
                    )
                })
            }
        </div>

        <form className="mt-4" onSubmit={handleBidPrice}>
            <button
                className="px-6 py-2 bg-[#0033FF] text-white font-semibold text-[16px] rounded-full mr-3">Bid
                now
            </button>
            <input className="px-4 py-2 focus:none outline-none border-gray-300 border-2 rounded-full"
                   type="text"
                   value={bidPrice}
                   onChange={(e) => {
                       setBidPrice(e.target.value)
                       setSuggestBis(initialSuggestBidPrice)
                   }}
                   placeholder="priceBid"/>
        </form>
    </div>)

}


export default FormBid;
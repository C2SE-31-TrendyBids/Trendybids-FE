const SuggestBid = ({item, handleSuggestBidPrice}) => {

    return (
        <div
            onClick={() => handleSuggestBidPrice(item)}
            className={`py-2 ${item?.active ? "border-blue-500" : "border-gray-400"}  border-[1.5px] text-center rounded-full relative hover:cursor-pointer group hover:border-blue-500 transition-all`}>
            <label htmlFor={""}
                   className={`absolute -top-2 left-1/2 -translate-x-1/2 bg-white px-1 text-[12px] font-semibold ${item?.active ? "text-blue-500" : "text-gray-400"} group-hover:text-blue-500 transition-all`}>{item?.label}</label>
            <p className="px-4 py-1 font-semibold">{item?.text}</p>
        </div>
    );
};

export default SuggestBid;
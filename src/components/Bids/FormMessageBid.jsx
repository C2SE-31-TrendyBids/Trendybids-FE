import {IoArrowDown, IoReload} from "react-icons/io5";
import ItemAuction from "../Products/ItemAuction";
import React, {useEffect, useRef, useState} from "react";
import {fetchBidPricesThunk} from "../../redux/slices/bidPrice";
import {useDispatch, useSelector} from "react-redux";

const FormMessageBid = ({sessionId}) => {
    const {
        bidPrices,
        loading,
        totalPages,
        countBids,
        currentPage,
    } = useSelector((state) => state.bidPrice)
    const dispatch = useDispatch()
    const userId = JSON.parse(localStorage.getItem('auth')).id
    const accessToken = localStorage.getItem('access-token')
    const bidsContainerRef = useRef(null);
    const [showScrollDownArrow, setShowScrollDownArrow] = useState(false);

    const handleFetchPreviousBids = () => {
        // Call action fetchPreviousBidPricesThunk và dispatch it
        (accessToken && sessionId) && dispatch(fetchBidPricesThunk({
            accessToken,
            sessionId: sessionId,
            page: currentPage + 1,
            limit: 8
        }));
    };

    useEffect(() => {
        const container = bidsContainerRef.current;
        // auto scroll to bottom when new bid is added
        if (container) {
            container.scrollTo({
                top: container.scrollHeight,
                behavior: 'smooth'
            });
        }
        const handleScroll = () => {
            const bottomOfContainer = container.scrollHeight - container.scrollTop === container.clientHeight;
            setShowScrollDownArrow(!bottomOfContainer);
        };

        container.addEventListener('scroll', handleScroll);

        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, [bidsContainerRef, bidPrices]);

    const scrollToBottom = () => {
        const container = bidsContainerRef.current;
        if (container) {
            container.scrollTo({
                top: container.scrollHeight,
                behavior: 'smooth'
            });
        }
    };


    return (
        <div className="relative mt-4 pb-4 border-b-[1px] border-gray-400">
            <div className="flex justify-between">
                <h3 className="font-bold text-lg">Bids</h3>
                <p className="font-normal text-xm ">Count Bids: {countBids}</p>
            </div>
            <div
                ref={bidsContainerRef}
                className="h-56 mt-2 overflow-y-scroll ">
                {(totalPages > 1 && currentPage < totalPages) &&
                    <p className="text-gray-200 flex items-center justify-center gap-3 group hover:bg-blue-300 hover:text-white hover:cursor-pointer rounded mb-2 transition-all"
                       onClick={handleFetchPreviousBids}
                    >
                        <IoReload size={16} className="font-bold group-hover:text-white"/> previous </p>
                }
                {bidPrices?.map((bidPrice, index) => {
                    return <ItemAuction key={index} infoBid={bidPrice} isOwner={userId === bidPrice?.user?.id}/>
                })}
                {showScrollDownArrow && (
                    <div className="absolute left-0 right-0 bottom-4 flex items-center justify-center mt-2">
                        <p
                            className={`p-2 rounded-full group bg-gray-200 hover:bg-blue-500 hover:cursor-pointer transition-all`}
                            onClick={scrollToBottom}
                        >
                            <IoArrowDown size={20} className="text-black font-bold group-hover:text-white "/>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FormMessageBid;
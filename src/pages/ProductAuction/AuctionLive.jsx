import {useParams} from "react-router-dom";
import React, {useEffect, useContext, useState} from "react";
import * as productAuctionService from "../../services/censor"
import SlideImage from "../../components/Images/SlideImage";
import CountdownAuctionLive from "../../components/CountdownTimer/CountdownAuctionLive";
import FormBid from "../../components/Bids/FormBid";
import SocketContext from "../../context/socketProvider";
import {useDispatch, useSelector} from "react-redux";
import {fetchBidPricesThunk, updateUserJoin} from "../../redux/slices/bidPrice";
import FormMessageBid from "../../components/Bids/FormMessageBid";

const AuctionLive = () => {
    const {productAuctionId} = useParams();
    const [auctionSessionDetail, setAuctionSessionDetail] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const socket = useContext(SocketContext)
    const {highestPrice, numberOfParticipants, currentUserJoin, currentPage} = useSelector((state) => state.bidPrice)
    const dispatch = useDispatch()
    const accessToken = localStorage.getItem('access-token')

    useEffect(() => {
        // fetch data when get productAuctionId
        const fetchProductAuction = async () => {
            setIsLoading(true)
            // call api het product auction by id
            const responseProductAuction = await productAuctionService.getAuctionSession({id: productAuctionId})
            if (responseProductAuction?.status === 200 && responseProductAuction?.data?.productAuctions?.length === 1) {
                const productAuction = responseProductAuction?.data?.productAuctions[0]
                setAuctionSessionDetail(productAuction)
            }
            setIsLoading(false)
        }
        productAuctionId && fetchProductAuction();

    }, [productAuctionId])


    useEffect(() => {
        const fetchBidPrices = async () => {
            // Emit onSessionJoin event when productAuctionId change
            socket.emit('onSessionJoin', {sessionId: productAuctionId});
            dispatch(fetchBidPricesThunk({accessToken, sessionId: productAuctionId, page: currentPage + 1, limit: 8}));
            socket.on('onUserParticipation', (data) => {
                console.log("data: " + JSON.stringify(data));
                // handle update user join session
                dispatch(updateUserJoin(data));
            });
        }
        (accessToken && productAuctionId) && fetchBidPrices()

        return () => {
            // Cleanup function, disconnection when component unmount
            socket.off('onSessionJoin')
        };
    }, [productAuctionId]);


    return <div className="max-w-[1230px] px-[30px] mx-auto mb-10 mt-10">
        <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 md:col-span-6">
                <SlideImage images={auctionSessionDetail?.product?.prdImages}/>
                {/*owner and censor*/}
                <div className="flex md:block lg:flex justify-between items-center">
                    <div className="md:mt-2 lg:mt-none">
                        <p className="block text-xm font-semibold text-gray-400">Owner</p>
                        <div className="flex items-center gap-2">
                            <img className="w-12 h-12 rounded"
                                 src={auctionSessionDetail?.product?.owner?.avatarUrl}
                                 alt="avatar"/>
                            <p className="text-xm font-bold uppercase">{auctionSessionDetail?.product?.owner?.fullName}</p>
                        </div>
                    </div>
                    <div className="md:mt-2 lg:mt-none">
                        <p className="block text-xm font-semibold text-gray-400">Censor</p>
                        <div className="flex items-center gap-2">
                            <img className="w-12 h-12 rounded"
                                 src={auctionSessionDetail?.censor?.avatarUrl}
                                 alt="avatar"/>
                            <p className="text-xm font-bold uppercase">{auctionSessionDetail?.censor?.name}</p>
                        </div>
                    </div>
                </div>
                {/*description*/}
                <div className="mt-2">
                    <div className="md:mt-2 lg:mt-none lg:mb-2">
                        <p className="text-xm font-semibold">Category: <span
                            className="text-xm text-gray-400 font-normal">{auctionSessionDetail?.product?.category?.name}</span>
                        </p>
                    </div>
                    <h1 className="text-xl font-bold">Description</h1>
                    <p className="text-xm font-normal text-[#A9A5A5]">{auctionSessionDetail?.description}</p>
                </div>
            </div>

            <div className="col-span-12 md:col-span-6">
                <div className=" pb-4">
                    <p className="text-lg font-normal text-blue-500">{auctionSessionDetail?.censor?.name}</p>
                    <h1 className="text-2xl font-bold">{auctionSessionDetail?.product?.productName}</h1>
                    <p className="text-[1.1rem] font-normal break-words mt-2">{auctionSessionDetail?.title}</p>
                </div>
                {/*owner and countdown time end*/}
                <div className="flex items-center justify-between gap-5">
                    <div className="">
                        <p className="block text-xm font-semibold text-gray-400 mb-1">Current Owner</p>
                        <div className="flex items-center gap-2">
                            <img className="w-10 h-10 rounded-full"
                                 src={auctionSessionDetail?.product?.owner?.avatarUrl}
                                 alt="avatar"/>
                            <p className="text-xm font-bold">{auctionSessionDetail?.product?.owner?.fullName}</p>
                        </div>
                    </div>
                    <div className="">
                        <p className="block text-xm font-semibold text-gray-400 mb-1">Auctions Ends in</p>
                        <CountdownAuctionLive targetDate={"2024-04-16 23:24:25.381 +0700"}/>
                    </div>
                </div>
                {/*info bids*/}
                <div className="flex items-center justify-between pb-4 border-b-[1px] border-gray-400 mt-4">
                    <div
                        className="inline px-6 py-2 bg-gray-300 text-gray-400 rounded-full font-semibold">From <span
                        className="font-semibold text-black">${auctionSessionDetail?.product?.startingPrice}</span>
                    </div>
                    <p className="text-gray-300 font-normal">{currentUserJoin} of {numberOfParticipants} available</p>
                    <p className="text-blue-500 font-semibold text-lg">Highest Bid ${highestPrice}</p>
                </div>

                {/*Form bids*/}
                <FormMessageBid sessionId={productAuctionId}/>
                {/*form bid*/}
                <FormBid sessionId={productAuctionId}/>
            </div>
        </div>
    </div>;
}

export default AuctionLive;
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import * as productAuctionService from "../../services/censor"
import * as userServices from "../../services/user";
import {toast} from "sonner";
import SlideImage from "../../components/Images/SlideImage";
import CountdownAuctionLive from "../../components/CountdownTimer/CountdownAuctionLive";
import ItemAuction from "../../components/Products/ItemAuction";
import TextField from '@mui/material/TextField';
import SuggestBid from "../../components/Bids/SuggestBid";
import FormBid from "../../components/Bids/FormBid";

const AuctionLive = () => {
    const {productAuctionId} = useParams();
    const [auctionSessionDetail, setAuctionSessionDetail] = useState({})
    const [isLoading, setIsLoading] = useState(true)


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

        // auto scroll on top
        window.onload = function() {
            window.scrollTo(0, 0);
        }

    }, [productAuctionId])


    return (
        <div className="max-w-[1230px] px-[30px] mx-auto mb-10 mt-10">
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 md:col-span-6">
                    <SlideImage images={auctionSessionDetail?.product?.prdImages}/>
                    {/*owner and censor*/}
                    <div className="flex justify-between items-center">
                        <div className="">
                            <p className="block text-xm font-semibold text-gray-400">Owner</p>
                            <div className="flex items-center gap-2">
                                <img className="w-14 h-14 rounded"
                                     src="https://imgv3.fotor.com/images/slider-image/Female-portrait-picture-enhanced-with-better-clarity-and-higher-quality-using-Fotors-free-online-AI-photo-enhancer.jpg"
                                     alt="avatar"/>
                                <p className="text-xm font-bold uppercase">Jinh</p>
                            </div>
                        </div>
                        <div className="">
                            <p className="block text-xm font-semibold text-gray-400">Owner</p>
                            <div className="flex items-center gap-2">
                                <img className="w-14 h-14 rounded"
                                     src="https://imgv3.fotor.com/images/slider-image/Female-portrait-picture-enhanced-with-better-clarity-and-higher-quality-using-Fotors-free-online-AI-photo-enhancer.jpg"
                                     alt="avatar"/>
                                <p className="text-xm font-bold uppercase">Jinh</p>
                            </div>
                        </div>
                        <div className="">
                            <p className="text-xm font-semibold">Category: <span
                                className="text-xm text-gray-400 font-normal">{auctionSessionDetail?.product?.category?.name}</span>
                            </p>
                        </div>
                    </div>
                    {/*description*/}
                    <div className="mt-2">
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
                                     src="https://imgv3.fotor.com/images/slider-image/Female-portrait-picture-enhanced-with-better-clarity-and-higher-quality-using-Fotors-free-online-AI-photo-enhancer.jpg"
                                     alt="avatar"/>
                                <p className="text-xm font-bold">Jinh</p>
                            </div>
                        </div>
                        <div className="">
                            <p className="block text-xm font-semibold text-gray-400 mb-1">Auctions Ends in</p>
                            <CountdownAuctionLive targetDate={"2024-04-24 23:24:25.381 +0700"}/>
                        </div>
                    </div>
                    {/*info bids*/}
                    <div className="flex items-center justify-between pb-4 border-b-[1px] border-gray-400 mt-4">
                        <div
                            className="inline px-6 py-2 bg-gray-300 text-gray-400 rounded-full font-semibold">From <span
                            className="font-semibold text-black">$15</span></div>
                        <p className="text-gray-300 font-normal">1 of 20 available</p>
                        <p className="text-blue-500 font-semibold text-lg">Highest Bid $30</p>
                    </div>

                    {/*Form bids*/}
                    <div className="mt-4 pb-4 border-b-[1px] border-gray-400">
                        <div className="flex justify-between">
                            <h3 className="font-bold text-lg">Bids</h3>
                            <p className="font-normal text-xm ">Count Bids: 12</p>
                        </div>
                        <div className="h-56 mt-2 overflow-y-scroll">
                            <ItemAuction/>
                            <ItemAuction/>
                            <ItemAuction/>
                            <ItemAuction type="owner"/>
                            <ItemAuction/>
                            <ItemAuction type="owner"/>
                        </div>
                    </div>
                    {/*form bid*/}
                    <FormBid/>
                </div>
            </div>
        </div>
    );
}

export default AuctionLive;
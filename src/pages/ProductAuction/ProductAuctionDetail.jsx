import ImagesComp from "../../components/Images/ImagesComp";
import { useNavigate, useParams } from "react-router-dom";
import CountdownTimer from "../../components/CountdownTimer/CountdownTimer";
import React, { useEffect, useState } from "react";
import ProductItem from "../../components/Products/ProductItem";
import * as productAuctionService from "../../services/censor";
import * as userServices from "../../services/user";
import { toast } from "sonner";
import ProductRelated from "../../components/Products/ProductRelated";
import ModalPay from "../Payment/ModalPay";
import { FaCheckCircle } from "react-icons/fa";
import { isReturnMoney } from '../../services/payment';

import Feedback from "../../components/Feedback/Feedback";
const ProductAuctionDetail = () => {

    const { productAuctionId } = useParams();
    const navigator = useNavigate()
    const [auctionSessionDetail, setAuctionSessionDetail] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [categoryId, setCategoryId] = useState(null)
    const [productAuctionsRelated, setProductAuctionsRelated] = useState([])

    const accessToken = localStorage.getItem("access-token");
    const [statusPayment, setStatusPayment] = useState(false)
    const [openPayment, setOpenPayment] = useState(false)
    useEffect(() => {
        // fetch data when get productAuctionId
        const fetchProductAuction = async () => {
            setIsLoading(true);
            // call api het product auction by id
            const responseProductAuction = await productAuctionService.getAuctionSession({ id: productAuctionId })
            if (responseProductAuction?.status === 200 && responseProductAuction?.data?.productAuctions?.length === 1) {
                const productAuction = responseProductAuction?.data?.productAuctions[0]
                setAuctionSessionDetail(productAuction)
                const categoryId = productAuction?.product?.category?.id
                setCategoryId(categoryId)
                const body = {
                    receiverId: productAuction?.censor?.id,
                    auctionId: productAuction?.id,
                    index: 3
                };
                const result = await isReturnMoney(accessToken, body);
                console.log(result);
                if (result?.data?.success) {
                    setStatusPayment(true)
                }
            }
            setIsLoading(false);
        };
        productAuctionId && fetchProductAuction();
    }, [productAuctionId]);

    useEffect(() => {
        // fetch data when get categoryId
        const fetchProductAuctionRelated = async () => {
            const fetchProductAuctionRelated =
                await productAuctionService.getAuctionSession({
                    categoryId: categoryId,
                    limit: 4,
                });
            if (fetchProductAuctionRelated?.status === 200) {
                const productAuctions =
                    fetchProductAuctionRelated?.data?.productAuctions;
                setProductAuctionsRelated(productAuctions);
            }
        };
        categoryId && fetchProductAuctionRelated();
    }, [categoryId]);

    const handleJoinAuction = async (sessionId) => {
        if (accessToken) {
            if (!statusPayment) return toast.error("You have not made a payment yet")
            const responseJoin = await userServices.joinSession(accessToken, sessionId)
            if (responseJoin?.status === 200) {
                toast.success("Join to auction session successfully!");
            } else {
                const errorMessage =
                    responseJoin?.error?.response?.data?.message;
                if (
                    errorMessage === "The user has participated in this auction"
                ) {
                    toast.error("You already to join this session!");
                } else toast.error("Join to auction session fail!");
            }
        } else {
            toast.error("Required login to join auction session!");
            navigator("/login");
        }
    };

    console.log(auctionSessionDetail);
    return (
        <div className="max-w-[1230px] px-[30px] mx-auto mb-10 mt-10">
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 md:col-span-6 lg:col-span-7">
                    <ImagesComp images={auctionSessionDetail?.product?.prdImages} />
                    <div className="mt-2">
                        <h1 className="text-xl font-bold">Description</h1>
                        <p className="text-xm font-normal text-[#A9A5A5]">
                            {auctionSessionDetail?.description}
                        </p>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-6 lg:col-span-5">
                    <div className=" pb-4">
                        <p className="text-lg font-normal text-blue-500">
                            {auctionSessionDetail?.censor?.name}
                        </p>
                        <h1 className="text-2xl font-bold">
                            {auctionSessionDetail?.product?.productName}
                        </h1>
                        <p className="text-[1.1rem] font-normal break-words mt-2">
                            {auctionSessionDetail?.title}
                        </p>
                    </div>
                    {
                        auctionSessionDetail?.status === "not_started" ?
                            <>
                                <div className="">
                                    <h4 className="text-xm font-semibold text-center">Countdown to the auction</h4>
                                    <div className="relative mt-4 py-8">
                                        <CountdownTimer targetDate={auctionSessionDetail?.startTime} />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between my-2">
                                    <div className="flex items-center">
                                        {statusPayment ? (
                                            <FaCheckCircle className="w-5 text-green-500 mx-2 " />
                                        ) : (
                                            <span className="w-4 h-4 rounded-full border mx-2 border-solid border-gray-800"></span>
                                        )}
                                        <span>You must pay {auctionSessionDetail?.product?.startingPrice} USD to participate in the auction</span>
                                    </div>
                                    {statusPayment === true ? (
                                        <span className="border border-solid bg-gray-600  text-white text-sm ml-2 px-4 py-1 rounded-lg " disabled >Success</span>

                                    ) : (
                                        <span className="border border-solid border-green-600 text-sm text-blue-600 hover:bg-green-500 hover:text-white ml-2 px-4 py-1 rounded-lg cursor-pointer" onClick={(e) => { setOpenPayment(true) }}>Payment</span>
                                    )}
                                    {
                                        openPayment && <ModalPay modalOpen={setOpenPayment} amount={auctionSessionDetail?.product?.startingPrice} accessToken={accessToken} setStatus={setStatusPayment} status={statusPayment} index={3} receiverId={auctionSessionDetail?.censor?.id} auctionId={auctionSessionDetail?.id} />
                                    }
                                </div>
                                <button
                                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg mt-5 font-semibold "
                                    onClick={() => handleJoinAuction(auctionSessionDetail?.id)}
                                >Register to participate in the auction
                                </button>
                            </>
                            : <div className="text-center font-semibold text-lg text-red-400">The
                                auction {auctionSessionDetail?.status === "ongoing" ? "is underway" : "has ended"} </div>
                    }

                </div>
            </div>

            <div className="mt-8">
                <ProductRelated
                    productAuctionsRelated={productAuctionsRelated}
                />
            </div>
            <div className="mt-8">
                <h1 className="text-xl font-bold mb-6">Product Reviews</h1>
                <Feedback />
            </div>
        </div>
    );
};

export default ProductAuctionDetail;

import React, { useEffect, useState } from 'react'
import { getUserParticipating } from '../../services/censor'
import { isReturnMoney } from '../../services/payment';
import noDataSvg from "../../assets/vectors/no data.svg";
import logo from "../../assets/images/logo.jpg";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { Pagination } from "@mui/material";
import ModalPay from '../Payment/ModalPay';

const ViewUserParticipant = ({ productAuctionId }) => {
    const accessToken = localStorage.getItem("access-token");
    const [userParticipant, setUserParticipant] = useState([])
    const [totalUserParticipant, setTotalUserParticipant] = useState('')
    const [pageNumber, setPageNumber] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const [statusPayment, setStatusPayment] = useState(false)
    const [openPayment, setOpenPayment] = useState(false)
    const [receiverId, setReceiverId] = useState('')
    const [auctionId, setAuctionId] = useState('')
    const [starPrice, setStarPrice] = useState('')
    const [paymentStatusList, setPaymentStatusList] = useState([]);

    const handlePageChange = (event, page) => {
        setPageNumber(page);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUserParticipating(accessToken, pageNumber, 6, productAuctionId);

                setUserParticipant(response?.data?.userParticipating);
                setTotalUserParticipant(response.data?.userCount);
                setTotalPages(response?.data?.totalPages);

                const paymentStatusPromises = response.data?.userParticipating.map(async (item) => {
                    const body = {
                        receiverId: item?.user?.id,
                        auctionId: productAuctionId,
                        index: 3
                    };
                    const result = await isReturnMoney(accessToken, body);
                    return result?.data?.success;
                });
                const paymentStatusResults = await Promise.all(paymentStatusPromises);
                setPaymentStatusList(paymentStatusResults);
                setStatusPayment(false)
            } catch (error) {
                console.log(error);
            }
        };

        if (accessToken) {
            fetchData();
        }
    }, [productAuctionId, pageNumber, accessToken, statusPayment]);

    console.log(userParticipant);

    const handleOpenPayment = (item) => {
        console.log(item);
        setReceiverId(item?.user?.id)
        setAuctionId(item?.productAuctionId)
        setStarPrice(item?.productAuction?.product?.startingPrice)
        setOpenPayment(true)
    }

    return (
        <div className="w-[800px] h-[620px] overflow-auto border bg-white py-2 px-2 rounded-md relative">
            <div className='grid grid-cols-2 gap-2'>
                <div className='col-span-1 m-2'>
                    <div className="p-1 border-[0.5px] border-gray-400 rounded-lg text-black bg-white flex items-center md:mt-0">
                        <AiOutlineUsergroupAdd className="text-5xl text-blue-400 mx-2" />
                        <div className="">
                            <p className="text-xl font-bold">{totalUserParticipant}</p>
                            <p className="font-medium text-sm text-gray-700">Total User Participant</p>
                        </div>
                    </div>
                </div>

                <div className='col-span-1 m-2 flex items-center justify-end '>
                    {/* <button className="p-1 w-1/2 h-full border-[0.5px] border-gray-400 rounded-lg text-black bg-white flex items-center justify-center font-semibold text-xl hover:bg-gray-400 hover:text-white md:mt-0 ">
                        Payment All
                    </button> */}
                </div>
            </div>
            <table className="min-w-full bg-white">
                <thead className="bg-blue-50 whitespace-nowrap">
                    <tr className="font-medium text-left">
                        <th className="px-6 py-3 text-md font-semibold hover:text-[#007bff] cursor-pointer text-gray-700 w-[400px]">
                            Name
                        </th>
                        <th className="px-6 py-3 text-md font-semibold hover:text-[#007bff] cursor-pointer text-gray-700">
                            Image
                        </th>

                        <th className="px-6 py-3 text-md font-semibold hover:text-[#007bff] cursor-pointer text-gray-700">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className="whitespace-nowrap">
                    {userParticipant && userParticipant.length > 0 ? (
                        userParticipant.map((item, index) => {
                            return (
                                <tr
                                    className="hover:bg-gray-50 text-left odd:bg-gray-50 cursor-pointer"
                                    key={index}
                                >
                                    <td className="px-6 py-2 text-sm w-[400px]">{item?.user?.fullName}</td>
                                    <td className="px-6 py-2 ">
                                        <img
                                            src={item?.user?.avatarUrl || ""}
                                            onError={(e) => { e.target.onerror = null; e.target.src = logo; }}
                                            alt={item?.product?.productName}
                                            className="w-14 h-14 object-cover rounded-md"
                                        />
                                    </td>
                                    <td className="px-6 py-2 text-[12px] truncate max-w-2xl">
                                        {!paymentStatusList[index] ? (
                                            <button className='w-2/3 py-2 px-4 border rounded-lg font-semibold bg-green-600 text-gray-100 hover:bg-green-900 hover:text-white' onClick={(e) => { handleOpenPayment(item) }}>Return Money</button>
                                        ) : (
                                            <button className='w-2/3 py-2 px-4 border rounded-lg font-semibold bg-gray-600 text-gray-100 ' disabled>Return Money</button>
                                        )}
                                        {
                                            openPayment && <ModalPay modalOpen={setOpenPayment} amount={starPrice} accessToken={accessToken} setStatus={setStatusPayment} status={statusPayment} index={3} receiverId={receiverId} auctionId={auctionId} />
                                        }
                                    </td>

                                </tr>
                            )
                        })
                    ) : (
                        <div className="w-full mx-[50%] mt-[20%] flex justify-center items-center flex-col">
                            <img
                                src={noDataSvg}
                                alt="anh"
                                className="w-52 h-52 text-primaryColor mr-8"
                            ></img>
                            <h2 className="text-xl font-medium mt-2 mb-2">
                                There are no user participating
                            </h2>
                        </div>
                    )}
                </tbody>
            </table>
            <div className={`absolute mb-2 bottom-0 left-0 right-0 ${userParticipant && userParticipant.length > 0 ? "grid place-items-center" : "hidden"}`}>
                <Pagination count={totalPages} color="primary" onChange={handlePageChange} />
            </div>
        </div>
    )
}

export default ViewUserParticipant

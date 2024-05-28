import * as React from 'react';
import { getAuctionBidsSuccess } from '../../services/user'
import { useEffect } from 'react';
import { useState } from 'react';
import { Pagination } from '@mui/material';
import noDataSvg from '../../assets/vectors/no data.svg'
import { useNavigate } from 'react-router-dom';
import { isReturnMoney } from '../../services/payment';

const ProBidsSuccess = () => {
    const [page, setPage] = useState(1)
    const navigate = useNavigate();
    const [totalPage, setTotalPage] = useState(1)
    const accessToken = localStorage.getItem("access-token");
    const [productBidSuccess, setProductBidSuccess] = useState([])
    const [paymentStatusList, setPaymentStatusList] = useState([]);

    const handlePageChange = (event, page) => {
        setPage(page);
    };
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const data = await getAuctionBidsSuccess(accessToken, page, 4)
                if (data?.statusCode === 200) {
                    setTotalPage(data?.response?.totalPage)
                    setProductBidSuccess(data?.response?.products)
                    console.log(data?.response?.products);
                    const paymentStatusPromises = data?.response?.products.map(async (item) => {
                        const body = {
                            receiverId: item?.product?.owner?.id,
                            auctionId: item?.id,
                            index: 4
                        };
                        const result = await isReturnMoney(accessToken, body);
                        return result?.data?.success;
                    });
                    const paymentStatusResults = await Promise.all(paymentStatusPromises);

                    setPaymentStatusList(paymentStatusResults);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchApi()
    }, [page])

    const handlePayment = (item) => {
        navigate(`/checkout`, { state: { item } });
    };
    return (
        <div>
            <table className="min-w-full bg-white font-[sans-serif]">
                <thead className="whitespace-nowrap">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-black">
                            Product Name
                        </th>
                        < th className="px-6 py-3 text-left text-sm font-semibold text-black">
                            Highest Price
                        </th>
                        < th className="px-6 py-3 text-left text-sm font-semibold text-black">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className="whitespace-nowrap ">
                    {productBidSuccess && productBidSuccess.length > 0 ? (
                        productBidSuccess?.map((item, index) => (
                            <tr className="odd:bg-blue-50">
                                <td className="px-6 py-2.5 text-sm">
                                    {item?.product?.productName}
                                </td>
                                <td className="px-6 py-3 text-sm">
                                    {item?.highestPrice}
                                </td>
                                <td className="px-6 py-3">
                                    {!paymentStatusList[index] ? (
                                        <button className='border px-4 py-1 rounded-lg bg-green-600 text-white text-[10px] hover:bg-green-800'
                                            onClick={() => handlePayment(item)}>PAYMENT</button>

                                    ) : (
                                        <button className='border px-4 py-1 rounded-lg bg-gray-600 text-white text-[10px]'
                                            disabled>Success</button>

                                    )}
                                </td>
                            </tr>
                        )
                        )) : (
                        <div className="w-full mx-[45%] flex justify-center items-center flex-col">
                            <img
                                src={noDataSvg}
                                alt="anh"
                                className="w-52 h-52 text-primaryColor mr-8"
                            ></img>
                            <h2 className="text-sm font-medium mt-2 mb-2">
                                You have not successfully bid on any products yet
                            </h2>
                        </div>
                    )}

                </tbody>
            </table>
            <div className='flex items-center justify-center mt-2'>
                <Pagination count={totalPage} color="primary" onChange={handlePageChange} />
            </div>
        </div>
    );
}

export default ProBidsSuccess

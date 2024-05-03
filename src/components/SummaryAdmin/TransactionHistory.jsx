import React, {useEffect, useState} from 'react'
import * as adminServices from '../../services/admin'
import {Pagination} from "@mui/material";
import moment from "moment";
import {FaMoneyCheckDollar} from "react-icons/fa6";

const TransactionHistory = () => {

    const [transactions, setTransactions] = useState([])
    const [totalPage, setTotalPage] = useState(3)
    const [currentPage, setCurrentPage] = useState(1);
    const [params, setParams] = useState({page: 1, limit: 3})

    useEffect(() => {
        const accessToken = localStorage.getItem("access-token");
        const fetchTransactions = async () => {
            const responseTransactions = await adminServices.getTransactionHistory(accessToken, params);
            if (responseTransactions?.status === 200) {
                setTransactions(responseTransactions?.data?.transactionHistories);
                setTotalPage(responseTransactions?.data?.totalPage);
            }
        }
        accessToken && fetchTransactions();
    }, [params])

    const handleChange = (event, value) => {
        console.log(value);
        setCurrentPage(value);
        setParams(prevState => ({...prevState, page: value}));
    };


    return (
        <div>
            <div className="px-2 flex justify-between items-center mt-2">
                <h1 className="text-[#1B2559] text-lg font-bold">History Transaction</h1>
                <div>
                    <Pagination count={totalPage}
                                page={currentPage}
                                color="primary"
                                onChange={handleChange}
                    />
                </div>
            </div>
            <div className="px-2 py-2">
                {
                    transactions.map((transaction, index) => {
                        return (
                            <div key={transaction?.id}
                                 className="flex items-center justify-between p-2 rounded-lg hover:shadow-lg transition-all mt-2">
                                <div className="flex gap-2">
                                    <img src={transaction?.receiverTransaction?.avatarUrl || "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"}
                                         alt={transaction?.receiverTransaction?.fullName}
                                         className="w-14 h-14 rounded-lg"/>
                                    <div className="flex flex-col justify-center items-start gap-2">
                                        <h3 className="text-[#1B2559] text-sm font-medium">{transaction?.transactionType}</h3>
                                        <p className="text-sm text-[#A3AED0]">by {transaction?.receiverTransaction?.fullName}</p>
                                    </div>
                                </div>
                                <p className="text-[#1B2559] font-medium flex items-center gap-2"><FaMoneyCheckDollar
                                    size={20}/> {transaction?.money}$</p>
                                <p className="text-[#A3AED0] mr-2">{moment(transaction?.createdAt).format('LLL')}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default TransactionHistory;
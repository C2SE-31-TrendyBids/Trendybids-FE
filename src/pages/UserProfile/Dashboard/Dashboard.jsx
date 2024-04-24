import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { getSummaryAuctionSessionUser, getSummaryAuctionSessionDetailUser } from '../../../services/user'
import { Bar } from 'react-chartjs-2';
import { CategoryScale, Chart } from 'chart.js';
import { LinearScale } from 'chart.js';
import { BarController, BarElement } from 'chart.js';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { RiAuctionFill } from "react-icons/ri";
import { GiTakeMyMoney } from "react-icons/gi";
import { IoIosCheckmarkCircle } from "react-icons/io";
Chart.register(BarController, BarElement);
Chart.register(LinearScale);
Chart.register(CategoryScale);

const Dashboard = () => {
    const [productAuctionId, setProductAuctionId] = useState('');
    const handleChange = (event) => {
        setProductAuctionId(event.target.value);
    };
    const [sumaryAuction, setSumaryAuction] = useState([])
    const [totalAuctionPar, setTotalAuctionPar] = useState('')
    const [totalQuote, setTotalQuote] = useState('')
    const [totalAuctionSuccess, setTotalAuctionSuccess] = useState('')
    const [bidsPrice, setbidsPrice] = useState([])
    const [bidsDate, setbidsDate] = useState([])
    const [hightPrice, setHightPrice] = useState([])
    const [name, setName] = useState([])
    const accessToken = localStorage.getItem("access-token");
    useEffect(() => {
        try {
            const fetchApi = async () => {
                const prices = [];
                const name = [];
                const productAuctionData = await getSummaryAuctionSessionUser(accessToken);
                if (productAuctionData && productAuctionData?.response && productAuctionData?.response?.productAuction) {
                    const productAuctions = productAuctionData?.response?.productAuction;
                    productAuctions.forEach(productAuction => {
                        const price = parseFloat(productAuction?.productAuction?.highestPrice) === 0.00 ?
                            productAuction?.productAuction?.product?.startingPrice :
                            productAuction?.productAuction?.highestPrice;
                        prices.push(price);
                        const name1 = (productAuction?.productAuction?.product?.productName).length > 10 ?
                            (productAuction?.productAuction?.product?.productName).substring(0, 10) + '...' :
                            (productAuction?.productAuction?.product?.productName)
                        name.push(name1)
                    });
                    setHightPrice(prices)
                    setName(name)
                    setSumaryAuction(productAuctionData?.response?.productAuction);
                    setTotalAuctionPar(productAuctionData?.response?.numberOfParticipatAuctions)
                    setTotalQuote(productAuctionData?.response?.auctionQuote)
                    setTotalAuctionSuccess(productAuctionData?.response?.productAuctionSuccess)
                } else {
                    console.log("Không có dữ liệu productAuction được trả về từ API.");
                }
            };
            fetchApi();
        } catch (error) {
            console.log(error);
        }
    }, [])
    useEffect(() => {
        try {
            const fetchApi = async () => {
                const dataDetail = await getSummaryAuctionSessionDetailUser(accessToken, productAuctionId)
                let dates = [];
                let pricesBid = [];
                if (dataDetail && dataDetail?.response && dataDetail?.response?.auctionDetail) {
                    const detail = dataDetail?.response?.auctionDetail;
                    detail.forEach(productAuction => {
                        pricesBid.push(productAuction?.auctionPrice);
                        const formattedDate = moment(productAuction?.createdAt).format('DD/MM/YYYY HH:mm')
                        dates.push(formattedDate)
                    });
                    setbidsPrice(pricesBid)
                    setbidsDate(dates)
                } else {
                    dates = [0, 0, 0, 0, 0, 0, 0, 0]
                    pricesBid = [0, 0, 0, 0, 0, 0, 0, 0]
                    setbidsPrice(pricesBid)
                    setbidsDate(dates)
                }
            };
            fetchApi();
        } catch (error) {
            console.log(error);
        }
    }, [productAuctionId])

    const data = {
        labels: name,
        datasets: [
            {
                label: 'My First Dataset',
                data: hightPrice,
                backgroundColor: '#0033CC',
                borderColor: '#003399',
                borderWidth: 1,
            },
        ],
    };
    const dataDetailAuction = {
        labels: bidsDate,
        datasets: [
            {
                label: 'My First Dataset',
                data: bidsPrice,
                backgroundColor: '#0033CC',
                borderColor: '#003399',
                borderWidth: 1,
            },
        ],
    };
    const options = {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Hight Price",
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Name Product',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            }
        },
    };
    const optionsDetail = {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "The Price You Bid",
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Time You Bid',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                }
            }
        },
    };
    return (
        <div className='w-full mx-[30px] mt-20'>
            <div className='grid grid-cols-3 gap-4'>
                <div className='col-span-1'>
                    <div className='w-full h-20 border rounded-lg border-[#0033CC] flex items-center justify-center'>
                        <div className='text-5xl text-[#0033CC]'>
                            <RiAuctionFill />
                        </div>
                        <div className='ml-2 font-semibold'>
                            <div className='text-xl'>  Total auctions</div>
                            <span className='text-2xl text-[#0033CC] ml-3'> {totalAuctionPar} </span>
                            <span className='text-gray-400'> participating</span>
                        </div>
                    </div>
                </div>
                <div className='col-span-1'>
                    <div className='w-full h-20 border rounded-lg border-[#0033CC] flex items-center justify-center'>
                        <div className='text-5xl text-[#0033CC]'>
                            <GiTakeMyMoney />
                        </div>
                        <div className='ml-2 font-semibold'>
                            <div className='text-xl'>  Total number</div>
                            <span className='text-2xl text-[#0033CC] ml-3'> {totalQuote}</span>
                            <span className='text-gray-400'> of bids</span>
                        </div>
                    </div>
                </div>
                <div className='col-span-1'>
                    <div className='w-full h-20 border rounded-lg border-[#0033CC] flex items-center justify-center'>
                        <div className='text-5xl text-[#0033CC]'>
                            <IoIosCheckmarkCircle />
                        </div>
                        <div className='ml-2 font-semibold'>
                            <div className='text-xl'>  Total successfully</div>
                            <span className='text-2xl text-[#0033CC] ml-3'> {totalAuctionSuccess}</span>
                            <span className='text-gray-400'> auction products</span>
                        </div>
                    </div>
                </div>


            </div>
            <div className='flex items-center justify-center mt-10'>
                <div className='w-[800px]'>
                    <h2 className='text-center text-xl font-bold text-blue-600'>You have participated in the auction</h2>
                    <Bar data={data} options={options} />
                </div>
            </div>
            <div className='flex items-center justify-center mt-10'>
                <div className='w-[800px]'>
                    <div className='flex items-center justify-center'>
                        <h2 className='text-xl mr-2 font-bold text-blue-600'>You have given a price for the product : </h2>
                        <Box sx={{ minWidth: 300 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Name Product</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={productAuctionId}
                                    label="Name Product"
                                    onChange={handleChange}
                                >
                                    {sumaryAuction.map((item) => (
                                        <MenuItem value={item?.productAuction?.id}>{item?.productAuction?.product?.productName}</MenuItem>
                                    ))}

                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <Bar data={dataDetailAuction} options={optionsDetail} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard

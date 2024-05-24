import React, { useEffect, useState } from 'react';
import moment from 'moment';
import logo from "../../../assets/images/logo.jpg";
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
import UseTransaction from '../../../components/SummaryUserModal/UserTransaction';
import ProBidsSuccess from '../../../components/SummaryUserModal/ProBidsSuccess';
import ChartMoney from '../../../components/SummaryUserModal/ChartMoney';
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
    const [productBids, setProductBids] = useState([])
    const accessToken = localStorage.getItem("access-token");

    useEffect(() => {
        try {
            const fetchApi = async () => {
                const productAuctionData = await getSummaryAuctionSessionUser(accessToken);
                console.log(productAuctionData);
                if (productAuctionData && productAuctionData?.response && productAuctionData?.response?.productAuction) {
                    const productAuctions = productAuctionData?.response?.productAuction;
                    setProductBids(productAuctions)
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

    const dataDetailAuction = {
        labels: bidsDate,
        datasets: [
            {
                label: 'The amount you bid',
                data: bidsPrice,
                backgroundColor: '#0033CC',
                borderColor: '#003399',
                borderWidth: 1,
                barThickness: 20, // Fixed bar thickness
                maxBarThickness: 20, // Maximum bar thickness
            },
        ],
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
                },
                ticks: {
                    maxRotation: 0,
                    minRotation: 0
                }
            }
        },
        maintainAspectRatio: true,
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
            <div className='grid grid-cols-8 gap-2 mt-10'>
                <div className='col-span-3 border shadow-sm rounded-lg bg-gray-50 text-center border-[#0033CC]'>
                    <h1 className='text-base text-blue-600 font-bold py-4'>The product you bid on</h1>
                    <div className=' h-[300px] overflow-y-auto no-scrollbar pb-2'>
                        {productBids?.map((item, index) => (
                            <div key={index} className='flex items-center justify-center bg-white'>
                                <div className='w-4/5 flex items-center justify-start border shadow-lg rounded-lg mt-4'>
                                    <div className='w-12 my-2 ml-4'>
                                        <img src={item?.productAuction?.product?.prdImages[0]?.prdImageURL || logo} alt="avatar" />
                                    </div>
                                    <div className='ml-2'>
                                        <h1 className='text-sm'>{item?.productAuction?.product?.productName}</h1>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='col-span-5 shadow-sm border rounded-lg border-[#0033CC] text-center bg-gray-50'>
                    <h1 className='text-base text-blue-600 font-bold py-3'>The product you have successfully auctioned</h1>
                    <ProBidsSuccess />
                </div>
            </div>
            <div className='grid grid-cols-8 gap-2 mt-4' >
                <div className='col-span-5 shadow-sm p-2 border rounded-lg border-[#0033CC]'>
                    <div className='flex items-center justify-center'>
                        <h2 className='text-base mr-2 font-bold text-blue-600'>You have given a price for the product : </h2>
                        <Box sx={{ minWidth: 200 }}>
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
                <div className='col-span-3 border border-blue-600 rounded-lg'>
                    <ChartMoney />
                </div>
            </div>
            <div className='grid grid-cols-8 gap-2 mt-4' >
                <div className="col-span-5 bg-white p-2 rounded-lg border border-blue-600 my-2">
                    <UseTransaction />
                </div>
            </div>

        </div>
    )
}

export default Dashboard

import React, {useEffect, useState} from 'react';
import {Pagination} from "@mui/material";
import * as censorService from "../../services/censor"
import {format} from "date-fns";
import {motion} from 'framer-motion'
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import EditSessionModal from "../../components/EditSessionModal/EditSessionModal";
import noDataSvg from "../../assets/vectors/no data.svg"

const AuctionSession = () => {
    const accessToken = localStorage.getItem('access-token')
    const [openModal, setOpenModal] = React.useState(false)
    const [totalPage, setTotalPage] = useState(1)
    const [listSession, setListSession] = useState([])
    const [filter, setFilter] = useState({
        page: 1,
        limit: 8,
        status: ""
    })
    const [sessionSelected, setSessionSelected] = useState({
        title: "",
        description: "",
        startTime: "",
        endTime: "",
        status: "",
    })
    const [isUpdated, setIsUpdated] = useState(false)

    const handlePageChange = (e, page) => {
        setFilter({
            ...filter,
            page
        })
    }

    const handleChangeStatus = (value) => {
        console.log(value)
        setFilter({
            ...filter,
            page: 1,
            status: value,
        })
    }

    useEffect(() => {
        (async () => {
            console.log(filter)
            const auctionSession = await censorService.getAuctionSessionByCensor(filter, accessToken)
            if (auctionSession.statusCode === 200) {
                setListSession(auctionSession.response.productAuctions)
                setTotalPage(auctionSession.response.totalPages)
            }
        })()
    }, [isUpdated, filter]);

    const handleOpenEditModal = (item) => {
        setOpenModal(true)
        setSessionSelected(item)
    }

    return (
        <div className="h-screen max-w-[1230px] py-4 px-[30px] mx-auto ">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-[#007bff]">List Auction Session</h1>
                <div className="space-x-3">
                    <Select
                        placeholder="Status: All"
                        indicator={<KeyboardArrowDown />}
                        variant="outlined"
                        color="primary"
                        sx={{
                            width: 150,
                            [`& .${selectClasses.indicator}`]: {
                                transition: '0.2s',
                                [`&.${selectClasses.expanded}`]: {
                                    transform: 'rotate(-180deg)',
                                },
                            },
                        }}
                        onChange={(e, newValue) => handleChangeStatus(newValue)}
                    >
                        <Option value="">Status: All</Option>
                        <Option value="not_started">Not Started</Option>
                        <Option value="ongoing">On Going</Option>
                        <Option value="ended">Ended</Option>
                        <Option value="cancelled">Cancelled</Option>
                    </Select>
                </div>
            </div>
            <div className="h-[85%] overflow-auto border bg-white py-4 px-2 rounded-md">
                <table className="min-w-full bg-white">
                    <thead className="bg-blue-50 whitespace-nowrap">
                        <tr className="font-medium text-left">
                            <th className="px-6 py-3 text-md font-semibold hover:text-[#007bff] cursor-pointer text-gray-700">
                                Title
                            </th>
                            <th className="px-6 py-3 text-md font-semibold hover:text-[#007bff] cursor-pointer text-gray-700">
                                Product
                            </th>
                            <th className="px-6 py-3 text-md font-semibold hover:text-[#007bff] cursor-pointer text-gray-700">
                                Start Time
                            </th>
                            <th className="px-6 py-3 text-md font-semibold hover:text-[#007bff] cursor-pointer text-gray-700">
                                End Time
                            </th>
                            <th className="px-6 py-3 text-md font-semibold hover:text-[#007bff] cursor-pointer text-gray-700">
                                Status
                            </th>
                            <th className="px-6 py-3 text-md font-semibold hover:text-[#007bff] cursor-pointer text-gray-700">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="whitespace-nowrap">
                        {listSession && listSession.length > 0 ? (
                            listSession.map((item, index) => (
                                <tr className="hover:bg-gray-50 text-left odd:bg-gray-50 cursor-pointer" key={index}>
                                    <td className="px-6 py-2 text-sm">{item?.title}</td>
                                    <td className="px-6 py-2">
                                        <img
                                            src={item?.product?.prdImages[0]?.prdImageURL || "https://lh3.googleusercontent.com/proxy/isoli79kvQ3rAEkQZ0LdfZiqKvjkDl2-ZptWZypSU-ws3Y6UpnNrBlmxBAWukMwaJBuiecMlJuOMpMcXoc-h3DO4jFTHr_orhAOugIM3rQ"}
                                            alt={item?.product?.productName}
                                            className="w-14 h-14"
                                        />
                                    </td>
                                    <td className="px-6 py-2 text-sm truncate max-w-2xl">{format(new Date(item?.startTime), 'HH:mm, MMMM d, yyyy')}</td>
                                    <td className="px-6 py-2 text-sm truncate max-w-2xl">{format(new Date(item?.endTime), 'HH:mm, MMMM d, yyyy')}</td>
                                    <td className="px-6 py-2 text-sm">
                                    <span
                                        className={`block text-center py-0.5 font-semibold rounded text-xs border-2 px-0.5 ${
                                            item.status === "not_started"
                                                ? "border-blue-500 text-blue-500" : item.status === "ongoing" ? "border-blue-700 text-blue-700"
                                                    : item.status === "ended" ? "border-green-500 text-green-500" : "border-red-500 text-red-500"
                                        }`}
                                    >
                                      {item.status === "not_started" ? "Not Started" : item.status === "ongoing" ? "On Going" : item.status === "ended" ? "Ended" : "Cancelled"}
                                    </span>
                                    </td>
                                    <td className="px-6 py-3">
                                        <motion.button whileHover={{scale: 1.5}} className="mr-4" title="Edit" onClick={(e) => handleOpenEditModal(item)}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-5 fill-blue-500 hover:fill-blue-700"
                                                viewBox="0 0 348.882 348.882"
                                            >
                                                <path
                                                    d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z"
                                                    data-original="#000000"
                                                />
                                                <path
                                                    d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z"
                                                    data-original="#000000"
                                                />
                                            </svg>
                                        </motion.button>
                                        <motion.button whileHover={{scale: 1.5}}
                                                       className="mr-4"
                                                       title="Delete"
                                            // onClick={() => handleDeleteProduct(prod.id)}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-5 fill-red-500 hover:fill-red-700"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                                                    data-original="#000000"
                                                />
                                                <path
                                                    d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                                                    data-original="#000000"
                                                />
                                            </svg>
                                        </motion.button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <div className="w-full mx-[110%] mt-[30%] flex justify-center items-center flex-col">
                                <img src={noDataSvg} alt="anh" className="w-52 h-52 text-primaryColor mr-8"></img>
                                <h2 className="text-xl font-medium mt-2 mb-2">There are no auctions</h2>
                            </div>
                        )}
                    </tbody>
                </table>
            </div>
            <div className='flex items-center justify-center mt-4'>
                <Pagination count={totalPage} shape="rounded" color="primary" page={filter.page} onChange={handlePageChange} />
            </div>

            {/*Modal Edit Session*/}
            <EditSessionModal
                isUpdated={isUpdated}
                setIsUpdated={setIsUpdated}
                openModal={openModal}
                setOpenModal={setOpenModal}
                sessionSelected={sessionSelected}
                setSessionSelected={setSessionSelected}
            />
        </div>
    );
};

export default AuctionSession;
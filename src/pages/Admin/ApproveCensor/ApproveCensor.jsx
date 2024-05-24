import React, { useEffect, useState } from 'react'
import * as censorApi from '../../../services/censor'
import { Pagination } from '@mui/material';
import noDataSvg from "../../../assets/vectors/no data.svg";
import CensorDetail from './CensorDetail';
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { LiaUserCheckSolid } from "react-icons/lia";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import HeaderAdmin from "../../../components/Header/HeaderAdmin";
const ApproveCensor = () => {
    const [censors, setCensors] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalItem, setTotalItem] = useState(0)
    const [modalOpenView, setModalOpenView] = useState(false);
    const [censorView, setCensorView] = useState('')
    const accessToken = localStorage.getItem('access-token');
    const [change, setChange] = useState(true)
    const [search, setSearch] = useState("");
    const [totalActive, setTotalActive] = useState(0)
    const [status, setStatus] = useState('');

    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    useEffect(() => {
        try {
            let params = { status: 'Verified' };
            const fetchData = async () => {
                const response = await censorApi.getCensors(params)
                setTotalActive(response?.data?.totalItem)
                const response1 = await censorApi.getCensors({})
                setTotalItem(response1?.data?.totalItem)
            }
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }, [change])

    useEffect(() => {
        try {
            let params = { page: pageNumber, limit: 7 };
            if (search !== '') {
                params.name = search
                setPageNumber(1)
            }
            if (status !== '') {
                params.status = status
                setPageNumber(1)
            }
            const fetchData = async () => {
                const response = await censorApi.getCensors(params)
                setCensors(response?.data?.censors)
                setTotalPages(response.data?.totalPages)
            }
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }, [pageNumber, change, search, status])

    const handlePageChange = (event, page) => {
        setPageNumber(page);
    };
    const handleViewDetail = (product) => {
        setCensorView(product)
        setModalOpenView(true)
    }
    return (
        <div className="h-screen max-w-[1230px] px-1.5 mx-auto relative ">
            <HeaderAdmin pageName={"Censor"} />
            <div className='grid grid-cols-12 gap-2 mb-2 '>
                <div className='col-span-7'>
                    <div className='grid grid-cols-3 gap-4'>
                        <div className='col-span-1 mt-4'>
                            <div className="p-1 border-[0.5px] border-gray-400 rounded-lg text-black bg-white flex items-center mt-5 md:mt-0 ">
                                <AiOutlineUsergroupAdd className="text-5xl text-blue-400 mx-2" />
                                <div className="">
                                    <p className="text-xl font-bold">{totalItem}</p>
                                    <p className="font-medium text-xs text-gray-300">Total Censor</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-1 mt-4'>
                            <div className="p-1 border-[0.5px] border-gray-400 rounded-lg text-black bg-white flex items-center mt-5 md:mt-0 ">
                                <LiaUserCheckSolid className="text-5xl text-blue-400 mx-2" />
                                <div className="">
                                    <p className="text-xl font-bold">{totalActive}</p>
                                    <p className="font-medium text-xs text-gray-300">Censor is active</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-span-5 '>
                    <form className="flex items-center justify-between mt-4 ">
                        <div className="flex w-[65%] bg-white rounded-lg border-[0.5px] border-gray-400">
                            <input
                                type="search"
                                className="w-full border-none bg-transparent px-4 py-1 text-gray-900 focus:outline-none rounded-lg "
                                placeholder="Search Organization Name"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button
                                className={`m-2 px-4 py-2 font-semibold text-gray-100 rounded-lg ${search ? "bg-blue-500" : "bg-gray-500 cursor-not-allowed"
                                    }`}
                                disabled={!search}
                            >
                                Search
                            </button>
                        </div>
                        <div className='w-[30%] bg-white '>
                            <Box sx={{ minWidth: 120 }} >
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={status}
                                        label="Status"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={'Processing'}>Processing</MenuItem>
                                        <MenuItem value={'Verified'}>Verified</MenuItem>
                                        <MenuItem value={'Rejected'}>Rejected</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                    </form>
                </div>
            </div>
            <div className="h-[82%] overflow-auto border bg-white py-2 px-2 rounded-md">
                <table className="min-w-full bg-white">
                    <thead className="bg-blue-50 whitespace-nowrap">
                        <tr className="font-medium text-left">
                            <th className="px-6 py-2 text-md font-semibold hover:text-[#007bff] cursor-pointer text-gray-700">
                                Organization Name
                            </th>
                            <th className="px-6 py-2 text-md font-semibold hover:text-[#007bff] cursor-pointer text-gray-700">
                                Image Organization
                            </th>
                            <th className="px-6 py-2 text-md font-semibold hover:text-[#007bff] cursor-pointer text-gray-700">
                                Company Tax Code
                            </th>
                            <th className="px-6 py-2 text-md font-semibold hover:text-[#007bff] cursor-pointer text-gray-700">
                                Phone Number
                            </th>
                            <th className="px-6 py-2 text-md font-semibold hover:text-[#007bff] cursor-pointer text-gray-700">
                                Status
                            </th>
                            <th className="px-6 py-2 text-md font-semibold hover:text-[#007bff] cursor-pointer text-gray-700">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="whitespace-nowrap">
                        {censors && censors.length > 0 ? (
                            censors?.map((item, index) => (
                                <tr
                                    className="hover:bg-gray-50 text-left odd:bg-gray-50 cursor-pointer"
                                    key={index}
                                >
                                    <td className="px-6 py-2 text-sm">{item?.name}</td>
                                    <td className="px-6 py-2">
                                        <img
                                            src={
                                                item?.avatarUrl ||
                                                "https://lh3.googleusercontent.com/proxy/isoli79kvQ3rAEkQZ0LdfZiqKvjkDl2-ZptWZypSU-ws3Y6UpnNrBlmxBAWukMwaJBuiecMlJuOMpMcXoc-h3DO4jFTHr_orhAOugIM3rQ"
                                            }
                                            alt={item?.name}
                                            className="w-14 h-14 rounded-lg"
                                        />
                                    </td>
                                    <td className="px-6 py-2 text-sm truncate max-w-2xl">
                                        {item?.companyTaxCode}
                                    </td>
                                    <td className="px-6 py-2 text-sm truncate max-w-2xl">
                                        {item?.phoneNumber}
                                    </td>

                                    <td className="px-6 py-2 text-sm">
                                        <span className={`w-[68px] block text-center py-0.5 font-semibold rounded text-xs ${item?.status === "Processing"
                                            ? "border-2 border-blue-500 text-blue-500"
                                            : item?.status === "Verified"
                                                ? "border-2 border-green-500 text-green-500"
                                                : "border-2 border-red-500 text-red-500"
                                            }`}
                                        >
                                            {item?.status === "Processing"
                                                ? "Processing"
                                                : item?.status === "Verified"
                                                    ? "Verified"
                                                    : "Rejected"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3">
                                        <button type="button"
                                            onClick={(e) => { handleViewDetail(item) }}
                                            className="py-2 w-full rounded-lg text-black text-sm tracking-wider border-2 border-blue-600 hover:bg-blue-400 hover:text-white"
                                        >View Detail</button>
                                        {
                                            modalOpenView && <CensorDetail modalOpen={setModalOpenView} censor={censorView} accessToken={accessToken} change={change} setChange={setChange} index={1} />
                                        }
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <div className="w-full mx-[150%] mt-[30%] flex justify-center items-center flex-col">
                                <img
                                    src={noDataSvg}
                                    alt="anh"
                                    className="w-52 h-52 text-primaryColor mr-8"
                                ></img>
                                <h2 className="text-xl font-medium mt-2 mb-2">
                                    There are no Censor
                                </h2>
                            </div>
                        )}
                    </tbody>
                </table>
            </div>

            <div className={`absolute bottom-2 left-0 right-0 ${censors && censors.length > 0 ? "grid place-items-center" : "hidden"}`}>
                <Pagination count={totalPages} color="primary" onChange={handlePageChange} />
            </div>
        </div>
    )
}

export default ApproveCensor

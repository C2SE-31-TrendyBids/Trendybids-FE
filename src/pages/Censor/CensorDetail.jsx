import React, {useEffect, useState} from 'react';
import Reveal from "../../components/Animate/Reveal";
import {FaLocationDot} from "react-icons/fa6";
import {FaStar} from "react-icons/fa";
import ProductItem from "../../components/Products/ProductItem";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useParams} from 'react-router-dom';
import * as censorServices from "../../services/censor";
import NotFound from "../../public/images/notFound.png";

const CensorDetail = () => {
    let {censorId} = useParams();
    const initialState = {censorId: censorId, limit: 6}
    const [sort, setSort] = React.useState('');
    const [state, setState] = React.useState(initialState);
    const [auctionSessions, setAuctionSession] = useState([]);
    const [censors, setCensors] = useState([])
    const [search, setSearch] = useState("")

    const fetchCensors = async () => {
        const responseCensor = await censorServices.getCensors({id: censorId})
        responseCensor?.status === 200 && setCensors(responseCensor?.data?.censors[0])
    }

    const fetchAuctionSession = async () => {
        const responseCensor = await censorServices.getAuctionSession(state)
        responseCensor?.status === 200 && setAuctionSession(responseCensor?.data?.productAuctions)
    }
    useEffect(() => {
        fetchCensors()
    }, [])

    useEffect(() => {
        fetchAuctionSession()
    }, [state])


    const handleChange = (event) => {
        console.log(event.target.value)
        const newSort = event.target.value
        setSort(newSort);
        if (sort !== "None" && sort !== "")
            setState(prevState => ({...prevState, orderProduct: newSort}))
        console.log(state)
    };

    const handleSearch = () => {
        setState(prevState => ({...prevState, productName: search}))
    }


    return (
        <>
            <div className="relative h-[400px] w-full mb-10">
                <img className="h-full w-full object-cover"
                     src="https://1.bp.blogspot.com/-YR-sT7AVJFY/YT3KpuJRPBI/AAAAAAAAH0A/b8NdXw-1c4oKH1BODi-rCIBvmE3BY8MnQCLcBGAsYHQ/s0-rw/bo-hinh-nen-phong-canh-chat-luong-cao-full-hd-dep-nhat-34.jpg"
                     alt="Background"/>
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#485367]/70"></div>
                <div
                    className="absolute left-0 right-0 bottom-1/2 translate-y-1/2 md:bottom-12  ">
                    <div className="max-w-[1200px] px-10 mx-auto">
                        <div
                            className="flex flex-col justify-between items-center md:flex-row md:items-end">
                            <div className="flex flex-col justify-center items-center md:flex-row md:justify-start md:items-end gap-4">
                                <div className="w-9 h-9 md:w-16 md:h-16 rounded-full p-[1.3px] bg-white mr-2">
                                    <img className="w-full h-full object-cover rounded-full"
                                         src={censors?.avatarUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPyGNr2qL63Sfugk2Z1-KBEwMGOfycBribew&usqp=CAU"}
                                         alt={censors?.name || ""}/>
                                </div>
                                <p className="text-white flex items-center  lg:mr-6"><FaLocationDot
                                    className="text-white mr-2 mb-1" size={20}/>{censors?.address || "No Address"}</p>
                                <p className="text-white flex items-center"><FaStar className="mr-2 mb-1 text-yellow-300"
                                                                                    size={20}/>4.80
                                    rating from 5 review</p>
                            </div>
                            <p className="md:ml-10 lg:ml-48 text-lg text-white font-medium">{censors?.name || "No Address"}</p>
                        </div>
                    </div>
                </div>
            </div>

            <Reveal
                children={
                    <div className="">
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <p className="text-xm font-medium text-center text-[#0033FF] mb-1">Product</p>
                                <div className="w-full h-[2px] bg-[#0033FF]"></div>
                            </div>
                            <div>
                                <p className="text-xm font-medium text-center text-[#0033FF] mb-1">Contact</p>
                                <div className="w-full h-[2px] bg-[#0033FF]"></div>
                            </div>
                        </div>
                        <div className="grid grid-cols-12 gap-4 mt-6">
                            <div className="col-span-12 lg:col-span-9">
                                <div className="flex items-center justify-between gap-5">
                                    <form className="flex items-center gap-2">
                                        <TextField
                                            label="Search"
                                            id="outlined-size-small"
                                            size="small"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                        />
                                        <Button variant="contained"
                                                onClick={handleSearch}
                                                size="normal">Search</Button>
                                    </form>
                                    <FormControl className="w-60">
                                        <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={sort}
                                            label="Sort"
                                            size="small"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={"None"}>Default sorting</MenuItem>
                                            <MenuItem value={"price_ASC"}>Sort by Price Increasing</MenuItem>
                                            <MenuItem value={"price_DESC"}>Sort by Price Descending</MenuItem>
                                            <MenuItem value={"productName_ASC"}>Sort by Name A - Z</MenuItem>
                                            <MenuItem value={"productName_DESC"}>Sort by Name Z - A</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                                    {
                                        auctionSessions?.length > 0 ? (auctionSessions.map((item, index) => {
                                            return (
                                                <ProductItem key={item?.id} infoAuction={item}/>
                                            )

                                        })) : <div
                                            className="col-span-1 md:col-span-2  lg:col-span-3 w-full flex items-center justify-center mt-14">
                                            <img
                                                className="w-60 h-60 object-cover"
                                                src={NotFound}
                                                alt="NotFound"
                                            />
                                        </div>
                                    }
                                </div>

                            </div>
                            <div className="col-span-12 lg:col-span-3">
                                <div className="p-5 bg-[#F4F5FC] mb-6">
                                    <h3 className="text-xl font-semibold text-[#0F0000]">Contact Censor</h3>
                                    <p className="text-xm font-normal text-[#79787A] mb-5">Your Name</p>
                                    <p className="text-xm font-normal text-[#79787A]">your@excample.com</p>
                                    <textarea className="h-20 mt-3 w-full outline-none" name="content..." id=""
                                              cols="30"
                                              rows="10"></textarea>
                                </div>
                                <div className="p-5 bg-[#F4F5FC] mb-6">
                                    <h3 className="text-xl font-semibold text-[#0F0000]">Store Product
                                        Category</h3>
                                    <ul className="mt-4">
                                        <li className="text-xm font-normal text-[#444444] mb-1">
                                            Gaming
                                        </li>
                                        <li className="text-xm font-normal text-[#444444] mb-1">
                                            Electronics
                                        </li>
                                        <li className="text-xm font-normal text-[#444444] mb-1">
                                            Sneakers
                                        </li>
                                        <li className="text-xm font-normal text-[#444444] mb-1">
                                            Vehicles
                                        </li>
                                        <li className="text-xm font-normal text-[#444444] mb-1">
                                            Antiques
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            />
        </>
    )
}

export default CensorDetail
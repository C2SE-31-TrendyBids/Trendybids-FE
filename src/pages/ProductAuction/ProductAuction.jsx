import React, { useEffect, useState } from 'react'
import Panner from '../../public/images/panner_product.jpg'
import { IoSearchSharp } from "react-icons/io5";
import ProductItem from '../../components/Products/ProductItem';
import { RiArrowDropDownLine } from "react-icons/ri";
import Pagination from '@mui/material/Pagination';
import * as censorApi from '../../services/censor'
import * as categoryApi from '../../services/category'
import Reveal from "../../components/Animate/Reveal";
import { IoCaretForwardOutline } from "react-icons/io5";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
    return `${value}`;
}

const ProductAuction = () => {
    const [productAuctions, setProductAuctions] = useState([])

    const [totalPage, setTotalPage] = useState(1)
    const [pageNumber, setPageNumber] = useState(1)
    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [sortBy, setSortBy] = useState('');
    const [type, setType] = useState('');
    const [nameProduct, setNameProduct] = useState('')
    const [isChangeFilter, setIsChangeFilter] = useState(false)

    const [comingSoon, setComingSoon] = useState([])
    const [auctionEnded, setAuctionEnded] = useState([])
    const [value, setValue] = useState([0, 10000]);

    const [priceFrom, setPriceFrom] = useState(0)
    const [priceTo, setPriceTo] = useState(0)

    const handleSortByChange = (event) => {
        setSortBy(event.target.value);
    };
    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    useEffect(() => {
        try {
            const fetchApi = async () => {
                let params = { page: pageNumber, limit: 12 };
                if (categoryId !== '') {
                    params.categoryId = categoryId;
                    setIsChangeFilter(true)
                }
                if (sortBy !== '' && type !== '') {
                    params.order = [sortBy, type];
                    setIsChangeFilter(true)
                }
                if (nameProduct !== '') {
                    params.productName = nameProduct
                    setIsChangeFilter(true)
                }
                if (priceTo !== 0 && priceFrom < priceTo) {
                    params.priceTo = priceTo;
                    params.priceFrom = priceFrom
                    setIsChangeFilter(true)
                }
                const productAuctionData = await censorApi.getProductAuction(params);
                setProductAuctions(productAuctionData.data);
                setTotalPage(productAuctionData.totalPages);
            };
            fetchApi();
        } catch (error) {
            console.log(error);
        }
    }, [pageNumber, categoryId, sortBy, type, nameProduct, priceFrom, priceTo]);

    useEffect(() => {
        const fetchCategory = async () => {
            const categoryData = await categoryApi.getAllCategory();
            const comingSoonData = await censorApi.getProductAuction({ limit: 3, order: ['startTime', 'DESC'] })
            const auctionEndedData = await censorApi.getProductAuction({ limit: 3, status: 'ended' })
        
            setCategories(categoryData.response.categorys)
            setComingSoon(comingSoonData.data)
            setAuctionEnded(auctionEndedData.data)
        }
        fetchCategory()
        console.log(auctionEnded);
    }, [])

    const handlePageChange = (event, page) => {
        setPageNumber(page);
    };
    const clearFilters = () => {
        setCategoryId('');
        setSortBy('');
        setType('');
        setNameProduct('')
        setPriceFrom(0)
        setPriceTo(0)
        setValue([0, 0])
        setIsChangeFilter(false)
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setPriceFrom(newValue[0])
        setPriceTo(newValue[1])
    };


    return (
        <div className='w-full h-full'>
            <div className='relative'>
                <img src={Panner} alt="" />
                <div className='absolute top-[10%] left-[15%] font-semibold text-3xl'>
                    <Reveal
                        children={
                            <>
                                <h1 className="hidden md:block text-4xl font-bold mb-5">Auction products<br />
                                    Please select the product you want</h1>
                                <h1 className='font-semibold text-center text-blue-500'>TrendyBids</h1>
                                <div className="hidden lg:flex mt-7 items-center gap-2">
                                    <div className="bg-red-500 p-1 rounded-full">
                                        <button className=" hover:animate-ping bg-red-500 p-2 rounded-full">
                                            <IoCaretForwardOutline className="text-white" size={25} />
                                        </button>
                                    </div>
                                    <h4 className=" uppercase text-[14px] font-medium">We are running our
                                        summer
                                        discount<br></br>
                                        Watch video to learn more</h4>
                                </div>
                            </>
                        }
                    />
                </div>
            </div>
            <div className='max-w-[1230px] px-[30px] mt-8 mx-auto'>
                <div className='grid grid-cols-12 gap-4'>
                    <div className='hidden col-span-3 lg:block '>
                        <div className=' bg-gray-200 rounded-lg'>
                            <div className=' text-center pt-4'>
                                <span className=' text-xl font-bold'>Product categories</span>
                            </div>
                            <div className='ml-[10%]'>
                                {categories?.map((item) => {
                                    return (
                                        <>
                                            <button className='px-10 py-2 text-blue-500 hover:text-black' onClick={() => setCategoryId(item.id)}>{item.name}</button>
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                        <div className=' mt-4 bg-gray-200 rounded-lg'>
                            <div className=' text-center pt-4'>
                                <span className=' text-xl font-bold'>Filter By Price</span>
                            </div>
                            <div className='flex items-center justify-center my-2'>
                                <Box sx={{ width: 250 }}>
                                    <Slider
                                        max={1000}
                                        min={0}
                                        aria-label="Temperature range"
                                        value={value}
                                        onChange={handleChange}
                                        valueLabelDisplay="auto"
                                        getAriaValueText={valuetext}
                                    />
                                </Box>
                            </div>
                            <div className='flex justify-end '>
                                <span className='mr-2 mb-3 font-semibold'> Price : $0  - $10000 </span>
                            </div>
                        </div>
                        <div className='bg-gray-200 rounded-lg mt-4'>
                            <div className=' text-center pt-4'>
                                <span className=' text-xl font-bold'>Auction is coming soon</span>
                            </div>
                            <div className='ml-[10%] mt-4 pb-4'>
                                {comingSoon?.map((item) => {
                                    return (
                                        <div className='flex items-start'>
                                            <div className='border w-16 h-16'>
                                                <img src={item?.product?.prdImages[0]?.prdImageURL} alt="abc" className='object-cover' />
                                            </div>
                                            <div className='ml-4 mt-2'>
                                                <span className='block text-sm font-semibold'>{item.product.productName}</span>
                                                <span className='text-sm font-semibold'>${item.product.startingPrice}</span>
                                            </div>
                                        </div>
                                    )
                                })}

                                <div className='flex items-end justify-end mt-2 mr-2 text-blue-500'>
                                    <button>See more ...</button>
                                </div>
                            </div>
                        </div>
                        <div className=' bg-gray-200 rounded-lg mt-6'>
                            <div className=' text-center pt-4'>
                                <span className=' text-xl font-bold'>Auction has ended</span>
                            </div>
                            <div className='ml-[10%] mt-4 pb-4'>
                                {auctionEnded?.map((item) => {
                                    return (
                                        <div className='flex items-start'>
                                            <div className='border w-16 h-16'>
                                                <img src={item.product.prdImages[0].prdImageURL} alt="abc" className='object-cover' />
                                            </div>
                                            <div className='ml-4 mt-2'>
                                                <span className='block text-sm font-semibold'>{item.product.productName}</span>
                                                <span className='text-sm font-semibold animate-bounce'>${item.product.startingPrice}</span>
                                            </div>
                                        </div>

                                    )
                                })}

                                <div className='flex items-end justify-end mt-2 mr-2 text-blue-500'>
                                    <button>See more ...</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-12 lg:col-span-9 '>
                        <div className='flex justify-center sm:justify-between mb-4'>
                            <div class="relative inline-flex text-gray-600 ">
                                <input class="border-2 border-gray-300 bg-white h-10 px-20 rounded-lg text-sm focus:outline-none"
                                    type="search" name="search" placeholder="Search Product" value={nameProduct} onChange={(e) => { setNameProduct(e.target.value) }} />
                                <button type="submit" class="absolute right-0 top-3 mr-4">
                                    <IoSearchSharp />
                                </button>
                            </div>

                            <div className="hidden sm:flex sm:justify-end ">
                                <div className='flex items-center justify-center'>
                                    <button onClick={() => { clearFilters() }} className={`${isChangeFilter ? "block" : "hidden"} border px-2 rounded-xl bg-blue-400 text-white text-sm`}>Clear All</button>
                                </div>
                                <div className="relative w-[40%] mr-4">
                                    <RiArrowDropDownLine className='text-3xl absolute top-1 right-0' />
                                    <select
                                        className="border-2 border-gray-300 rounded-lg text-gray-600 h-10 w-full mx-auto px-5 max-sm:px-5 max-md:px-8 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                                        value={sortBy}
                                        onChange={handleSortByChange}
                                    >
                                        <option value="">Sort by</option>
                                        <option value="startingPrice">Starting price</option>
                                        <option value="numberOfParticipation">Number of people participating</option>
                                        <option value="startTime">Start time</option>
                                    </select>
                                </div>
                                <div className="relative w-[20%]">
                                    <RiArrowDropDownLine className='text-3xl absolute top-1 right-0' />
                                    <select
                                        className="border-2 border-gray-300 rounded-lg text-gray-600 h-10 w-full px-2 max-sm:px-5 max-md:px-8 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                                        value={type}
                                        onChange={handleTypeChange}
                                    >
                                        <option value="">Type</option>
                                        <option value="ASC">Ascending</option>
                                        <option value="DESC">Decreasing</option>
                                    </select>
                                </div>

                            </div>
                        </div>
                        <div className='grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4  '>
                            {(productAuctions).map((item, index) => (
                                <ProductItem infoAuction={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-center mt-4'>
                <Pagination count={totalPage} color="primary" onChange={handlePageChange} />
            </div>
        </div >
    )
}

export default ProductAuction

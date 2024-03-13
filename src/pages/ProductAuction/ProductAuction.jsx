import React, { useEffect, useState } from 'react'
import Panner from '../../public/images/panner_product.jpg'
import { IoSearchSharp } from "react-icons/io5";
import ProductItem from '../../components/Products/ProductItem';
import { RiArrowDropDownLine } from "react-icons/ri";
import Pagination from '@mui/material/Pagination';
import * as censorApi from '../../services/censor'
import * as categoryApi from '../../services/category'


const ProductAuction = () => {
    const [productAuctions, setProductAuctions] = useState([])

    const [totalPage, setTotalPage] = useState(1)
    const [pageNumber, setPageNumber] = useState(1)
    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [sortBy, setSortBy] = useState('');
    const [type, setType] = useState('');
    const [isChangeFilter, setIsChangeFilter] = useState(false)

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
                const productAuctionData = await censorApi.getProductAuction(params);
                setProductAuctions(productAuctionData.data);
                setTotalPage(productAuctionData.totalPages);
            };
            fetchApi();
        } catch (error) {
            console.log(error);
        }
    }, [pageNumber, categoryId, sortBy, type]);

    useEffect(() => {
        const fetchCategory = async () => {
            const categoryData = await categoryApi.getAllCategory();
            setCategories(categoryData)
        }
        fetchCategory()
    }, [])

    const handlePageChange = (event, page) => {
        setPageNumber(page);
    };
    const clearFilters = () => {
        setCategoryId('');
        setSortBy('');
        setType('');
        setIsChangeFilter(false)
    };
    return (
        <div className='w-full h-full'>
            <div className='relative'>
                <img src={Panner} alt="" />
                <span className='absolute top-1/2 left-[15%] font-semibold text-3xl'>
                    PRODUCT AUCTION
                </span>
            </div>
            <div className='flex items-center justify-center mt-8'>
                <div className='w-4/5 grid grid-cols-2'>
                    <div className=" flex items-end justify-end">
                        <div class="relative inline-flex text-gray-600 ">
                            <input class="border-2 border-gray-300 bg-white h-10 px-20 ml-6 rounded-lg text-sm focus:outline-none"
                                type="search" name="search" placeholder="Search Product" />
                            <button type="submit" class="absolute right-0 top-3 mr-4">
                                <IoSearchSharp />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-end justify-end">
                        <div className="relative inline-flex w-[40%]">
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
                        <div className="relative inline-flex w-[20%]">
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
                        <div>
                            {isChangeFilter && <button onClick={() => { clearFilters() }} className='border px-2 rounded-xl bg-blue-400 text-white text-[10px]'>Clear All</button>}
                        </div>
                    </div>
                </div>
            </div >
            <div className='flex items-center justify-center mt-8'>
                <div className='w-4/5 flex max-lg:flex max-lg:items-center max-lg:justify-center'>
                    <div className='w-1/4 max-lg:hidden'>
                        <div className='w-[95%] bg-gray-200 rounded-lg'>
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
                        <div className='w-[95%] bg-gray-200 rounded-lg mt-7'>
                            <div className=' text-center pt-4'>
                                <span className=' text-xl font-bold'>Auction is coming soon</span>
                            </div>
                            <div className='ml-[10%] mt-4 pb-4'>
                                <div className='flex items-start'>
                                    <div className='border w-16 h-16 bg-red-400'>

                                    </div>
                                    <div className='ml-4 mt-2'>
                                        <span className='block'>Product Name</span>
                                        <span>Product price</span>
                                    </div>
                                </div>
                                <div className='flex items-start mt-4'>
                                    <div className='border w-16 h-16 bg-red-400'>

                                    </div>
                                    <div className='ml-4 mt-2'>
                                        <span className='block'>Product Name</span>
                                        <span>Product price</span>
                                    </div>
                                </div>
                                <div className='flex items-start mt-4'>
                                    <div className='border w-16 h-16 bg-red-400'>

                                    </div>
                                    <div className='ml-4 mt-2'>
                                        <span className='block'>Product Name</span>
                                        <span>Product price</span>
                                    </div>
                                </div>
                                <div className='flex items-end justify-end mt-2 mr-2 text-blue-500'>
                                    <button>See more ...</button>
                                </div>
                            </div>
                        </div>
                        <div className='w-[95%] bg-gray-200 rounded-lg mt-6'>
                            <div className=' text-center pt-4'>
                                <span className=' text-xl font-bold'>Auction has ended</span>
                            </div>
                            <div className='ml-[10%] mt-4 pb-4'>
                                <div className='flex items-start'>
                                    <div className='border w-16 h-16 bg-red-400'>

                                    </div>
                                    <div className='ml-4 mt-2'>
                                        <span className='block'>Product Name</span>
                                        <span>Product price</span>
                                    </div>
                                </div>
                                <div className='flex items-start mt-4'>
                                    <div className='border w-16 h-16 bg-red-400'>

                                    </div>
                                    <div className='ml-4 mt-2'>
                                        <span className='block'>Product Name</span>
                                        <span>Product price</span>
                                    </div>
                                </div>
                                <div className='flex items-start mt-4'>
                                    <div className='border w-16 h-16 bg-red-400'>

                                    </div>
                                    <div className='ml-4 mt-2'>
                                        <span className='block'>Product Name</span>
                                        <span>Product price</span>
                                    </div>
                                </div>
                                <div className='flex items-end justify-end mt-2 mr-2 text-blue-500'>
                                    <button>See more ...</button>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='w-3/4 h-auto '>
                        <div className='grid grid-cols-3 gap-4 max-sm:grid-cols-1 max-md:grid-cols-2 '>
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

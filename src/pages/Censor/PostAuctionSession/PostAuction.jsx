import React, { useEffect, useState } from 'react';
import { RiArrowDropDownLine } from "react-icons/ri";
import * as productApi from '../../../services/product'
import ModalPost from './ModalPost';
import ViewDetail from '../ApproveProduct/ViewDetail';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Pagination } from '@mui/material';


const PostAuction = () => {
    const [products, setProducts] = useState([]);
    const [nameProduct, setNameProduct] = useState('')
    const [isChangeFilter, setIsChangeFilter] = useState(false)
    const [sortBy, setSortBy] = useState('');
    const [type, setType] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpenView, setModalOpenView] = useState(false);

    const [productId, setProductId] = useState('');
    const [productView, setProductView] = useState('');


    const [totalPage, setTotalPage] = useState(1)
    const [pageNumber, setPageNumber] = useState(1)
    const handlePageChange = (event, page) => {
        setPageNumber(page);
    };
    const accessToken = localStorage.getItem('access-token');
    const handleSortByChange = (event) => {
        setSortBy(event.target.value);
    };
    const handleTypeChange = (event) => {
        setType(event.target.value);
    };
    useEffect(() => {
        try {
            let params = { page: pageNumber, limit: 8, status: 'Verified' };
            if (nameProduct !== '') {
                params.productName = nameProduct
                setIsChangeFilter(true)
            }
            if (sortBy !== '' && type !== '') {
                params.order = [sortBy, type];
                setIsChangeFilter(true)
            }
            const fetchDataProduct = async () => {
                const dataProduct = await productApi.getAllProduct(accessToken, params)
                setProducts(dataProduct?.response?.products)
                setTotalPage(dataProduct?.totalPages)
            }
            if (accessToken) {
                fetchDataProduct();
            }
        } catch (error) {
            console.log(error);
        }

    }, [accessToken, nameProduct, sortBy, type, pageNumber])

    const handlePostAuction = (id) => {
        setProductId(id)
        setModalOpen(true)
    }

    const handleViewDetail = (product) => {
        setProductView(product)
        setModalOpenView(true)
    }

    const clearFilters = () => {
        setSortBy('');
        setType('');
        setNameProduct('')
        setIsChangeFilter(false)
    };

    return (
        <div className='max-w-[1230px] px-[30px] mx-auto '>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 mb-2'>
                <div class="inline-flex text-gray-600 ">
                    <input class="border-2 border-gray-300 bg-white h-10 px-20 rounded-lg text-sm focus:outline-none"
                        type="search" name="search" placeholder="Search Product" value={nameProduct} onChange={(e) => { setNameProduct(e.target.value) }} />
                </div>
                <div className='w-full hidden lg:flex lg:items-center lg:justify-center'>
                    <h1 className='text-[20px] font-extrabold text-[#007bff]'>Manage verified auction products
                    </h1>
                </div>
                <div className="hidden md:flex md:justify-end ">
                    <div className='flex items-center justify-center'>
                        <button onClick={() => { clearFilters() }} className={`${isChangeFilter ? "block" : "hidden"}  px-2 rounded-xl  text-red-500 text-2xl`}><MdOutlineDeleteOutline /></button>
                    </div>
                    <div className="relative w-[60%] mr-4">
                        <RiArrowDropDownLine className='text-3xl absolute top-1 right-0' />
                        <select
                            className="border-2 border-gray-300 rounded-lg text-gray-600 h-10 w-full mx-auto px-5 max-sm:px-5 max-md:px-8 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                            value={sortBy}
                            onChange={handleSortByChange}
                        >
                            <option value="">Sort by</option>
                            <option value="startingPrice">Starting price</option>
                            {/* <option value="startTime">Start time</option> */}
                        </select>
                    </div>
                    <div className="relative w-[30%]">
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
            <div className="h-[600px] max-w-full overflow-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 border bg-white p-2 rounded-md no-scrollbar">
                {products?.map((item, index) => (
                    <div key={index} className="bg-white shadow-[0_8px_12px_-6px_rgba(0,0,0,0.2)] border p-2 w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
                        <div className='w-full flex items-center justify-center'>
                            <img src={item?.prdImages[0]?.prdImageURL} alt={item?.productName} className="w-3/4 h-32 rounded-lg" />
                        </div>
                        <div className="px-4 my-4 text-center">
                            <h3 className="text-base font-semibold">{item?.productName}</h3>
                            <p className='text-sm'>Starting Price : {item?.startingPrice}</p>
                            <div className='flex items-center justify-between mt-2'>
                                <button type="button"
                                    onClick={(e) => { handleViewDetail(item) }}
                                    className="py-2 w-[48%] rounded-full text-black text-sm tracking-wider border-2 border-green-600 hover:bg-green-600 hover:text-white"
                                >View Detail</button>
                                <button type="button"
                                    className=" py-2 w-[48%] rounded-full text-black text-sm tracking-wider font-medium outline-none border-2 border-orange-600 hover:bg-orange-600 hover:text-white "
                                    onClick={() => handlePostAuction(item?.id)}>Post Auction</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex items-center justify-center mt-4'>
                <Pagination count={totalPage} color="primary" onChange={handlePageChange} />
            </div>

            {
                modalOpen && <ModalPost modalOpen={setModalOpen} productId={productId} accessToken={accessToken} />
            }
            {
                modalOpenView && <ViewDetail modalOpen={setModalOpenView} product={productView} accessToken={null} change={null} setChange={null} index={1} />
            }
        </div>
    )
}

export default PostAuction;

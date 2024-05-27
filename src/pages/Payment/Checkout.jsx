import React, { useContext, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import ModalPay from './ModalPay'
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import * as userApi from "../../services/user";
import AuthContext from "../../context/authProvider";
import { toast } from "sonner";
import moment from "moment";
import { useNavigate } from 'react-router-dom';

const Checkout = ({ productAuction }) => {
    const accessToken = localStorage.getItem('access-token');
    const location = useLocation();
    const item = location.state?.item;
    const user = JSON.parse(localStorage.getItem("auth"));
    const [name, setName] = useState(user?.fullName || 'No Information')
    const [address, setAddress] = useState(user?.address || 'No Information')
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || 'No Information')
    const [openPayment, setOpenPayment] = useState(false);
    const [statusPayment, setStatusPayment] = useState(false);
    const [totalPrice, setTotalPrice] = useState('');
    const shippingPrice = 2
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(item);
    const handleSaveUserInformation = async () => {
        const formData = {
            fullName: name,
            phoneNumber: phoneNumber,
            address: address,
        };
        try {
            const userEdit = await userApi.editUser(
                accessToken,
                auth?.id,
                formData
            );
            localStorage.setItem("auth", JSON.stringify({ ...formData }));
            toast.success("User Data Updated Successfully", userEdit.response);
            handleClose()
        } catch (error) {
            toast.error("Error updating user data", error);
        }
    }
    useEffect(() => {
        const calculatedPrice = parseFloat(
            parseFloat(item?.highestPrice) +
            shippingPrice +
            (parseFloat(item?.highestPrice) * 0.5 / 100) -
            parseFloat(item?.product?.startingPrice)
        ).toFixed(2);
        setTotalPrice(parseFloat(calculatedPrice));
    }, [item, shippingPrice]);
    useEffect(() => {
        if (statusPayment) {
            navigate('/dashboard')
        }
    }, [statusPayment])
    const handleOpenPayment = () => {
        if (name !== 'No Information' && phoneNumber !== 'No Information' && address !== 'No Information') {
            setOpenPayment(true)
        }
        else {
            toast.error("You have not filled in all user information")
        }
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return (
        <div className="max-w-[1230px] mx-auto px-[30px] mt-2">
            <div className="w-full">
                <div className="flex items-center text-red-500 font-bold">
                    <MdOutlineShoppingCartCheckout className="text-6xl" />
                    <span className="ml-4 text-4xl">CHECKOUT</span>
                </div>
            </div>
            <div className="w-full grid grid-cols-12 gap-4 mt-2">
                <div className="col-span-8">
                    <div className="w-full border rounded-lg shadow-md py-2">
                        <div className="text-lg font-semibold ml-2 text-blue-600">USER INFORMATION </div>
                        <div className="mt-2 ml-4 text-base font-semibold w-[80%] ">
                            <div className="flex items-center justify-between m-2">
                                <span>Full Name : {name}</span>
                                <span className="ml-4">Phone Number : {phoneNumber}</span>
                            </div>
                            <span className="mt-2 ml-2">Address : {address}</span>
                        </div>
                        <div className="text-end mr-6 text-sm text-blue-600 font-semibold">
                            <button className="px-2 py-1 hover:text-blue-800" onClick={handleOpen}>Edit</button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <div>
                                        <div className="text-center text-xl font-semibold text-blue-600">
                                            EDIT USER INFORMATION
                                        </div>
                                        <div className="mb-1 font-semibold text-lg">Full Name</div>
                                        <input type="text" className="w-full border-2 border-gray-400 p-2 ml-2 mb-2 rounded-lg outline-none" value={name} onChange={(e) => setName(e.target.value)} />
                                        <div className="mb-1 font-semibold text-lg">Phone Number</div>
                                        <input type="text" className="w-full border-2 border-gray-400 p-2 ml-2 mb-2 rounded-lg outline-none" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                        <div className="mb-1 font-semibold text-lg">Address</div>
                                        <input type="text" className="w-full border-2 border-gray-400 p-2 ml-2 mb-2 rounded-lg outline-none" value={address} onChange={(e) => setAddress(e.target.value)} />
                                        <div className="flex items-center justify-between mt-4">
                                            <button className="px-6 w-48 py-2 ml-2 border rounded-lg bg-blue-600 text-white mb-2 font-semibold hover:bg-blue-800" onClick={(e) => handleSaveUserInformation()}>SAVE</button>
                                            <button className="px-6 w-48 py-2 border rounded-lg bg-red-600 text-white mb-2 font-semibold hover:bg-red-800"
                                            onClick={handleClose}
                                            >CANCEl</button>

                                        </div>
                                    </div>
                                </Box>
                            </Modal>
                        </div>
                    </div>
                    <div className="w-full border rounded-lg my-4 shadow-lg">
                        <div className="text-lg ml-2 font-semibold mt-2 text-blue-600">PRODUCT AUCTION INFORMATION </div>
                        <div className="grid grid-cols-3 gap-4 my-2 ">
                            <div className="col-span-1 flex items-center justify-center">
                                <div className=" w-56 h-64 flex items-center">
                                    <img src={item?.product?.prdImages[0]?.prdImageURL} alt="product" />
                                </div>
                            </div>
                            <div className="col-span-1 text-lg font-semibold mt-4">
                                <div className="mb-4 ">Product Name :</div>
                                <div className="mb-4 ">Highest price :</div>
                                <div className="mb-4 ">Start time :</div>
                                <div className="mb-4 ">End time :</div>
                                <div className="mb-4 ">Owner of product :</div>
                                <div className="mb-4 ">Organize auctions :</div>
                            </div>
                            <div className="col-span-1 text-lg font-semibold mt-4">
                                <div className="mb-4 ">{item?.product?.productName}</div>
                                <div className="mb-4 ">$ {item?.highestPrice}</div>
                                <div className="mb-4 ">{moment(item?.startTime).format('DD/MM/YYYY hh:mm ')}</div>
                                <div className="mb-4 ">{moment(item?.endTime).format('DD/MM/YYYY hh:mm ') || "Null"}</div>
                                <div className="mb-4 ">{item?.product?.owner?.fullName}</div>
                                <div className="mb-4 ">{item?.censor?.name}</div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-span-4">
                    <div className="border pb-4 rounded-lg shadow-lg border-blue-300 shadow-blue-100">
                        <div className="text-center text-xl font-semibold mt-2 text-blue-600">
                            ORDERS SUMMARY
                        </div>
                        <div className="grid grid-cols-2 gap-2 pb-4 border-b-4 mx-4 font-semibold">
                            <div className="col-span-1">
                                <div className="mt-2 ml-10 text-base">Subtotal :</div>
                                <div className="mt-2 ml-10 text-base">Shipping :</div>
                                <div className="mt-2 ml-10 text-base">Tax :</div>
                                <div className="mt-2 ml-10 text-base">Risk : </div>
                            </div>
                            <div className="col-span-1 text-base">
                                <div className="mt-2 ml-10">${item?.highestPrice}</div>
                                <div className="mt-2 ml-10">${shippingPrice}</div>
                                <div className="mt-2 ml-10">${(item?.highestPrice) * 0.5 / 100}</div>
                                <div className="mt-2 ml-10">${item?.product?.startingPrice}</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mx-4 my-2 font-bold text-xl">
                            <div className="ml-8">
                                TOTAL
                            </div>
                            <div className="mr-16">
                                $ {totalPrice}
                            </div>

                        </div>
                        <div className="flex items-center justify-center mt-10">
                            <button className="mx-4 py-3 w-full border-2 rounded-lg font-bold text-white text-2xl bg-[#FF3366] hover:bg-[#FF3399] " onClick={(e) => { handleOpenPayment() }}>PAYMENT</button>
                            {
                                openPayment && <ModalPay modalOpen={setOpenPayment} amount={totalPrice} accessToken={accessToken} setStatus={setStatusPayment} status={statusPayment} index={4} receiverId={item?.censor?.id} auctionId={item?.id} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Checkout

import React, { useState } from "react";
import ModalPay from './ModalPay'
const Checkout = () => {
    const accessToken = localStorage.getItem('access-token');
    const user = JSON.parse(localStorage.getItem("auth"));
    const [name, setName] = useState(user?.fullName || 'No Information')
    const [address, setAddress] = useState(user?.address || 'No Information')
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || 'No Information')
    const [openPayment, setOpenPayment] = useState(false);
    const [statusPayment, setStatusPayment] = useState(false);


    return (
        <div className="max-w-[1230px] mx-auto px-[30px] mt-10">
            <div className="w-full grid grid-cols-12 gap-4">
                <div className="col-span-8">
                    <div className="w-full border rounded-lg shadow-md">
                        <div className="text-center text-2xl font-semibold mt-2 text-blue-600">USER INFORMATION </div>
                        <div className="flex items-center justify-between font-semibold text-xl m-2">
                            <div className="w-[48%]">
                                <div className="ml-4 mb-2">Full Name</div>
                                <input type="text" className="w-full border-2 border-gray-400 p-3 ml-2 rounded-lg outline-none" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="w-[48%]">
                                <div className="ml-4 mb-2">Phone Number</div>
                                <input type="text" className="w-full border-2 border-gray-400 p-3 mr-2 rounded-lg outline-none" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                            </div>
                        </div>
                        <div className="mb-4 text-xl font-semibold ">
                            <div className="ml-4 mb-2">Address</div>
                            <input type="text" className="w-[97%] border-2 border-gray-400 outline-none  p-3 ml-3 rounded-lg" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <div className="text-end">
                            <button className="px-6 py-2 border rounded-lg bg-blue-600 text-white mr-10 mb-2 font-semibold hover:bg-blue-800">SAVE</button>
                        </div>
                    </div>
                    <div className="w-full border rounded-lg my-4 shadow-lg">
                        <div className="text-center text-2xl font-semibold mt-2 text-blue-600">PRODUCT AUCTION INFORMATION </div>
                        <div className="grid grid-cols-3 gap-4 my-10 ">
                            <div className="col-span-1 flex items-center justify-center">
                                <div className=" w-56 h-64 border">

                                </div>
                            </div>
                            <div className="col-span-1 text-xl font-semibold">
                                <div className="mb-3 ">Product Name</div>
                                <div className="mb-3 ">Highest price</div>
                                <div className="mb-3 ">Start time</div>
                                <div className="mb-3 ">End time</div>
                                <div className="mb-3 ">Owner of product</div>
                                <div className="mb-3 ">Organize auctions</div>
                            </div>
                            <div className="col-span-1 text-xl font-semibold">
                                <div className="mb-3 ">Son limited</div>
                                <div className="mb-3 ">$123456</div>
                                <div className="mb-3 ">01/05/2024 11:30</div>
                                <div className="mb-3 ">02/05/2024 11:30</div>
                                <div className="mb-3 ">Lieu Thien Quang</div>
                                <div className="mb-3 ">THIENQUANGCOMPANY</div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-span-4">
                    <div className="border pb-4 rounded-lg shadow-lg border-blue-300 shadow-blue-100">
                        <div className="text-center text-2xl font-semibold mt-2 text-blue-600">
                            Orders summary
                        </div>
                        <div className="grid grid-cols-2 gap-2 pb-4 border-b-4 mx-4 font-semibold">
                            <div className="col-span-1">
                                <div className="mt-2 ml-10 text-xl">Subtotal :</div>
                                <div className="mt-2 ml-10 text-xl">Shipping :</div>
                                <div className="mt-2 ml-10 text-xl">Tax :</div>
                                <div className="mt-2 ml-10 text-xl">Risk : </div>
                            </div>
                            <div className="col-span-1 text-xl">
                                <div className="mt-2 ml-10">$3000</div>
                                <div className="mt-2 ml-10">$5</div>
                                <div className="mt-2 ml-10">$5</div>
                                <div className="mt-2 ml-10">$5</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mx-4 my-2 font-bold text-xl">
                            <div className="ml-8">
                                TOTAL
                            </div>
                            <div className="mr-16">
                                $ 12000
                            </div>

                        </div>
                        <div className="flex items-center justify-center mt-10">
                            <button className="mx-4 py-3 w-full border-2 rounded-lg font-bold text-white text-2xl bg-[#FF3366] hover:bg-[#FF3399] " onClick={(e) => { setOpenPayment(true) }}>PAYMENT</button>
                            {
                                openPayment && <ModalPay modalOpen={setOpenPayment} amount={2000} accessToken={accessToken} setStatus={setStatusPayment} status={statusPayment} index={6} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Checkout

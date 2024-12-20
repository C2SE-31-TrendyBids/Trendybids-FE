import React, { useContext, useEffect, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import AuthContext from "../../context/authProvider";
import { MdLogout } from "react-icons/md";
import ImageLogo from "../../assets/images/logo.jpg";
import { BiMessageDetail } from "react-icons/bi";
import { motion } from "framer-motion";
import Tooltip from "@mui/material/Tooltip";
import Badge from '@mui/joy/Badge';
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineNotificationsNone } from "react-icons/md";
import NotificationPopup from "../NotificationPopup/NotificationPopup";
import { clearNotifications, fetchUnseenNotificationThunk } from "../../redux/slices/notification";
import MethodProvider from "../../context/methodProvider";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoWalletOutline } from "react-icons/io5";
const Header = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isDropdown, setIsDropdown] = useState(true);
    const { auth, isLogin } = useContext(AuthContext);
    const token = localStorage.getItem("access-token");
    const location = useLocation();
    const { unseenConv } = useSelector((state) => state.conversation)
    const { unseenCount } = useSelector((state) => state.notification)
    const [isOpenNotification, setIsOpenNotification] = useState(false)
    const iconNotificationRef = useRef();
    const dispatch = useDispatch()
    const { handleLogout } = useContext(MethodProvider);

    useEffect(() => {
        if (token) dispatch(fetchUnseenNotificationThunk(token))
    }, [token])

    return (
        <header className="shadow-md sm:px-10 py-1 bg-white font-[sans-serif]   min-h-[40px] sticky top-0 z-10 ">
            <div className="flex flex-wrap items-center justify-between gap-5 relative max-w-[1200px] mx-auto">
                <Link to="/" className="">
                    <div className="flex items-center ml-2">
                        <img src={ImageLogo} alt="logo" className="w-16" />
                        <h2 className="ml-2 font-bold text-[22px] tracking-wide">
                            <span className="text-black">Trendy</span>
                            <span className="text-[#007bff]">Bids</span>
                        </h2>
                    </div>
                </Link>
                <div className="flex items-center lg:order-2">
                    {/*not login*/}
                    {token && isLogin ? (
                        <div className="relative flex items-center">
                            <div className="flex items-center gap-x-2">
                                {/* wallet of account */}
                                <Tooltip title="Wallet">
                                    <motion.span whileHover={{ scale: 1.1 }} className="transition-all p-2 rounded-full bg-gray-100">
                                        <Link to='/e-wallet'>
                                            <IoWalletOutline size='27px' className={`${location.pathname.includes('/e-wallet') ? "text-blue-600" : "text-gray-600 hover:text-blue-600"}`} />
                                        </Link>
                                    </motion.span>
                                </Tooltip>
                                <Tooltip title="Notification" enterDelay={1000}>
                                    <motion.span whileHover={{ scale: 1.1 }} className="transition-all p-2 rounded-full bg-gray-100" onClick={(e) => {
                                        setIsOpenNotification(!isOpenNotification); // Close the popup
                                        dispatch(clearNotifications())
                                    }}>
                                        <Badge size="sm" badgeContent={unseenCount < 0 ? 0 : unseenCount} max={9} showZero={false}>
                                            <span ref={iconNotificationRef}>
                                                <MdOutlineNotificationsNone size='27px' className={`${isOpenNotification ? "text-blue-600" : "text-gray-600 hover:text-blue-600"}`} />
                                            </span>
                                        </Badge>
                                    </motion.span>
                                </Tooltip>
                                <Tooltip title="Message">
                                    <motion.span whileHover={{ scale: 1.1 }} className="transition-all p-2 rounded-full bg-gray-100">
                                        <Badge size="sm" badgeContent={unseenConv < 0 ? 0 : unseenConv} max={9} showZero={false}>
                                            <Link to='/messages'>
                                                <BiMessageDetail size='25px' className={`${location.pathname.includes('/message') ? "text-blue-600" : "text-gray-600 hover:text-blue-600"}`} />
                                            </Link>
                                        </Badge>
                                    </motion.span>
                                </Tooltip>
                            </div>

                            {/*Notification popup*/}
                            {isOpenNotification && <NotificationPopup setIsOpenNotification={setIsOpenNotification} iconNotificationRef={iconNotificationRef} />}

                            <button
                                id="dropdownDefaultButton"
                                data-dropdown-toggle="dropdown"
                                className="text-black hover:bg-gray-100 focus:outline-none rounded-lg px-5 py-2.5 text-center inline-flex items-center"
                                type="button"
                                onClick={() => setIsDropdown(!isDropdown)}
                            >
                                <span className="text-sm font-medium">
                                    {auth?.fullName}
                                </span>
                                <img
                                    className="w-[40px] h-[40px] rounded-full mx-3 object-cover border"
                                    src={
                                        auth?.avatarUrl ||
                                        "https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"
                                    }
                                    alt={auth?.fullName || "customer"}
                                ></img>
                                <svg
                                    className="w-2.5 h-2.5 ml-2.5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 4 4 4-4"
                                    />
                                </svg>
                            </button>

                            {/*<!-- Dropdown menu -->*/}
                            <div
                                id="dropdown"
                                className={`${isDropdown ? "hidden" : "block"
                                    } absolute w-[180px] top-16 right-0 z-10 bg-white divide-gray-100 rounded-lg shadow `}
                            >
                                <ul
                                    className="py-2 px-2 text-sm text-gray-700 font-semibold"
                                    aria-labelledby="dropdownDefaultButton"
                                >
                                    <li className="flex items-center hover:bg-[#007bff]  hover:text-white rounded">
                                        <FaRegCircleUser className="mx-3 text-xl" />
                                        <Link
                                            to="/profile"
                                            className="block pr-4 py-3"
                                        >
                                            Profile
                                        </Link>
                                    </li>
                                    {auth?.role?.name === "Admin" && (
                                        <li className="flex items-center hover:bg-[#007bff]  hover:text-white rounded">
                                            <LuLayoutDashboard className="mx-3 text-xl" />
                                            <Link
                                                to="/admin/dashboard"
                                                className="block pr-4 py-3"
                                            >
                                                Dashboard
                                            </Link>
                                        </li>
                                    )}
                                    {auth?.role?.name === "Censor" && (
                                        <li className="flex items-center hover:bg-[#007bff]  hover:text-white rounded">
                                            <LuLayoutDashboard className="mx-3 text-xl" />
                                            <Link
                                                to="/censor/all-product"
                                                className="block pr-4 py-3"
                                            >
                                                Dashboard
                                            </Link>
                                        </li>
                                    )}
                                    <li className="flex items-center hover:bg-[#007bff]  hover:text-white rounded">
                                        <MdLogout className="mx-3 text-xl" />
                                        <button
                                            onClick={(e) => handleLogout(e)}
                                            className="block pr-4 py-3"
                                        >
                                            Log Out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <>
                            {" "}
                            <Link
                                to="/login"
                                className="text-gray-800 hover:bg-gray-300 transition-all hover:text-[#007bff] font-bold rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none "
                            >
                                Log In
                            </Link>
                            <Link
                                to="/register"
                                className="text-white bg-[#007bff] transition-all font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}

                    {/* responsive menu*/}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        data-collapse-toggle="mobile-menu-2"
                        type="button"
                        className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <svg
                            className="hidden w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                </div>
                <ul
                    id="collapseMenu"
                    className="lg:!flex lg:space-x-5 max-lg:space-y-2 max-lg:hidden max-lg:py-4 max-lg:w-full"
                >
                    <li
                        className={`max-lg:border-b max-lg:py-2 px-4 max-lg:rounded text-[15px] font-semibold block  hover:text-[#007bff] ${location.pathname === "/"
                            ? "text-[#007bff] border-[#007bff] "
                            : "text-black"
                            }`}
                    >
                        <Link to="/">Home</Link>
                    </li>
                    <li
                        className={`max-lg:border-b max-lg:py-2 px-4 max-lg:rounded text-[15px] font-semibold block  hover:text-[#007bff] ${location.pathname === "/product-auction"
                            ? "text-[#007bff] border-[#007bff] "
                            : "text-black"
                            }`}
                    >
                        <Link to="/product-auction">Product Auction</Link>
                    </li>
                    <li
                        className={`max-lg:border-b max-lg:py-2 px-4 max-lg:rounded text-[15px] font-semibold block  hover:text-[#007bff] ${location.pathname === "/about"
                            ? "text-[#007bff] border-[#007bff] "
                            : "text-black"
                            }`}
                    >
                        <Link to="/about">About</Link>
                    </li>
                    <li
                        className={`max-lg:border-b max-lg:py-2 px-4 max-lg:rounded text-[15px] font-semibold block  hover:text-[#007bff] ${location.pathname === "/contact"
                            ? "text-[#007bff] border-[#007bff] "
                            : "text-black"
                            }`}
                    >
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;

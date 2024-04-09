import React, { useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import AuthContext from "../../context/authProvider";
import * as authServices from "../../services/auth";
import * as userApi from "../../services/user";
import { toast } from "sonner";
import { MdLogout } from "react-icons/md";
import ImageLogo from "../../assets/images/logo.jpg";

const Header = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isLogin, setIsLogin] = useState(false);
    const [isDropdown, setIsDropdown] = useState(true);
    const [user, setUser] = useState({});
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrentUser = async () => {
            const accessToken = localStorage.getItem("access-token");
            console.log(accessToken);
            if (!accessToken) return;
            try {
                const accessToken = localStorage.getItem("access-token");
                const responseUser = await userApi.getCurrentUser(accessToken);
                console.log(responseUser);
                if (responseUser?.statusCode === 200) {
                    const userInfo = responseUser?.response;
                    setUser(userInfo);
                    console.log(user);
                    const newAuth = { ...auth, userInfo };
                    localStorage.setItem("auth", JSON.stringify(newAuth));
                    setIsLogin(true);
                }
            } catch (error) {
                console.error("Error parsing access token:", error);
            }
        };
        fetchCurrentUser();
    }, []);

    // handleLogout function

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("auth_token"); // Lấy token xác thực từ local storage hoặc bất kỳ nơi nào bạn lưu trữ nó
            const fetchLogout = await authServices.logOut(token);
            if (fetchLogout?.status === 200) {
                localStorage.removeItem("auth");
                localStorage.removeItem("refresh-token");
                localStorage.removeItem("access-token");
                navigate("/login", {
                    state: {
                        toastMessage: "Log Out Successfully!",
                        statusMessage: "success",
                    },
                });
            } else {
                console.log(fetchLogout?.response);
                toast.error("Sign Out Failed!", "error");
            }
        } catch (error) {
            console.error("Logout error:", error);
            // Xử lý lỗi ở đây nếu cần thiết
            toast.error("Sign Out Failed!", "error");
        }
    };

    return (
        <header className="shadow-md sm:px-10 py-1 bg-white font-[sans-serif]   min-h-[40px] sticky top-0 z-10 ">
            <div className="flex flex-wrap items-center justify-between gap-5 relative max-w-[1200px] mx-auto">
                <Link to="/" className="">
                    <div className="flex items-center ml-2">
                        <img src={ImageLogo} alt="logo" className="w-16 " />
                        <h2 className="ml-2 font-bold text-[22px] tracking-wide">
                            <span className="text-black">Trendy</span>
                            <span className="text-[#007bff]">Bids</span>
                        </h2>
                    </div>
                </Link>
                <div className="flex items-center lg:order-2">
                    {/*not login*/}
                    {isLogin ? (
                        <div className="relative">
                            <button
                                id="dropdownDefaultButton"
                                data-dropdown-toggle="dropdown"
                                className="text-black hover:bg-gray-100 focus:outline-none rounded-lg px-5 py-2.5 text-center inline-flex items-center"
                                type="button"
                                onClick={() => setIsDropdown(!isDropdown)}
                            >
                                <span className="text-sm font-medium">
                                    {user?.fullName}
                                </span>
                                <img
                                    className="w-[40px] h-[40px] rounded-full mx-3"
                                    src={
                                        user?.avatarUrl ||
                                        "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                                    }
                                    alt={user?.fullNamename || "customer"}
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
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="m1 1 4 4 4-4"
                                    />
                                </svg>
                            </button>

                            {/*<!-- Dropdown menu -->*/}
                            <div
                                id="dropdown"
                                className={`${
                                    isDropdown ? "hidden" : "block"
                                } absolute top-18 left-0 right-0 z-10 bg-white divide-gray-100 rounded-lg shadow `}
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
                                    <li className="flex items-center hover:bg-[#007bff]  hover:text-white rounded">
                                        <MdLogout className="mx-3 text-xl" />
                                        <button
                                            onClick={(e) => {
                                                handleLogout(e);
                                            }}
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
                    <li className="max-lg:border-b max-lg:bg-[#007bff] max-lg:py-2 px-3 max-lg:rounded">
                        <Link
                            to="/"
                            className="lg:hover:text-[#007bff] text-[#007bff] max-lg:text-white block font-semibold text-[15px]"
                        >
                            Home
                        </Link>
                    </li>
                    <li className="max-lg:border-b max-lg:py-2 px-3 max-lg:rounded"></li>
                    <li className="group max-lg:border-b max-lg:py-2 relative">
                        <Link
                            to="/auction-session"
                            className="hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] block"
                        >
                            Auction Session
                        </Link>
                    </li>
                    <li className="max-lg:border-b max-lg:py-2 px-3 max-lg:rounded">
                        <Link
                            to="/about"
                            className="hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] block"
                        >
                            About
                        </Link>
                    </li>
                    <li className="max-lg:border-b max-lg:py-2 px-3 max-lg:rounded">
                        <Link
                            to="/contact"
                            className="hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] block"
                        >
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;

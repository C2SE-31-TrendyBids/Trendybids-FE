import React from "react";
const Navbar = () => {
    return (
        <div className="shadow-md bg-white font-[sans-serif]  ">
            <div className="flex items-center lg:justify-between  py-3 sm:px-10 px-4 border-gray-200 border-b min-h-[70px]">
                <div className="flex pl-4 pr-40 py-3 rounded-md border-2 border-blue-500 overflow-hidden max-w-md font-[sans-serif]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 192.904 192.904"
                        width="16px"
                        className="fill-gray-600 mr-3 rotate-90"
                    >
                        <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
                    </svg>
                    <input
                        type="search"
                        placeholder="Search Something..."
                        className="w-full outline-none bg-transparent text-gray-600 text-sm"
                    />
                </div>
                <div className="flex items-center">
                    <div className="relative mr-8">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 cursor-pointer"
                            viewBox="0 0 371.263 371.263"
                        >
                            <path
                                d="M305.402 234.794v-70.54c0-52.396-33.533-98.085-79.702-115.151.539-2.695.838-5.449.838-8.204C226.539 18.324 208.215 0 185.64 0s-40.899 18.324-40.899 40.899c0 2.695.299 5.389.778 7.964-15.868 5.629-30.539 14.551-43.054 26.647-23.593 22.755-36.587 53.354-36.587 86.169v73.115c0 2.575-2.096 4.731-4.731 4.731-22.096 0-40.959 16.647-42.995 37.845-1.138 11.797 2.755 23.533 10.719 32.276 7.904 8.683 19.222 13.713 31.018 13.713h72.217c2.994 26.887 25.869 47.905 53.534 47.905s50.54-21.018 53.534-47.905h72.217c11.797 0 23.114-5.03 31.018-13.713 7.904-8.743 11.797-20.479 10.719-32.276-2.036-21.198-20.958-37.845-42.995-37.845a4.704 4.704 0 0 1-4.731-4.731zM185.64 23.952c9.341 0 16.946 7.605 16.946 16.946 0 .778-.12 1.497-.24 2.275-4.072-.599-8.204-1.018-12.336-1.138-7.126-.24-14.132.24-21.078 1.198-.12-.778-.24-1.497-.24-2.275.002-9.401 7.607-17.006 16.948-17.006zm0 323.358c-14.431 0-26.527-10.3-29.342-23.952h58.683c-2.813 13.653-14.909 23.952-29.341 23.952zm143.655-67.665c.479 5.15-1.138 10.12-4.551 13.892-3.533 3.773-8.204 5.868-13.353 5.868H59.89c-5.15 0-9.82-2.096-13.294-5.868-3.473-3.772-5.09-8.743-4.611-13.892.838-9.042 9.282-16.168 19.162-16.168 15.809 0 28.683-12.874 28.683-28.683v-73.115c0-26.228 10.419-50.719 29.282-68.923 18.024-17.425 41.498-26.887 66.528-26.887 1.198 0 2.335 0 3.533.06 50.839 1.796 92.277 45.929 92.277 98.325v70.54c0 15.809 12.874 28.683 28.683 28.683 9.88 0 18.264 7.126 19.162 16.168z"
                                data-original="#000000"
                            />
                        </svg>
                        <span className="bg-red-500 text-[10px] px-1.5 font-semibold min-w-[20px] h-5 flex items-center justify-center text-white rounded-full absolute -top-2 left-[50%] transform -translate-x-1/2">
                            3
                        </span>
                    </div>
                    <div className="flex items-center">
                        <img
                            alt=""
                            src="https://readymadeui.com/profile.webp"
                            className="w-10 h-10 rounded-full border-2 border-white"
                        />
                        <div className="ml-4">
                            <p className="text-sm text-black font-bold">Pham Huu Sang</p>
                            <p className="text-xs text-black mt-1">
                                Phamhuusang24@gmail.com
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Navbar;

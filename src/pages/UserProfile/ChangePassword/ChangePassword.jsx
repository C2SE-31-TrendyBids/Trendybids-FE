import React, { useState, useEffect } from "react";
import { IoIosEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import * as userApi from "../../../services/user";
import { toast } from "sonner";

const ChangePassword = () => {
    const [curPassword, setCurPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [reNewPassword, setReNewPassword] = useState("");
    const [hiddenCurPassword, setHiddenCurPassword] = useState(true);
    const [hiddenNewPassword, setHiddenNewPassword] = useState(true);
    const [hiddenReNewPassword, setHiddenReNewPassword] = useState(true);
    const [id, setId] = useState({});
    const handleChangePassword = async () => {
        if (!curPassword || !newPassword || !reNewPassword) {
            toast.error("Please fill in all fields.");
            return;
        }
        if (newPassword !== reNewPassword) {
            toast.error("New password and confirm password do not match.");
            return;
        }

        try {
            const accessToken = localStorage.getItem("access-token");
            const response = await userApi.changePass(
                accessToken,
                id,
                curPassword,
                newPassword
            );

            if (response.statusCode === 200) {
                toast.success("Password Changed Successfully");
                // Thực hiện các hành động khác nếu cần
            } else {
                toast.error("Failed to change password:", response.error);
                // Hiển thị thông báo lỗi tương ứng với người dùng
            }
        } catch (error) {
            toast.error("Failed to change password:", error);
            // Xử lý lỗi từ API hoặc lỗi mạng
        }
    };
    useEffect(() => {
        const fetchCurrentUser = async () => {
            const accessToken = localStorage.getItem("access-token");
            if (!accessToken) return;

            try {
                const responseUser = await userApi.getCurrentUser(accessToken);
                console.log(responseUser);
                if (responseUser?.statusCode === 200) {
                    const userInfo = responseUser?.response;
                    setId(userInfo.id);
                }
            } catch (error) {
                console.error("Error parsing access token:", error);
            }
        };
        fetchCurrentUser();
    }, []);
    return (
        <div>
            <section className="">
                <div className="mt-20">
                    <h1 className="text-[22px] font-bold text-[#007bff] ">
                         User Change Password
                    </h1>
                </div>
                <div className="flex flex-col items-center justify-center px-6 py-8 mt-12 mx-auto  lg:py-0">
                    <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-100 dark:border-gray-700 sm:p-8">
                        <form
                            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
                            action="#"
                        >
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                >
                                    Current Password
                                </label>
                                <div className="relative ">
                                    <input
                                        id="input-oldPassword"
                                        className="w-full px-4 py-2 border-2 rounded-md  outline-none focus:border-primaryColor placeholder:text-md text-md"
                                        type={
                                            hiddenCurPassword
                                                ? "password"
                                                : "text"
                                        }
                                        placeholder="Current password..."
                                        value={curPassword}
                                        onChange={(e) =>
                                            setCurPassword(e.target.value)
                                        }
                                        required
                                    />
                                    {hiddenCurPassword ? (
                                        <IoIosEyeOff
                                            onClick={() =>
                                                setHiddenCurPassword(
                                                    !hiddenCurPassword
                                                )
                                            }
                                            className="absolute top-4 right-6 hover:cursor-pointer"
                                        />
                                    ) : (
                                        <IoEye
                                            onClick={() =>
                                                setHiddenCurPassword(
                                                    !hiddenCurPassword
                                                )
                                            }
                                            className="absolute top-4 right-6 hover:cursor-pointer"
                                        />
                                    )}
                                </div>
                            </div>
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                >
                                    New Password
                                </label>
                                <div className="relative ">
                                    <input
                                        id="input-newPassword"
                                        className="w-full px-4 py-2 border-2 rounded-md  outline-none focus:border-primaryColor placeholder:text-md text-md"
                                        type={
                                            hiddenNewPassword
                                                ? "password"
                                                : "text"
                                        }
                                        placeholder="New password..."
                                        value={newPassword}
                                        onChange={(e) =>
                                            setNewPassword(e.target.value)
                                        }
                                        required
                                    />
                                    {hiddenNewPassword ? (
                                        <IoIosEyeOff
                                            onClick={() =>
                                                setHiddenNewPassword(
                                                    !hiddenNewPassword
                                                )
                                            }
                                            className="absolute top-4 right-6 hover:cursor-pointer"
                                        />
                                    ) : (
                                        <IoEye
                                            onClick={() =>
                                                setHiddenNewPassword(
                                                    !hiddenNewPassword
                                                )
                                            }
                                            className="absolute top-4 right-6 hover:cursor-pointer"
                                        />
                                    )}
                                </div>
                            </div>
                            <div>
                                <label
                                   
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                >
                                    Confirm password
                                </label>
                                <div className="relative ">
                                    <input
                                        id="input-renewPassword"
                                        className="w-full px-4 py-2 border-2 rounded-md  outline-none focus:border-primaryColor placeholder:text-md text-md"
                                        type={
                                            hiddenReNewPassword
                                                ? "password"
                                                : "text"
                                        }
                                        placeholder="Confirm password..."
                                        value={reNewPassword}
                                        onChange={(e) =>
                                            setReNewPassword(e.target.value)
                                        }
                                        required
                                    />
                                    {hiddenReNewPassword ? (
                                        <IoIosEyeOff
                                            onClick={() =>
                                                setHiddenReNewPassword(
                                                    !hiddenReNewPassword
                                                )
                                            }
                                            className="absolute top-4 right-6 hover:cursor-pointer"
                                        />
                                    ) : (
                                        <IoEye
                                            onClick={() =>
                                                setHiddenReNewPassword(
                                                    !hiddenReNewPassword
                                                )
                                            }
                                            className="absolute top-4 right-6 hover:cursor-pointer"
                                        />
                                    )}
                                </div>
                            </div>
                        </form>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="mt-8 px-6 py-2.5 text-sm font-semibold  text-black border  border-gray-400  rounded hover:bg-gray-200 mr-4"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="mt-8 px-8 py-2.5 text-sm font-semibold bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={handleChangePassword}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
export default ChangePassword;

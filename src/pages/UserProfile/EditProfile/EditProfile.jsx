import React, { useState, useRef, useEffect, useContext } from "react";
import { FaRegUserCircle, FaTimes } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { MdPhoneIphone, MdOutlineLocationOn } from "react-icons/md";
import { toast } from "sonner";
import * as userApi from "../../../services/user";
import AuthContext from "../../../context/authProvider";

const EditProfile = () => {
    const fileRef = useRef();
    const { user, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const handleUpdateAvatar = async (event) => {
        try {
            const {
                target: { files },
            } = event;
            const accessToken = localStorage.getItem("access-token");

            if (!accessToken) return;

            const file = files[0];

            if (!file) return;
            setLoading(true);

            const response = await userApi.uploadAvatar(accessToken, file);

            setUser((prev) => ({
                ...prev,
                avatarUrl: response?.response?.url,
            }));
        } catch (error) {
            console.log(`upload error`, error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem("access-token");
        const formData = {
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            address: user.address,
        };
        try {
            const userEdit = await userApi.editUser(
                accessToken,
                user?.id,
                formData
            );
            toast.success("User Data Updated Successfully", userEdit.response);
            // Xử lý khi cập nhật thành công
            console.log(formData);
        } catch (error) {
            toast.error("Error updating user data", error);
            // Xử lý khi có lỗi xảy ra
        }
    };
    const handleCancel = () => {
        // Xử lý logic khi người dùng nhấn nút "Cancel" ở đây
        console.log("Form canceled!");
    };

    return (
        <div className="w-full overflow-x-auto mt-20">
            {loading ? (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-300/80 z-50">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-700"></div>
                </div>
            ) : null}

            <div className="">
                <div>
                    <h1 className="text-[22px] font-bold text-[#007bff] ">
                        Edit User Profile
                    </h1>
                </div>
                <div className="flex flex-col items-center">
                    {user?.avatarUrl ? (
                        <img
                            src={user.avatarUrl}
                            alt="loading-avatar"
                            className="w-40 h-40 object-cover border-2 rounded-full"
                        />
                    ) : (
                        <img
                            src={
                                "https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"
                            }
                            alt="avatar"
                            className="w-40 h-40 object-cover border-2 rounded-full"
                        />
                    )}
                </div>
                <form className="font-[sans-serif] m-6 max-w-xl mx-auto">
                    <div className="grid sm:grid-cols-2 gap-8">
                        <div className="relative flex items-center sm:col-span-2">
                            <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px] font-semibold">
                                Full Name
                            </label>
                            <input
                                type="name"
                                name="fullName"
                                className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none "
                                value={user?.fullName}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        fullName: e.target.value,
                                    })
                                }
                            />
                            <FaRegUserCircle className="w-[18px] h-[18px] absolute right-4" />
                        </div>
                        <div className="relative flex items-center sm:col-span-2">
                            <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px] font-semibold">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                                value={user?.email}
                                onChange={(e) =>
                                    setUser({ ...user, email: e.target.value })
                                }
                            />
                            <MdOutlineEmail className="w-[18px] h-[18px] absolute right-4" />
                        </div>
                        <div className="relative flex items-center sm:col-span-2">
                            <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px] font-semibold">
                                Phone Number
                            </label>
                            <input
                                type="phone"
                                name="phoneNumber"
                                className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                                value={user?.phoneNumber}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        phoneNumber: e.target.value,
                                    })
                                }
                            />
                            <MdPhoneIphone className="w-[18px] h-[18px] absolute right-4" />
                        </div>
                        <div className="relative flex items-center sm:col-span-2">
                            <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px] font-semibold">
                                Address
                            </label>
                            <input
                                type="address"
                                name="address"
                                className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                                value={user?.address}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        address: e.target.value,
                                    })
                                }
                            />
                            <MdOutlineLocationOn className="w-[18px] h-[18px] absolute right-4" />
                        </div>
                        <div className="relative  items-center sm:col-span-2">
                            <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px] font-semibold">
                                Avatar
                            </label>
                            <input
                                ref={fileRef}
                                onChange={handleUpdateAvatar}
                                className="relative mt-4 block w-full min-w-0 text-sm"
                                type="file"
                                id="formFileMultiple"
                                hidden
                                accept=".png, .jpg, .jpeg"
                                multiple
                            />
                            <span className="text-sm text-gray-400">
                                Dung lương tối đa 1 MB
                            </span>
                            <span className="text-sm text-gray-400">
                                <br /> Định dạng: .JPG, .PNG, .JPEG
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={handleCancel}
                            type="button"
                            className="mt-8 px-6 py-2.5 text-sm font-semibold  text-black border  border-gray-400  rounded hover:bg-gray-200 mr-4"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            type="button"
                            className="mt-8 px-8 py-2.5 text-sm font-semibold bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;

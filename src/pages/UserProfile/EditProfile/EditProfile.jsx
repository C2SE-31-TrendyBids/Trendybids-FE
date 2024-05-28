import React, { useState, useRef, useContext } from "react";
import { FaRegUserCircle, FaTimes } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { MdPhoneIphone, MdOutlineLocationOn } from "react-icons/md";
import { toast } from "sonner";
import * as userApi from "../../../services/user";
import AuthContext from "../../../context/authProvider";

const EditProfile = () => {
    const fileRef = useRef();
    const { auth, setAuth } = useContext(AuthContext);
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

            setAuth((prev) => ({
                ...prev,
                avatarUrl: response?.response?.url,
            }));
            localStorage.setItem(
                "auth",
                JSON.stringify({ ...auth, avatarUrl: response?.response?.url })
            );
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
            fullName: auth.fullName,
            email: auth.email,
            phoneNumber: auth.phoneNumber,
            address: auth.address,
        };
        try {
            const userEdit = await userApi.editUser(
                accessToken,
                auth?.id,
                formData
            );
            localStorage.setItem("auth", JSON.stringify({ ...formData }));
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
        <div className="w-full overflow-x-auto mt-20 ">
            {loading ? (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-300/80 z-50">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-700"></div>
                </div>
            ) : null}

            <div className=" ">
                <div className="mt-4 mb-10">
                    <h1 className="text-[22px] font-bold text-[#007bff] ">
                        Edit User Profile
                    </h1>
                </div>
                <div className="grid grid-cols-9 gap-24">
                    <div className="ml-4 col-span-6">
                        <form className="font-[sans-serif] m-6 max-w-xl mx-auto ">
                            <div className="grid sm:grid-cols-2 gap-8">
                                <div className="relative flex items-center sm:col-span-2">
                                    <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px] font-semibold">
                                        Full Name
                                    </label>
                                    <input
                                        type="name"
                                        name="fullName"
                                        className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none "
                                        value={auth?.fullName}
                                        onChange={(e) =>
                                            setAuth({
                                                ...auth,
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
                                        value={auth?.email}
                                        onChange={(e) =>
                                            setAuth({
                                                ...auth,
                                                email: e.target.value,
                                            })
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
                                        maxLength={12}
                                        className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                                        value={auth?.phoneNumber}
                                        onChange={(e) => {
                                            // Filter out non-numeric characters
                                            const filteredValue =
                                                e.target.value.replace(
                                                    /\D/g,
                                                    ""
                                                );
                                            setAuth({
                                                ...auth,
                                                phoneNumber: filteredValue,
                                            });

                                            // Display error toast if non-numeric characters are found
                                            if (
                                                filteredValue !== e.target.value
                                            ) {
                                                toast.warning(
                                                    "Invalid phone number. Please enter only numbers."
                                                );
                                            }
                                        }}
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
                                        value={auth?.address}
                                        onChange={(e) =>
                                            setAuth({
                                                ...auth,
                                                address: e.target.value,
                                            })
                                        }
                                    />
                                    <MdOutlineLocationOn className="w-[18px] h-[18px] absolute right-4" />
                                </div>
                            </div>
                            <div className="flex justify-start">
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
                    <div className="col-span-3 flex flex-col items-center">
                        <div className="flex flex-col items-center mt-4">
                            {auth?.avatarUrl ? (
                                <img
                                    src={auth.avatarUrl}
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
                            <div className="flex flex-col items-center sm:col-span-2">
                                <div className="ml-4 flex justify-center">
                                    <input
                                        ref={fileRef}
                                        onChange={handleUpdateAvatar}
                                        className="mt-4 block w-full min-w-0 text-sm"
                                        type="file"
                                        id="formFileMultiple"
                                        hidden
                                        accept=".png, .jpg, .jpeg"
                                        multiple
                                    />
                                </div>
                                <div className="flex flex-col items-center mt-2">
                                    <span className="text-sm text-gray-400">
                                        Dung lượng tối đa 1 MB
                                    </span>
                                    <span className="text-sm text-gray-400">
                                        Định dạng: .JPG, .PNG, .JPEG
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;

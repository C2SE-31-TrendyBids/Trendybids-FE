import React, { useState, useRef } from "react";
import { FaRegUserCircle, FaTimes } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { MdPhoneIphone, MdOutlineLocationOn } from "react-icons/md";
import SidebarUser  from "../../../components/Sidebar/SidebarUser";
const EditProfile = () => {
  const [images, setImages] = useState([]);
  const [loadingAva, setLoadingAva] = useState(true);
  const fileRef = useRef();

  const handleUpdateAvatar = async () => {};
  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic submit form ở đây
    console.log("Form submitted!");
  };
  const handleCancel = () => {
    // Xử lý logic khi người dùng nhấn nút "Cancel" ở đây
    console.log("Form canceled!");
  };
  return (
    <div className="w-full overflow-x-auto mt-20">
      <div className="">
        <div>
          <h1 className="text-[22px] font-bold text-[#007bff] ">
            Edit User Profile
          </h1>
        </div>
        <div className="flex flex-col items-center">
          {loadingAva ? (
            <img
              src="https://img.thuthuattinhoc.vn/uploads/2020/05/30/hhinh-anh-luffy-chibi-thu-the-rat-ngau_055520104.jpg"
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
                className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none "
              />
              <FaRegUserCircle className="w-[18px] h-[18px] absolute right-4" />
            </div>
            <div className="relative flex items-center sm:col-span-2">
              <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px] font-semibold">
                Email Address
              </label>
              <input
                type="email"
                className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
              />
              <MdOutlineEmail className="w-[18px] h-[18px] absolute right-4" />
            </div>
            <div className="relative flex items-center sm:col-span-2">
              <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px] font-semibold">
                Phone Number
              </label>
              <input
                type="phone"
                className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
              />
              <MdPhoneIphone className="w-[18px] h-[18px] absolute right-4" />
            </div>
            <div className="relative flex items-center sm:col-span-2">
              <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px] font-semibold">
                Address
              </label>
              <input
                type="address"
                className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
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
              {/* <button
                type="button"
                className="ml-2 text-gray-400 hover:text-red-500 focus:outline-none"
                onClick={() => removeImage()}
              >
                <FaTimes />
              </button> */}
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

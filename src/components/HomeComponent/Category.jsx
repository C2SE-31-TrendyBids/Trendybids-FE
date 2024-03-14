import Furniture from "../../public/images/Furniture-Category.png";
import Smart from "../../public/images/Smart-Category.png";
import Sport from "../../public/images/Sport-Category.png";
import Stamp from "../../public/images/Stamp-Category.png";
import Vehicle from "../../public/images/Vehicle-Category.png";
import Watch from "../../public/images/Watch-Category.png";

const Category = () => {

    return (
        <div className=" px-10 mx-auto mt-14">
            <h2 className="text-[#0B1133] text-2xl font-bold">Explore Popular Categories</h2>
            <div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-14 lg:gap-4 justify-items-center mt-5">
                <div
                    className="w-28 h-28 rounded-full bg-gradient-to-r from-[#FA5362] to-[#F51C6C]">
                    <img className="w-28 h-28 object-cover" src={Furniture} alt="Antiques"/>
                    <p className="text-[#0B1133] text-[15px] font-semibold text-center mt-3">Antiques</p>
                </div>
                <div
                    className="w-28 h-28 rounded-full bg-gradient-to-r from-[#D7D6B4] to-[#F8EFBA]">
                    <img className="w-28 h-28 object-cover" src={Smart} alt="Electronics"/>
                    <p className="text-[#0B1133] text-[15px] font-semibold text-center mt-3">Electronics</p>
                </div>
                <div
                    className="w-28 h-28 rounded-full bg-gradient-to-r from-[#BED0B4] to-[#ECC3B9]">
                    <img className="w-28 h-28 object-cover" src={Sport} alt="Sneakers"/>
                    <p className="text-[#0B1133] text-[15px] font-semibold text-center mt-3">Sneakers</p>
                </div>
                <div
                    className="w-28 h-28 rounded-full bg-gradient-to-r from-[#FCBCC6] to-[#FEADC8]">
                    <img className="w-28 h-28 object-cover" src={Stamp} alt="Stamps"/>
                    <p className="text-[#0B1133] text-[15px] font-semibold text-center mt-3">Stamps</p>
                </div>
                <div
                    className="w-28 h-28 rounded-full bg-gradient-to-r from-[#C1B4D2] to-[#F4BAD6]">
                    <img className="w-28 h-28 object-cover" src={Vehicle} alt="Vehicles"/>
                    <p className="text-[#0B1133] text-[15px] font-semibold text-center mt-3">Vehicles</p>
                </div>
                <div
                    className="w-28 h-28 rounded-full bg-gradient-to-r from-[#B9ACC9] to-[#FA6F7A]">
                    <img className="w-28 h-28 object-cover" src={Watch} alt="Watches"/>
                    <p className="text-[#0B1133] text-[15px] font-semibold text-center mt-3">Watches</p>
                </div>
            </div>
        </div>
    )

}

export default Category
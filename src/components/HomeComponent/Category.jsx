import Furniture from "../../public/images/Furniture-Category.png";
import Smart from "../../public/images/Smart-Category.png";
import Sport from "../../public/images/Sport-Category.png";
import Stamp from "../../public/images/Stamp-Category.png";
import Vehicle from "../../public/images/Vehicle-Category.png";
import Watch from "../../public/images/Watch-Category.png";
import {useNavigate} from "react-router-dom";

const Category = () => {
    const navigate = useNavigate();
    const category = [{
        id: "C01",
        name: "Antiques",
        image: Furniture,
        backgroundColor:"bg-gradient-to-r from-[#FA5362] to-[#F51C6C]"
    }, {
        id: "C02",
        name: "Electronics",
        image: Smart,
        backgroundColor:"bg-gradient-to-r from-[#D7D6B4] to-[#F8EFBA]"
    }, {
        id: "C03",
        name: "Sneakers",
        image: Sport,
        backgroundColor:"bg-gradient-to-r from-[#BED0B4] to-[#ECC3B9]"
    }, {
        id: "C04",
        name: "Stamps",
        image: Stamp,
        backgroundColor:"bg-gradient-to-r from-[#FCBCC6] to-[#FEADC8]"
    }, {
        id: "C05",
        name: "Vehicles",
        image: Vehicle,
        backgroundColor:"bg-gradient-to-r from-[#C1B4D2] to-[#F4BAD6]"
    }, {
        id: "C06",
        name: "Watches",
        image: Watch,
        backgroundColor:"bg-gradient-to-r from-[#B9ACC9] to-[#FA6F7A]"
    }]

    const handleSearchByCategory = (item) => {
        console.log(item)
        navigate('/product-auction', {state: {categoryId: item?.id}})
    }

    return (
        <div className=" px-10 mx-auto mt-14">
            <h2 className="text-[#0B1133] text-2xl font-bold">Explore Popular Categories</h2>
            <div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-14 lg:gap-4 justify-items-center mt-5">
                {category.map((item) => {
                    return (
                        <div
                            key={item.id}
                            onClick={() => handleSearchByCategory(item)}
                            className={`w-28 h-28 rounded-full ${item?.backgroundColor}`}>
                            <img className="w-28 h-28 object-cover hover:scale-110 hover:cursor-pointer transition-all" src={item?.image} alt={item?.name}/>
                            <p className="text-[#0B1133] text-[15px] font-semibold text-center mt-3">{item?.name}</p>
                        </div>
                    )
                })}


            </div>
        </div>
    )

}

export default Category
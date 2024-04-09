import Sidebar, {SidebarItem} from "../components/Sidebar/Sidebar"
import {IoIosHome} from "react-icons/io";
import {CgShutterstock} from "react-icons/cg";
import {FaPeopleGroup} from "react-icons/fa6";
import {IoSettingsSharp} from "react-icons/io5";
import {RiAuctionLine} from "react-icons/ri";
import {MdOutlineProductionQuantityLimits} from "react-icons/md";
import {useContext, useEffect, useState} from "react";
import MethodProvider from "../context/methodProvider";
import {useLocation, useNavigate} from "react-router-dom";

let count = 0;
const CensorLayout = ({children}) => {
    const {fetchUserDetails , convertToLowerCase} = useContext(MethodProvider);
    const location = useLocation();

    const sidebarItems = [
        {icon: <IoIosHome size={20}/>, text: "Home", active: false},
        {icon: <FaPeopleGroup size={20}/>, text: "Member", active: false},
        {icon: <CgShutterstock size={20}/>, text: "All Product", active: false, alert: true},
        {icon: <MdOutlineProductionQuantityLimits size={20}/>, text: "Product Approve", active: false},
        {icon: <RiAuctionLine size={20}/>, text: "Auction Session", active: false},
        {icon: <IoSettingsSharp size={20}/>, text: "Settings", active: false},
    ];
    const [listSidebarItem, setListSidebarItem] = useState(sidebarItems);

    useEffect(() => {
        count === 1 && fetchUserDetails("Censor");
        count++;
    }, [])

    useEffect(() => {
        const urlParts = location.pathname.split("/");
        const lastPart = urlParts[urlParts.length - 1];
        const updatedSidebarItems = listSidebarItem.map((item) => ({
            ...item,
            active: convertToLowerCase(item.text.toUpperCase()) === lastPart,
        }));
        setListSidebarItem(updatedSidebarItems);
    }, [location]);


    return (<>
        <div className="flex bg-gray-100">
            <div className="flex">
                <Sidebar>
                    {listSidebarItem.map((item, index) => (
                        <SidebarItem
                            key={index}
                            icon={item?.icon}
                            text={item?.text}
                            active={item?.active}
                        />
                    ))}
                </Sidebar>
            </div>
            <div className="fill-available">{children}</div>
        </div>
    </>)
}

export default CensorLayout

import Sidebar, { SidebarItem } from "../components/Sidebar/Sidebar"
import { IoIosHome } from "react-icons/io";
import { LuLayoutDashboard } from "react-icons/lu";
import { CgShutterstock } from "react-icons/cg";
import { FaStoreAlt } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import MethodProvider from "../context/methodProvider";
import { useLocation } from "react-router-dom";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { RiAuctionLine } from "react-icons/ri";

let count = 0;
const Admin = ({ children }) => {
    const { fetchUserDetails, convertToLowerCase } = useContext(MethodProvider);
    const location = useLocation();

    const sidebarItems = [
        { icon: <IoIosHome size={20} />, text: "Home", active: false, role: "admin"},
        { icon: <LuLayoutDashboard size={20} />, text: "Dashboard", active: false, role: "admin" },
        { icon: <CgShutterstock size={20} />, text: "Account", active: false, alert: true, role: "admin" },
        { icon: <FaStoreAlt size={20} />, text: "Auction", active: false, role: "admin" },
        { icon: <FaStoreAlt size={20} />, text: "Approve-Censor", active: false, role: "admin" },
        { icon: <IoSettingsSharp size={20} />, text: "Settings", active: false, role: "admin" },
    ];
    const [listSidebarItem, setListSidebarItem] = useState(sidebarItems);

    useEffect(() => {
        count === 1 && fetchUserDetails("Admin");
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
                            role={item?.role}
                        />
                    ))}
                </Sidebar >
            </div >
            <div className="fill-available">{children}</div>
        </div >
    </>)
}

export default Admin
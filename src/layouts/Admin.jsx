import Sidebar, { SidebarItem } from "../components/Sidebar/Sidebar"
import { IoIosHome } from "react-icons/io";
import { LuLayoutDashboard } from "react-icons/lu";
import { useContext, useEffect, useState } from "react";
import MethodProvider from "../context/methodProvider";
import {useLocation, useNavigate} from "react-router-dom";
import { GrOrganization } from "react-icons/gr";
import { PiUserListBold } from "react-icons/pi";
import {BsFileEarmarkRuled} from "react-icons/bs";
import { MdLogout } from "react-icons/md";

let count = 0;
const Admin = ({ children }) => {
    const { fetchUserDetails, convertToLowerCase, handleLogout } = useContext(MethodProvider);
    const location = useLocation();

    const sidebarItems = [
        { icon: <IoIosHome size={20} />, text: "Home", to: '/', active: false },
        { icon: <LuLayoutDashboard size={20} />, text: "Dashboard", to: '/admin/dashboard', active: false },
        { icon: <PiUserListBold size={20} />, text: "Account", to: '/admin/account', active: false, alert: true },
        { icon: <GrOrganization size={20} />, text: "Censor", to: '/admin/approve-censor', active: false },
        { icon: <BsFileEarmarkRuled size={20} />, text: "Rules", to: '/admin/rule', active: false },
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
            active: item.to.includes(lastPart),
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
                            to={item?.to}
                        />
                    ))}
                    <span onClick={handleLogout}>
                        <li className="relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-indigo-50 text-gray-600">
                            <MdLogout size={20} />
                            <p className={`w-52 ml-3 overflow-hidden transition-all`}>
                                Log Out
                            </p>
                        </li>
                    </span>
                </Sidebar >
            </div >
            <div className="fill-available">{children}</div>
        </div >
    </>)
}

export default Admin
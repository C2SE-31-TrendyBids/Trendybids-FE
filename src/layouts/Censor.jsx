import Sidebar, { SidebarItem } from "../components/Sidebar/Sidebar"
import { IoIosHome } from "react-icons/io";
import { LuLayoutDashboard } from "react-icons/lu";
import { CgShutterstock } from "react-icons/cg";
import { FaStoreAlt } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

const Censor = ({ children }) => {

    return (<>
        <div className="flex bg-gray-100">
            <div className="flex">
                <Sidebar>
                    <SidebarItem icon={<IoIosHome size={20} />} text="Home" />
                    <SidebarItem icon={<LuLayoutDashboard size={20} />} text="Manage organization members" />
                    <SidebarItem icon={<CgShutterstock size={20} />} text="Management product not approved " alert />
                    <SidebarItem icon={<FaStoreAlt size={20} />} text="Manager product approved" />
                    <SidebarItem icon={<FaStoreAlt size={20} />} text="Manager auction session" />
                    <hr className="my-3" />
                    <SidebarItem icon={<IoSettingsSharp size={20} />} text="Settings" />
                </Sidebar>
            </div>
            <div className="fill-available">{children}</div>
        </div>
    </>)
}

export default Censor
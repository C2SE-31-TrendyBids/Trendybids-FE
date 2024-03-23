import Sidebar, { SidebarItem } from "../components/Sidebar/Sidebar"
import { IoIosHome } from "react-icons/io";
import { LuLayoutDashboard } from "react-icons/lu";
import { CgShutterstock } from "react-icons/cg";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { RiAuctionLine } from "react-icons/ri";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
const CensorLayout = ({ children }) => {

    return (<>
        <div className="flex bg-gray-100">
            <div className="flex">
                <Sidebar>
                    <SidebarItem icon={<IoIosHome size={20} />} text="Home" />
                    <SidebarItem icon={<FaPeopleGroup size={20} />} text="Member" />
                    <SidebarItem icon={<CgShutterstock size={20} />} text="All Product" alert />
                    <SidebarItem icon={<MdOutlineProductionQuantityLimits size={20} />} text="Product Approve" />
                    <SidebarItem icon={<RiAuctionLine size={20} />} text="Auction Session" />
                    <hr className="my-3" />
                    <SidebarItem icon={<IoSettingsSharp size={20} />} text="Settings" />
                </Sidebar>
            </div>
            <div className="fill-available">{children}</div>
        </div>
    </>)
}

export default CensorLayout

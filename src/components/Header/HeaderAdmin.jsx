import {LuBellRing} from "react-icons/lu";
import React, {useContext, useEffect, useRef, useState} from "react";
import AuthContext from "../../context/authProvider";
import NotificationPopup from "../NotificationPopup/NotificationPopup";
import {motion} from "framer-motion";
import {useDispatch, useSelector} from "react-redux";
import {fetchUnseenNotificationThunk} from "../../redux/slices/notification";
import Badge from "@mui/joy/Badge";

const HeaderAdmin = ({pageName}) => {
    const accessToken = localStorage.getItem("access-token")
    const {auth} = useContext((AuthContext))
    const [isOpenNotification, setIsOpenNotification] = useState(false)
    const iconNotificationRef = useRef();
    const {unseenCount} = useSelector((state) => state.notification)
    const dispatch = useDispatch()

    useEffect(() => {
        if (accessToken) dispatch(fetchUnseenNotificationThunk(accessToken))
    }, [])

    return (
        <div className="py-2 flex justify-between">
            <div className="">
                <p className="text-[12px] font-medium text-[#707EAE] ">Pages / {pageName}</p>
                <h1 className="text-xl font-bold text-[#2B3674]">Main {pageName}</h1>
            </div>
            <div className="">
                <div className="flex items-center gap-4 px-6 py-2 bg-white rounded-full">
                    <Badge size="sm" badgeContent={unseenCount < 0 ? 0 : unseenCount} max={9} showZero={false}>
                        <motion.span whileHover={{scale: 1.2}} ref={iconNotificationRef} className="hover:text-blue-600" onClick={() => setIsOpenNotification(!isOpenNotification)}>
                            <LuBellRing className="hover:cursor-pointer" size={20} />
                        </motion.span>
                    </Badge>
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                        <img className="w-full h-full rounded-full object-cover" src={auth?.avatarUrl || "https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"} alt="" />
                    </div>
                </div>
            </div>
            {isOpenNotification && <NotificationPopup setIsOpenNotification={setIsOpenNotification} iconNotificationRef={iconNotificationRef}/>}
        </div>
    )

}

export default HeaderAdmin
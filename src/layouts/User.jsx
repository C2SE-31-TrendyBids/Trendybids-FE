import SidebarUser from "../components/Sidebar/SidebarUser";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import {useContext, useEffect} from "react";
import MethodProvider from "../context/methodProvider";

let count = 0;
const Admin = ({children}) => {
    const {fetchUserDetails} = useContext(MethodProvider);

    useEffect(() => {
        count === 1 && fetchUserDetails("User");
        count++;
    }, [])

    return (
        <>
            <Header/>
            <div className="grid grid-cols-12 max-w-[1200px] mx-auto mt-8 gap-5">
                <div className="col-span-3"><SidebarUser/></div>
                <div className="col-span-9">{children}</div>
            </div>
            <Footer/>
        </>
    );
};

export default Admin;

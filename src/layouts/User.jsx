    import SidebarUser from "../components/Sidebar/SidebarUser";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const Admin = ({ children }) => {
  return (
    <>
      <>
        <Header />
        <div className="grid grid-cols-12 max-w-[1300px] mx-auto mt-8 gap-5">
          <div className="col-span-3"><SidebarUser /></div>
          <div className="col-span-9">{children}</div>
        </div>
        <Footer />
      </>
    </>
  );
};

export default Admin;

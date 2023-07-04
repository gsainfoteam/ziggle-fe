import { Outlet } from "react-router-dom";
import Navbar from "src/templates/navbar/Navbar";
import Footer from "src/templates/footer/Footer";


const Layout = () => {
  return (
    <div>
    <Navbar />
    <Outlet />

    <Footer/>
    </div>
  );
};

export default Layout;

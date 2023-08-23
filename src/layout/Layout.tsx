import { Outlet } from "react-router-dom";
import Spacer from "src/atoms/spacer/Spacer";
import Footer from "src/templates/footer/Footer";
import Navbar from "src/templates/navbar/Navbar";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />

      <Spacer height={"300px"} />
      <Footer />
    </div>
  );
};

export default Layout;

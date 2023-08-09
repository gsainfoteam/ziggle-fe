import { Outlet } from "react-router-dom";
import Spacer from "src/atoms/spacer/Spacer";
import useAuth from "src/hooks/useAuth";
import Footer from "src/templates/footer/Footer";
import Navbar from "src/templates/navbar/Navbar";

const Layout = () => {
  useAuth();

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

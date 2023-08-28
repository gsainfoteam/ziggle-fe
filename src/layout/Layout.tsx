import "react-toastify/dist/ReactToastify.css";

import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Spacer from "src/atoms/spacer/Spacer";
import useAuth from "src/hooks/useAuth";
import useViewLog from "src/hooks/useViewLog";
import Footer from "src/templates/footer/Footer";
import Navbar from "src/templates/navbar/Navbar";

const Layout = () => {
  useViewLog();
  useAuth();

  return (
    <div>
      <Navbar />
      <Outlet />

      <Spacer height={"300px"} />
      <Footer />

      <ToastContainer
        style={{
          width: "260px",
        }}
      />
    </div>
  );
};

export default Layout;

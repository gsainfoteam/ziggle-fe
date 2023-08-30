import { useContext } from "react";
import MobileContext from "src/layout/MobileContext";

const useIsMobile = () => {
  const context = useContext(MobileContext);

  if (!context) {
    throw new Error("useIsMobile must be used within a MobileProvider");
  }

  return context.isMobile;
};

export default useIsMobile;

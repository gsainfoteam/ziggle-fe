import { createContext } from "react";

interface MobileContextProps {
  isMobile: boolean;
}

const MobileContext = createContext<MobileContextProps | undefined>(undefined);

export default MobileContext;

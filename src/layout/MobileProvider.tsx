import React, { useEffect, useState } from "react";

import MobileContext from "./MobileContext";

interface MobileProviderProps {
  children: React.ReactNode;
  breakpoint?: number;
}

const MobileProvider = ({
  children,
  breakpoint = 768,
}: MobileProviderProps) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  return (
    <MobileContext.Provider value={{ isMobile }}>
      {children}
    </MobileContext.Provider>
  );
};

export default MobileProvider;

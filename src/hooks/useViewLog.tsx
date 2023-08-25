import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LogEvents from "src/apis/log/log-event";
import sendLog from "src/apis/log/sendLog";

const useViewLog = () => {
  const location = useLocation();

  useEffect(() => {
    sendLog(LogEvents.ScreenView, {
      path: location.pathname,
    });
  }, [location.pathname]);
};

export default useViewLog;

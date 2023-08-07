import { useAtom } from "jotai";
import { useEffect } from "react";
import { useJwt } from "react-jwt";
import { isLoggedInAtom } from "src/store";

import useLoginJwt from "./useLoginJwt";

const useLogin = () => {
  const [, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const token = localStorage.getItem("access_token") || "";
  const { isExpired } = useJwt(token);
  const { jwt_token } = useLoginJwt();

  useEffect(() => {
    if (isExpired || !token) {
      setIsLoggedIn(false);
      localStorage.removeItem("access_token");
    } else {
      console.log("로그인 상태 유지");
      setIsLoggedIn(true);
    }
  }, [isExpired, setIsLoggedIn, token]);

  useEffect(() => {
    if (jwt_token) {
      localStorage.setItem("access_token", jwt_token);
      setIsLoggedIn(true);
    }
  }, [jwt_token, setIsLoggedIn]);
};

export default useLogin;

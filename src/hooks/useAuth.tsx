import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import queryKeys from "src/apis/queryKeys";
import { getUserInfo, loginWithIdp } from "src/apis/user/user-api";

const useAuth = ({ redirectUrl = "/" } = {}) => {
  const { data: userInfo, isError } = useQuery(
    [queryKeys.getUserInfo],
    getUserInfo,
  );

  const navigate = useNavigate();
  const [query] = useSearchParams();

  useEffect(() => {
    const handleLogin = async () => {
      const code = query.get("code");
      if (code) {
        const isLoggedIn = await loginWithIdp({
          code,
        });

        if (isLoggedIn) {
          query.delete("code");
          return true;
        } else {
          navigate(redirectUrl);
          return false;
        }
      }

      if (isError) {
        navigate(redirectUrl);
      }
    };

    handleLogin();
  }, [isError, navigate, query, redirectUrl]);

  return { userInfo };
};

export default useAuth;

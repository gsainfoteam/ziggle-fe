import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import queryKeys from "src/apis/queryKeys";
import { getUserInfo, loginWithIdp } from "src/apis/user/user-api";
import Highlight from "src/atoms/highlight/Highlight";
import Text from "src/atoms/text/Text";
import colorSet from "src/styles/colorSet";
import Font from "src/styles/font";
import Paths from "src/types/paths";

const useAuth = ({ redirectUrl }: { redirectUrl?: Paths } = {}) => {
  const [query, setQuery] = useSearchParams();

  const {
    data: userInfo,
    isError,
    isLoading,
  } = useQuery([queryKeys.getUserInfo], getUserInfo, {
    retry: false,
    enabled: !query.has("code"),
  });

  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleLogin = async () => {
      const code = query.get("code");

      if (code) {
        const isLoggedIn = await loginWithIdp({
          code,
        });
        if (isLoggedIn) {
          await queryClient.invalidateQueries([queryKeys.getUserInfo]);
          setQuery();
        }

        return;
      }

      if (isError && redirectUrl) {
        navigate(redirectUrl);
      }
    };

    handleLogin();
  }, [isError, navigate, query, queryClient, redirectUrl, setQuery]);

  useEffect(() => {
    const pathname = location.pathname as Paths;

    if (!redirectUrl) return;
    if (isLoading) return;
    if (userInfo) return;

    toast(
      <Text color={colorSet.primary} textAlign={"right"} size={"0.9375rem"}>
        공지를 작성하고 리마인드하려면 <br />
        <Highlight font={Font.Bold}>로그인</Highlight>해주세요!
      </Text>,
      {
        className: "toast-primary-colored",
        autoClose: false,
        closeButton: false,
      },
    );

    navigate(redirectUrl, {
      state: { from: pathname },
    });
  }, [isLoading, location, navigate, redirectUrl, userInfo]);

  return { userInfo };
};

export default useAuth;

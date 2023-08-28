import { useQuery } from "@tanstack/react-query";
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

const loginRequiredPaths = [Paths.myPage, Paths.noticeWriting];

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

  useEffect(() => {
    const handleLogin = async () => {
      const code = query.get("code");

      if (code) {
        const isLoggedIn = await loginWithIdp({
          code,
        });
        if (isLoggedIn) {
          setQuery();
        }

        return;
      }

      if (isError && redirectUrl) {
        navigate(redirectUrl);
      }
    };

    handleLogin();
  }, [isError, navigate, query, redirectUrl, setQuery]);

  useEffect(() => {
    const pathname = location.pathname as Paths;

    if (!redirectUrl) return;
    if (isLoading) return;
    if (userInfo) return;
    
    toast(
      <Text color={colorSet.primary} textAlign={"right"}>
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

/*

  useAuth 내에서 queryString에 code가 있을 시 로그인 시키는 것까지 전부 처리하려 했는데
  그러면 useAuth가 중복으로 사용될 경우, 비동기적으로 작동하기에 code로 여러번 로그인을 시도해서 첫번째 시도 말고는 실패하고 로그인 실패로 간주되는 문제가 있었습니다.
  그래서 결국 급한대로 useLogin을 따로 분리해서 home 컴포넌트에서만 사용하게 했는데 다른 좋은 아이디어가 있다면 리팩토링해주세요.

*/

export default useAuth;

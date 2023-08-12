import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import queryKeys from "src/apis/queryKeys";
import { getUserInfo } from "src/apis/user/user-api";

const useAuth = ({ redirectUrl }: { redirectUrl?: string } = {}) => {
  const { data: userInfo, isError } = useQuery(
    [queryKeys.getUserInfo],
    getUserInfo,
    {
      retry: false,
    },
  );

  const navigate = useNavigate();
  const [query] = useSearchParams();

  useEffect(() => {
    if (isError && redirectUrl) {
      navigate(redirectUrl);
    }
  }, [isError, navigate, query, redirectUrl]);

  return { userInfo };
};

/*

  useAuth 내에서 queryString에 code가 있을 시 로그인 시키는 것까지 전부 처리하려 했는데
  그러면 useAuth가 중복으로 사용될 경우, 비동기적으로 작동하기에 code로 여러번 로그인을 시도해서 첫번째 시도 말고는 실패하고 로그인 실패로 간주되는 문제가 있었습니다.
  그래서 결국 급한대로 useLogin을 따로 분리해서 home 컴포넌트에서만 사용하게 했는데 다른 좋은 아이디어가 있다면 리팩토링해주세요.

*/

export default useAuth;

import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { loginWithIdp } from "src/apis/user/user-api";

const useLogin = () => {
  const [query] = useSearchParams();

  useEffect(() => {
    const handleLogin = async () => {
      const code = query.get("code");

      if (!code) return;
      const isLoggedIn = await loginWithIdp({
        code,
      });

      if (isLoggedIn) {
        console.log("로그인 성공");
        query.delete("code"); // 이거 이상하게 작동 안함
      }
    };

    handleLogin();
  }, [query]);
};

export default useLogin;

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import queryKeys from "src/apis/queryKeys";
import { loginWithIdp } from "src/apis/user/user-api";

const useLoginJwt = () => {
  const [query] = useSearchParams();

  const { data } = useQuery(
    [queryKeys.loginWithIdp, query.get("code") || ""],
    loginWithIdp,
    {
      enabled: query.get("code") != null,
    },
  );

  return { jwt_token: data?.jwt_token };
};

export default useLoginJwt;

// useQuery에서 더이상 onSuccess를 사용할 수 없어 이렇게 처리
// ref: https://velog.io/@cnsrn1874/breaking-react-querys-api-on-purpose

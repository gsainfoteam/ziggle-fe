import LoginResponse from "src/models/login-response";
import { User } from "src/types/types";

import { apiGetter } from "../interceptor/interceptor";

export const goToIdp = () => {
  console.log(import.meta.env.NODE_ENV);

  const idp_url = `${
    import.meta.env.VITE_IDP_URL
  }/authorize?client_id=ziggle2023&redirect_uri=${
    (import.meta.env.DEV ? "http://" : "https://") + window.location.host
  }&scope=openid%20profile%20email%20student_id&response_type=code`;

  window.location.href = idp_url;
};

export const loginWithIdp = async ({
  queryKey,
}: {
  queryKey: [string, string];
}) => {
  const [, code] = queryKey;

  const { data } = await apiGetter<LoginResponse>("/user/login?code=" + code);

  return data;
};

export const getUserInfo = async ({ queryKey }: { queryKey: [string] }) => {
  const [,] = queryKey;

  const { data } = await apiGetter<User>("/user/info");

  return data;
};

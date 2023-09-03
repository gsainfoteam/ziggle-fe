import LoginResponse from "src/models/login-response";
import { User } from "src/types/types";

import { apiGetter, apiPoster } from "../interceptor/interceptor";

export const goToIdp = () => {
  const idp_url = `${
    import.meta.env.VITE_IDP_URL
  }/authorize?client_id=ziggle2023&redirect_uri=${
    (import.meta.env.DEV ? "http://" : "https://") + window.location.host
  }&scope=openid%20profile%20email%20student_id%20offline_access&response_type=code&prompt=consent`;

  window.location.href = idp_url;
};

export const loginWithIdp = async ({ code }: { code: string }) => {
  const response = await apiGetter<LoginResponse>("/user/login?code=" + code);

  if (response.status === 200) {
    localStorage.setItem("access_token", response.data.access_token);
    return true;
  }

  return false;
};

export const getUserInfo = async ({ queryKey }: { queryKey: [string] }) => {
  const [,] = queryKey;

  const { data } = await apiGetter<User>("/user/info");

  return data;
};

export const logout = async () => {
  await apiPoster("/user/logout", {
    access_token: localStorage.getItem("access_token"),
  });
  localStorage.removeItem("access_token");
  window.location.href = "/";
};

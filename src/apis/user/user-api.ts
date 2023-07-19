import LoginResponse from "src/models/login-response";
import { apiGetter } from "../interceptor/interceptor";

export const loginWithIdp = async ({
  queryKey,
}: {
  queryKey: [string, string];
}) => {
  const [, auth_code] = queryKey;

  const { data } = await apiGetter<LoginResponse>(
    "/user/login?auth_code=" + auth_code,
  );

  return data;
};

export const findUserWithEmail = async ({
  queryKey,
}: {
  queryKey: [string, string];
}) => {
  const [, email] = queryKey;

  const { data } = await apiGetter<LoginResponse>("/user/find?email=" + email);

  return data;
};

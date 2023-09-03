import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import LoginResponse from "src/models/login-response";

const interceptor = axios.create();

interceptor.interceptors.request.use(
  (config) => {
    // Do something before request is sent

    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.authorization = "Bearer " + token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add a response interceptor
interceptor.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!(error instanceof AxiosError)) throw error;
    if (error.response?.status !== 401) throw error;
    const config = error.config as
      | (InternalAxiosRequestConfig & {
          _retried?: boolean;
        })
      | undefined;
    if (!config) throw error;
    if (config.url?.endsWith("/user/refresh")) throw error;
    if (config._retried) throw error;
    config._retried = true;

    const res = await interceptor.post<LoginResponse>(
      import.meta.env.VITE_DOMAIN + "/user/refresh",
    );
    if (res.status !== 201) throw error;
    localStorage.setItem("access_token", res.data.access_token);
    return interceptor.request(config);
  },
);

export const apiGetter = async <T>(
  path: string,
  params?: any,
): Promise<AxiosResponse<T>> => {
  return await interceptor.get(import.meta.env.VITE_DOMAIN + path, { params });
};

export const apiPoster = async <T>(
  path: string,
  data?: any,
): Promise<AxiosResponse<T>> => {
  return await interceptor.post(import.meta.env.VITE_DOMAIN + path, data);
};

export const apiPatcher = async <T>(
  path: string,
  data?: any,
): Promise<AxiosResponse<T>> => {
  return await interceptor.patch(import.meta.env.VITE_DOMAIN + path, data);
};

export const apiDeleter = async <T>(
  path: string,
  data?: any,
): Promise<AxiosResponse<T>> => {
  return await interceptor.delete(import.meta.env.VITE_DOMAIN + path, data);
};

import axios, { AxiosResponse } from "axios";

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
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
interceptor.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response;
  },
  (error) => {
    // Do something with response error
    return Promise.reject(error);
  },
);

export const apiGetter = async <T>(path: string): Promise<AxiosResponse<T>> => {
  return await interceptor.get(import.meta.env.VITE_DOMAIN + path);
};

export const apiPoster = async <T>(
  path: string,
  data: any,
): Promise<AxiosResponse<T>> => {
  return await interceptor.post(import.meta.env.VITE_DOMAIN + path, data);
};

export const apiPatcher = async <T>(
  path: string,
  data: any,
): Promise<AxiosResponse<T>> => {
  return await interceptor.patch(import.meta.env.VITE_DOMAIN + path, data);
};

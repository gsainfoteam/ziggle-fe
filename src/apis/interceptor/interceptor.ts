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
    // 로그인 에러 & 리다이렉트를 보성이가 보여준 코드처럼 useAuth 내에서 처리하려고 하는데 그럼 만약 useAuth로 테스트 할 때는 valid했지만 공지 등록 버튼을 누르는 사이 토큰이 만료된 케이스는 어떻게 처리해야 할까요
    return Promise.reject(error);
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

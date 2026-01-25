import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 30000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

function httpService<T = any>() {
  return {
    get: (url: string, config?: AxiosRequestConfig): Promise<T> =>
      axiosInstance
        .get<T>(url, config)
        .then((res: AxiosResponse<T>) => res.data),

    post: (
      url: string,
      data?: unknown,
      config?: AxiosRequestConfig
    ): Promise<T> =>
      axiosInstance
        .post<T>(url, data, config)
        .then((res: AxiosResponse<T>) => res.data),

    put: (
      url: string,
      data?: unknown,
      config?: AxiosRequestConfig
    ): Promise<T> =>
      axiosInstance
        .put<T>(url, data, config)
        .then((res: AxiosResponse<T>) => res.data),

    delete: (url: string, config?: AxiosRequestConfig): Promise<T> =>
      axiosInstance
        .delete<T>(url, config)
        .then((res: AxiosResponse<T>) => res.data),
  };
}

export default httpService;

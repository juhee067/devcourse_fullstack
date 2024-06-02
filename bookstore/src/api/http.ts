import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const BASE_URL = 'http://localhost:3000';
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'content-type': 'application/json',
    },
    withCredentials: true,
    ...config,
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export const httpClient = createClient();

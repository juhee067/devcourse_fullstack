import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getToken, removeToken } from '../store/authStore';

const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'content-type': 'application/json',
      Authorization: getToken() ? getToken() : '',
    },
    withCredentials: true,
    ...config,
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.statusCode === 401) {
        removeToken();
        window.location.href = '/login';
        return;
      }
      return Promise.reject(error);
      //로그인 만료 처리
    }
  );

  return axiosInstance;
};

export const httpClient = createClient();

// 공통 요청부분

type RequestMethod = 'get' | 'post' | 'put' | 'delete';

export const requestHandler = async <T>(method: RequestMethod, url: string, payload?: T) => {
  let response;

  switch (method) {
    case 'post':
      response = await httpClient.post(url, payload);
      break;
    case 'get':
      response = await httpClient.get(url);
      break;
    case 'put':
      response = await httpClient.put(url, payload);
      break;
    case 'delete':
      response = await httpClient.delete(url);
      break;
    default:
      throw new Error(`Unsupported request method: ${method}`);
  }

  return response.data;
};

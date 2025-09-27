import axios from 'axios';
import type {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export const ApiPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: import.meta.env.VITE_API_TIMEOUT,
  headers: { 'Content-Type': 'application/json' },
});

export const ApiPrivate = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: import.meta.env.VITE_API_TIMEOUT,
  headers: { 'Content-Type': 'application/json' },
});

ApiPrivate.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers?.set('Authorization', `Bearer ${token}`);
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

export const get = async <T>(url: string, privateReq = false) => {
  const api = privateReq ? ApiPrivate : ApiPublic;
  const res: AxiosResponse<T> = await api.get(url);
  return { data: res.data, status: res.status } as ApiResponse<T>;
};

export const post = async <T, B = unknown>(
  url: string,
  body?: B,
  privateReq = false
) => {
  const api = privateReq ? ApiPrivate : ApiPublic;
  const res: AxiosResponse<T> = await api.post(url, body);
  return { data: res.data, status: res.status } as ApiResponse<T>;
};

export const put = async <T, B = unknown>(
  url: string,
  body?: B,
  privateReq = false
) => {
  const api = privateReq ? ApiPrivate : ApiPublic;
  const res: AxiosResponse<T> = await api.put(url, body);
  return { data: res.data, status: res.status } as ApiResponse<T>;
};

export const del = async <T>(url: string, privateReq = false) => {
  const api = privateReq ? ApiPrivate : ApiPublic;
  const res: AxiosResponse<T> = await api.delete(url);
  return { data: res.data, status: res.status } as ApiResponse<T>;
};

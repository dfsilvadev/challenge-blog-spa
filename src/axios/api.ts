import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';

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

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as
      | { message?: string; details?: string; error?: boolean }
      | undefined;

    if (data?.details) return data.details;
    if (data?.message) return data.message;

    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

async function handleRequest<T>(
  promise: Promise<AxiosResponse<T>>
): Promise<ApiResponse<T>> {
  try {
    const res = await promise;
    return {
      data: res.data,
      status: res.status,
      message: (res.data as unknown as { message?: string })?.message,
    };
  } catch (err) {
    throw new Error(getErrorMessage(err));
  }
}
type QueryParams = URLSearchParams | Record<string, string | number | boolean>;

export const get = async <T>(
  url: string,
  privateReq = false,
  params?: QueryParams
) => {
  const api = privateReq ? ApiPrivate : ApiPublic;
  return handleRequest<T>(api.get(url, { params }));
};

export const post = async <T, B = unknown>(
  url: string,
  body?: B,
  privateReq = false
) => {
  const api = privateReq ? ApiPrivate : ApiPublic;
  return handleRequest<T>(api.post(url, body));
};

export const put = async <T, B = unknown>(
  url: string,
  body?: B,
  privateReq = false
) => {
  const api = privateReq ? ApiPrivate : ApiPublic;
  return handleRequest<T>(api.put(url, body));
};

export const patch = async <T, B = unknown>(
  url: string,
  body?: B,
  privateReq = false
) => {
  const api = privateReq ? ApiPrivate : ApiPublic;
  return handleRequest<T>(api.patch(url, body));
};

export const del = async <T>(url: string, privateReq = false) => {
  const api = privateReq ? ApiPrivate : ApiPublic;
  return handleRequest<T>(api.delete(url));
};

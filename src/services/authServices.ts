import { post } from './api';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  details: {
    token: string;
  };
}

export const login = async (payload: LoginRequest): Promise<LoginResponse> => {
  const res = await post<LoginResponse, LoginRequest>(
    '/auth/login',
    payload,
    false
  );
  if (res.data.details.token)
    localStorage.setItem('token', res.data.details.token);
  return res.data;
};

export const logout = () => localStorage.removeItem('token');

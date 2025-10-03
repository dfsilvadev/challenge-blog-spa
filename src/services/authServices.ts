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

export const sendLogin = (payload: LoginRequest) =>
  post<LoginResponse, LoginRequest>('/auth/login', payload, false);

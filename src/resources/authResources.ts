import { post } from '../axios/api';
import type {
  LoginRequest,
  LoginResponse,
} from '../presenters/components/ui/auth';

export const sendLogin = (payload: LoginRequest) =>
  post<LoginResponse, LoginRequest>('/auth/login', payload, false);

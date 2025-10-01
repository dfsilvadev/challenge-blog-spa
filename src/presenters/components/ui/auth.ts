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

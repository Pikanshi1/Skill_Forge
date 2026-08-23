export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthData {
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface UpdateProfileRequest {
  name: string;
  email: string;
  avatar?: string;
}
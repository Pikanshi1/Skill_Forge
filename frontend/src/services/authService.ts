import api from "./api";

import {
  LoginRequest,
  RegisterRequest,
  ApiResponse,
  AuthData,
} from "@/types/auth";

class AuthService {
  async register(data: RegisterRequest) {
    const response = await api.post<ApiResponse<AuthData>>(
      "/auth/register",
      data
    );

    return response.data;
  }

  async login(data: LoginRequest) {
    const response = await api.post<ApiResponse<AuthData>>(
      "/auth/login",
      data
    );

    return response.data;
  }

  async profile() {
    const response = await api.get<ApiResponse<AuthData>>(
      "/auth/profile"
    );

    return response.data;
  }

  async logout() {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout API failed:", error);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  async forgotPassword(email: string) {
    const response = await api.post<ApiResponse<{ message: string }>>(
      "/auth/forgot-password",
      {
        email,
      }
    );

    return response.data;
  }

  async resetPassword(
    token: string,
    password: string,
    confirmPassword: string
  ) {
    const response = await api.post<ApiResponse<{ message: string }>>(
      "/auth/reset-password",
      {
        token,
        password,
        confirmPassword,
      }
    );

    return response.data;
  }

  async updateProfile(data: {
    name: string;
    email: string;
    avatar?: string;
  }) {
    const response = await api.patch<
      ApiResponse<AuthData>
    >("/auth/profile", data);
    return response.data;
  }

  async changePassword(data: {
    currentPassword: string;
    newPassword: string;
  }) {
    const response = await api.patch<
      ApiResponse<{ message: string }>
    >("/auth/change-password", data);

    return response.data;
  }

  async deleteAccount() {
    const response = await api.delete<
      ApiResponse<null>
    >("/auth/delete-account");

    return response.data;
  }
}

const authService = new AuthService();
export default authService;
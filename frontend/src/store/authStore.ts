"use client";

import { create } from "zustand";
import authService from "@/services/authService";

import {
  LoginRequest,
  RegisterRequest,
  User,
} from "@/types/auth";

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;

  register: (data: RegisterRequest) => Promise<void>;
  login: (data: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (
    token: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
  updateProfile: (data: { name: string; email: string; avatar?: string }) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  deleteAccount: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  token:
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null,

  loading: false,

  isAuthenticated:
    typeof window !== "undefined"
      ? !!localStorage.getItem("token")
      : false,

  register: async (data) => {
    set({ loading: true });

    try {
      await authService.register(data);
    } finally {
      set({ loading: false });
    }
  },

  login: async (data) => {
    set({ loading: true });

    try {
      const response = await authService.login(data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      set({
        token: response.data.token,
        user: response.data.user,
        isAuthenticated: true,
      });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    set({ loading: true });

    try {
      await authService.logout();

      set({
        token: null,
        user: null,
        isAuthenticated: false,
      });
    } finally {
      set({ loading: false });
    }
  },

  forgotPassword: async (email: string) => {
    set({ loading: true });

    try {
      await authService.forgotPassword(email);
    } finally {
      set({ loading: false });
    }
  },

  resetPassword: async (token, password, confirmPassword) => {
    set({ loading: true });

    try {
      await authService.resetPassword(token, password, confirmPassword);
    } finally {
      set({ loading: false });
    }
  },

  loadUser: async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const response = await authService.profile();

      set({
        token,
        user: response.data.user,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error("Failed to load user:", error);

      set({
        token: null,
        user: null,
        isAuthenticated: false,
      });
    }
  },

  updateProfile: async (data: { name: string; email: string; avatar?: string }) => {
    set({ loading: true });

    try {
      const response = await authService.updateProfile(data);

      localStorage.setItem("user", JSON.stringify(response.data.user));

      set({
        user: response.data.user,
      });
    } finally {
      set({ loading: false });
    }
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    set({ loading: true });

    try {
      await authService.changePassword({
        currentPassword,
        newPassword,
      });
    } finally {
      set({ loading: false });
    }
  },

  deleteAccount: async () => {
    set({ loading: true });

    try {
      await authService.deleteAccount();

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      set({
        token: null,
        user: null,
        isAuthenticated: false,
      });
    } finally {
      set({ loading: false });
    }
  },
}));

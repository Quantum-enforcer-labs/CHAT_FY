import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "../store/useAuth";
import type { User, Credentials } from "../types/types";
import { useNavigate } from "@tanstack/react-router";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export function useSignup() {
  const setAuthUser = useAuthStore((s) => s.setAuthUser);
  const connectSocket = useAuthStore((s) => s.connectSocket);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["signup"],
    mutationFn: async (data: User) => {
      try {
        const response = await axiosInstance.post<{ user: User }>(
          "/auth/sign-up",
          data
        );
        return response.data;
      } catch (err: unknown) {
        const error = err as AxiosError<{ message?: string }>;
        const message = error.response?.data?.message ?? "Signup failed";
        throw new Error(message);
      }
    },
    onSuccess: (data) => {
      setAuthUser(data.user);
      connectSocket();
      toast.success("Account created successfully");
      navigate({ to: "/" });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: Error) => {
      setAuthUser(null);
      toast.error(error.message);
      console.error("Signup error:", error.message);
    },
  });
}

export function useLogin() {
  const setAuthUser = useAuthStore((s) => s.setAuthUser);
  const connectSocket = useAuthStore((s) => s.connectSocket);
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: Credentials) => {
      try {
        const response = await axiosInstance.post<{ user: User }>(
          "/auth/login",
          data
        );
        return response.data;
      } catch (err: unknown) {
        const error = err as AxiosError<{ message?: string }>;
        const message = error.response?.data?.message ?? "Login failed";
        throw new Error(message);
      }
    },
    onSuccess: (data) => {
      setAuthUser(data.user);
      connectSocket();
      toast.success("Logged in successfully");
      navigate({ to: "/" });
    },
    onError: (error: Error) => {
      setAuthUser(null);
      toast.error(error.message);
      console.error("Login error:", error.message);
    },
  });
}

export function useLogout() {
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const disconnectSocket = useAuthStore((s) => s.disconnectSocket);
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      try {
        await axiosInstance.post("/auth/logout");
      } catch (err: unknown) {
        const error = err as AxiosError<{ message?: string }>;
        const message = error.response?.data?.message ?? "Logout failed";
        throw new Error(message);
      }
    },
    onSuccess: () => {
      disconnectSocket();
      clearAuth();
      toast.success("Logged out successfully");
      navigate({ to: "/auth/login" });
    },
    onError: (error: Error) => {
      toast.error(error.message);
      console.error("Logout error:", error.message);
    },
  });
}

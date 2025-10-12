import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "../store/useAuth";
import type { User, Credentials } from "../types/types";
import { useNavigate } from "@tanstack/react-router";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export function useSignup() {
  const setAuthUser = useAuthStore((s) => s.setAuthUser);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const connectSocket = useAuthStore((s) => s.connectSocket);

  return useMutation({
    mutationKey: ["user"],
    mutationFn: async (data: User) => {
      try {
        const response = await axiosInstance.post<{
          user: User;
        }>("/auth/sign-up", data);
        return response.data;
      } catch (err: unknown) {
        const error = err as AxiosError<{ message: string }>;
        if (error.response && error.response.data) {
          throw error.response.data;
        }
      }
      throw { message: "Network error" };
    },
    onSuccess: (data) => {
      setAuthUser(data.user);
      toast.success("Account created successfully");
      connectSocket();
      navigate({ to: "/" });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      setAuthUser(null);
      console.error("Error during signup:", error);
    },
  });
}

export function useLogin() {
  const setAuthUser = useAuthStore((s) => s.setAuthUser);
  const navigate = useNavigate();

  const connectSocket = useAuthStore((s) => s.connectSocket);

  return useMutation({
    mutationFn: async (data: Credentials) => {
      try {
        const response = await axiosInstance.post<{
          user: User;
        }>("/auth/login", data);
        return response.data;
      } catch (err: unknown) {
        const error = err as AxiosError<{ message: string }>;
        if (error.response && error.response.data) {
          throw error.response.data;
        }
      }
      throw { message: "Network error" };
    },
    onSuccess: (data) => {
      setAuthUser(data.user);
      navigate({ to: "/" });
      toast.success("Logged in successfully");
      connectSocket();
    },
    onError: (error) => {
      setAuthUser(null);
      console.error("Error during login:", error);
    },
  });
}

export function useLogout() {
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const navigate = useNavigate();

  const disconnectSocket = useAuthStore((s) => s.disconnectSocket);

  return useMutation({
    mutationFn: async () => {
      await axiosInstance.post("/auth/logout");
    },
    onSuccess: () => {
      clearAuth();
      navigate({ to: "/auth/login" });
      toast.success("Logged out successfully");
      disconnectSocket();
    },
  });
}

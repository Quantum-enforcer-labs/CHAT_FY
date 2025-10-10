import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import type { User, UpdateProfileData } from "../types/types";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

interface AuthState {
  authUser: User | null;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
  setAuthUser: (user: User | null) => void;
  clearAuth: () => void;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check-auth");

      const userData =
        res.data && res.data.message ? res.data.message : res.data;

      set({ authUser: userData });
    } catch (error) {
      console.error("Error checking auth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  setAuthUser: (user) => set({ authUser: user }),
  clearAuth: () => set({ authUser: null }),

  updateProfile: async (data) => {
    try {
      const formData = new FormData();
      if (data.avatar) formData.append("image", data.avatar);

      const res = await axiosInstance.put("/auth/update-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // ✅ Handle both response shapes again
      const updatedUser =
        res.data && res.data.message ? res.data.message : res.data;

      set({ authUser: updatedUser });
      toast.success("Profile updated successfully");
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      const message = error.response?.data?.message ?? "Error updating profile";
      toast.error(message);
      throw new Error(message);
    }
  },
}));

// store/authStore.ts
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import type { User } from "../types/types";

interface authState {
  authUser: User | null;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
  setAuthUser: (user: User | null) => void;
}

export const useAuthStore = create<authState>((set) => ({
  authUser: null,
  isCheckingAuth: true,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check-auth");

      set({ authUser: res.data });
    } catch (error) {
      console.error("Error in checking auth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  setAuthUser: (user: User | null) => set({ authUser: user }),
}));

import { create } from "zustand";
import type { Contact } from "../types/types";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

interface chatState {
  allContacts: Contact[];
  chats: [];
  messages: [];
  activeTab: "chats" | null;
  selectedUser: null;
  isUserLoading: boolean;
  isChatLoading: boolean;
  isSoundOn: boolean;
  toggleSound: () => void;
  setActiveTab: (tab: null) => void;
  setSelectedUser: (user: null) => void;
  getAllContacts: () => void;
  getMyChatParteners: () => void;
}

export const useChatStore = create<chatState>((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: null,
  selectedUser: null,
  isUserLoading: false,
  isChatLoading: false,
  isSoundOn: localStorage.getItem("isSoundOn") === "true",

  toggleSound: () => {
    localStorage.setItem("isSoundOn", String(!get().isSoundOn));
    set((state) => ({ isSoundOn: !state.isSoundOn }));
  },
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  getAllContacts: async () => {
    set({ isUserLoading: true });

    try {
      const res = await axiosInstance.get("/messages/chats");
      set({ allContacts: res.data });
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(
        error.response &&
          error.response.data &&
          (error.response.data as { message?: string }).message
          ? (error.response.data as { message?: string }).message!
          : "Error getting contacts"
      );
    } finally {
      set({ isUserLoading: false });
    }
  },
  getMyChatParteners: async () => {
    set({ isChatLoading: true });

    try {
      const res = await axiosInstance.get("/messages/chats");

      set({ chats: res.data });
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(
        error.response &&
          error.response.data &&
          (error.response.data as { message?: string }).message
          ? (error.response.data as { message?: string }).message!
          : "Error getting chats"
      );
    } finally {
      set({ isChatLoading: false });
    }
  },
}));

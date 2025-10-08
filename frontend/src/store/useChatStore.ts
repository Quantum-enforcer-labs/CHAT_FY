import { create } from "zustand";
import type { Contact, Message } from "../types/types";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

// Define the store state interface
interface ChatState {
  allContacts: Contact[];
  chats: Contact[];
  messages: Message[];
  activeTab: "chats" | "contacts" | null;
  selectedUser: Contact | null;
  isUserLoading: boolean;
  isChatLoading: boolean;
  isSoundOn: boolean;
  isMessageLoading: boolean;
  toggleSound: () => void;
  setActiveTab: (tab: "chats" | "contacts" | null) => void;
  setSelectedUser: (user: Contact | null) => void;
  getAllContacts: () => Promise<void>;
  getMyChatParteners: () => Promise<void>;
  getMessagesByUserId: (id: string) => Promise<void>;
}

// Create the store
export const useChatStore = create<ChatState>((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  isMessageLoading: false,
  activeTab: null,
  selectedUser: null,
  isUserLoading: false,
  isChatLoading: false,
  isSoundOn:
    typeof window !== "undefined"
      ? localStorage.getItem("isSoundOn") === "true"
      : true,

  toggleSound: () => {
    const newValue = !get().isSoundOn;
    localStorage.setItem("isSoundOn", String(newValue));
    set({ isSoundOn: newValue });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (user) => set({ selectedUser: user }),

  getAllContacts: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/messages/contacts"); // Ensure endpoint is correct
      set({ allContacts: res.data });
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      toast.error(error.response?.data?.message ?? "Error getting contacts");
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMyChatParteners: async () => {
    set({ isChatLoading: true });
    try {
      const res = await axiosInstance.get("/messages/chats"); // Ensure endpoint is correct
      set({ chats: res.data });
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      toast.error(error.response?.data?.message ?? "Error getting chats");
    } finally {
      set({ isChatLoading: false });
    }
  },

  getMessagesByUserId: async (id) => {
    set({ isMessageLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${id}`); // Ensure endpoint is correct
      set({ messages: res.data });
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      toast.error(error.response?.data?.message ?? "Error getting messages");
    } finally {
      set({ isMessageLoading: false });
    }
  },
}));

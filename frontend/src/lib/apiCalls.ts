import { apiFetch } from "./axios";
import type { User } from "../types/types";

export const signUpUser = async (userData: User) => {
  const response = await apiFetch("/auth/sign-up", {
    method: "POST",
    body: JSON.stringify(userData),
  });
  return response as User;
};

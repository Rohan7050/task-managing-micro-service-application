import { STORAGE_CONSTANTS } from "@/utils/constants";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserType = {
  id: string;
  email: string;
} | null;

interface AuthState {
  user: UserType;
  setAuth: (user: UserType, isLogin: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isUser: true,
      setAuth: (user: UserType, isLogin: boolean) => {
        localStorage.setItem(STORAGE_CONSTANTS.isLogin, `${isLogin}`);
        set({ user });
      },
      logout: () => {
        localStorage.removeItem(STORAGE_CONSTANTS.isLogin);
        set({ user: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

import { User } from "@customTypes/user";
import { UserStoreType } from "store/types/userStoreType";
import { create } from "zustand";

export const useUserStore = create<UserStoreType>((set) => ({
  user: null,
  setUser: (data: User) => set(() => ({ user: data })),
  clearUser: () => {
    set({ user: null });
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  },
}));

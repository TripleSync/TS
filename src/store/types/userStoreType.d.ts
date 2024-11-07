import { User } from "@customTypes/user";

export type UserStoreType = {
  user: User | null;
  setUser: (data: User) => void;
  clearUser: () => void;
};

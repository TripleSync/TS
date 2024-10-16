import { User } from "../../types/user";

export type ChatStoreType = {
  chatList: Chat[];
  setChatList: (data: Chat) => void;
};

export type Chat = {
  user: User;
  text: string;
  time: Date;
};

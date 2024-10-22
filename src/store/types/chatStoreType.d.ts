import { Chat } from "../../types/chat";

export type ChatStoreType = {
  chatList: Chat[];
  setChatList: (data: Chat) => void;
};

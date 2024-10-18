import { create } from "zustand";
import { Chat } from "../../types/chat";
import { ChatStoreType } from "../types/chatStoreType";

export const useChatStore = create<ChatStoreType>((set) => ({
  chatList: [],
  setChatList: (data: Chat) => set((state) => ({ chatList: [...state.chatList, data] })),
}));

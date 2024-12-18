import profile from "@assets/user1.svg";
import ChatInput from "@components/ClassRoom/Chatting/ChatInput";
import ChatMessage from "@components/ClassRoom/Chatting/ChatMessage";
import type { Chat } from "@customTypes/chat";
import { SocketProps } from "@customTypes/socket";
import { useSocketEmit } from "hooks/useSocketEmit";
import { useSocketEvent } from "hooks/useSocketEvent";
import { useCallback, useEffect, useRef, useState } from "react";
import { PiChatTeardropTextFill } from "react-icons/pi";
import { useChatStore } from "store/actions/useChatStore";
import { useUserStore } from "store/actions/useUserStore";

const port = window.location.port;

const Chat = ({ socket, isConnected }: SocketProps) => {
  const user = useUserStore((state) => state.user);
  const userName = user?.name ?? port;
  const profileUrl = user?.profileUrl?.length ? user.profileUrl : profile;
  const [isChat, setIsChat] = useState(false);
  const chatList = useChatStore((state) => state.chatList);
  const setChatList = useChatStore((state) => state.setChatList);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const emit = useSocketEmit(socket, isConnected);

  useSocketEvent(socket, isConnected, "message", (message: Chat) => {
    setChatList(message);
  });

  // 스크롤 자동 내리기 기능
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatList]);

  const sendMessage = useCallback(
    (text: string) => {
      emit("message", { user: { name: userName, profileUrl: profileUrl }, text: text, time: new Date() });
    },
    [socket, user]
  );

  return (
    <>
      <section
        id="chatting"
        className={`fixed bottom-9 right-3 flex h-5/6 w-[450px] flex-col rounded-md border-2 border-gray-300 bg-white transition-transform duration-300 ${
          isChat ? "translate-x-0" : "translate-x-full"
        }`}>
        <ul className="flex-grow overflow-y-auto p-4">
          {chatList.map((chat, index) => (
            <ChatMessage key={index} chat={chat} name={userName} />
          ))}
          <div ref={chatEndRef} />
        </ul>
        <ChatInput sendMessage={sendMessage} />
      </section>
      <button className="fixed bottom-2 right-0" onClick={() => setIsChat((prev) => !prev)}>
        <PiChatTeardropTextFill className="text-5xl text-primary" />
      </button>
    </>
  );
};
export default Chat;

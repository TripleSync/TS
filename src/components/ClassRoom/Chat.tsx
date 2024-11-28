import profile from "@assets/user1.svg";
import ChatInput from "@components/ClassRoom/Chatting/ChatInput";
import ChatMessage from "@components/ClassRoom/Chatting/ChatMessage";
import type { Chat } from "@customTypes/chat";
import { User } from "@customTypes/user";
import { useCallback, useEffect, useRef, useState } from "react";
import { PiChatTeardropTextFill } from "react-icons/pi";
import io from "socket.io-client";
import { useChatStore } from "store/actions/useChatStore";

const socket = io("localhost:5000");

const Chat = () => {
  const [userName, setUserName] = useState("user1");
  const [isChat, setIsChat] = useState(false);
  const chatList = useChatStore((state) => state.chatList);
  const setChatList = useChatStore((state) => state.setChatList);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const user: User = { userName: userName, profileUrl: profile };

  useEffect(() => {
    const handleMessage = (message: Chat) => {
      setChatList(message);
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, []);

  // 스크롤 자동 내리기 기능
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatList]);

  const sendMessage = useCallback(
    (text: string) => {
      socket.emit("message", { user: user, text: text, time: new Date() });
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
            <ChatMessage key={index} chat={chat} userName={userName} />
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

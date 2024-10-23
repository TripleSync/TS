import profile from "@assets/user1.svg";
import type { Chat } from "@customTypes/chat";
import { User } from "@customTypes/user";
import { useCallback, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useChatStore } from "store/actions/useChatStore";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

const socket = io("localhost:5000");

const Chat = () => {
  const [userName, setUserName] = useState("user1");
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
      <div className="flex flex-col overflow-y-auto max-h-[950px] h-screen w-[450px]">
        <div className="flex justify-center mt-4">
          <span className="text-center w-1/2 bg-primary rounded">{"채팅하기"}</span>
        </div>
        <div className="w-1/2 text-center mt-4">
          <span className="text-primary ">이름</span>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </div>
        <div>
          <ul className="flex-grow p-4">
            {chatList.map((chat, index) => (
              <ChatMessage key={index} chat={chat} userName={userName} />
            ))}
            <div className="h-14" ref={chatEndRef} />
          </ul>
        </div>
        <ChatInput sendMessage={sendMessage} />
      </div>
    </>
  );
};
export default Chat;

import profile from "@assets/user1.svg";
import type { Chat } from "@customTypes/chat";
import { User } from "@customTypes/user";
import { useCallback, useEffect, useRef, useState } from "react";
import { IoChatboxOutline } from "react-icons/io5";
import { io } from "socket.io-client";
import { useChatStore } from "store/actions/useChatStore";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

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
        className={`fixed bottom-0 right-0 transition-transform duration-300 ${
          isChat ? "translate-x-0" : "translate-x-full"
        }`}>
        <div className="flex h-screen max-h-[865px] w-[450px] flex-col overflow-y-auto">
          <div className="mt-4 flex justify-center">
            <span className="w-1/2 rounded bg-primary text-center">{"채팅하기"}</span>
          </div>
          <div className="mt-4 w-1/2 text-center">
            <span className="text-primary">이름</span>
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
      </section>
      <button className="fixed bottom-2 right-0" onClick={() => setIsChat((prev) => !prev)}>
        <IoChatboxOutline fontSize={"1.5em"} />
      </button>
    </>
  );
};
export default Chat;

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
      <div className="flex h-screen max-h-[950px] w-[450px] flex-col overflow-y-auto">
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
            {chatList.map((chat, index) => {
              const textLines = chat.text.match(/.{1,20}/g) || [];
              return (
                <li
                  key={index}
                  className={`mb-2 flex items-center ${
                    chat.user.userName === userName ? "flex-row-reverse text-right" : ""
                  }`}>
                  <img className="inline-block h-12 w-12" src={chat.user.profileUrl} alt="profile" />
                  <div>
                    <span>{chat.user.userName}</span>
                    <br />
                    {textLines.map((line, idx) => (
                      <span key={idx} className="block">
                        {line}
                      </span>
                    ))}
                    <span className="ml-1 mr-1 text-xs text-gray-500">{formatTime(chat.time)}</span>
                  </div>
                </li>
              );
            })}
            <div className="h-14" ref={chatEndRef} />
          </ul>
        </div>
        <div className="fixed bottom-0 left-0 w-[450px] bg-white p-4 flex shadow-md">
          <input
            className="flex-grow mr-4 p-2 border border-gray-300 rounded"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="bg-secondary text-dark py-2 px-4 rounded" onClick={sendMessage}>
            전송
          </button>
        </div>
      </div>
    </>
  );
};
export default Chat;

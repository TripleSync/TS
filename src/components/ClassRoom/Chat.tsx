import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useChatStore } from "../../store/actions/useChatStore";
import type { Chat } from "../../types/chat";
import { User } from "../../types/user";
import { formatTime } from "../../utils/date";
import profil from "../assets/user1.svg";

const socket = io("localhost:5000");

const Chat = () => {
  const [text, setText] = useState("");
  const [userName, setUserName] = useState("user1");
  const chatList = useChatStore((state) => state.chatList);
  const setChatList = useChatStore((state) => state.setChatList);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const user: User = { userName: userName, profileUrl: profil };

  useEffect(() => {
    const handleMessage = (message: Chat) => {
      console.log(message);
      setChatList(message);
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatList]);

  const sendMessage = () => {
    if (!text) return;
    socket.emit("message", { user: user, text: text, time: new Date() });
    setText("");
  };

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
            {chatList.map((chat, index) => {
              const textLines = chat.text.match(/.{1,20}/g) || [];
              return (
                <li
                  key={index}
                  className={`mb-2 flex items-center ${
                    chat.user.userName === userName ? "flex-row-reverse text-right" : ""
                  }`}>
                  <img className="w-12 h-12 inline-block" src={chat.user.profileUrl} alt="profile" />
                  <div>
                    <span>{chat.user.userName}</span>
                    <br />
                    {textLines.map((line, idx) => (
                      <span key={idx} className="block">
                        {line}
                      </span>
                    ))}
                    <span className="text-xs text-gray-500 ml-1 mr-1">{formatTime(chat.time)}</span>
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
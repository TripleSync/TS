import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import profil from "../assets/user1.svg";
import { useChatStore } from "../store/actions/useChatStore";
import type { Chat } from "../types/chat";
import { User } from "../types/user";
import { formatTime } from "../utils/date";

const socket = io("localhost:5000");

const Chat = () => {
  const [text, setText] = useState("");
  const chatList = useChatStore((state) => state.chatList);
  const setChatList = useChatStore((state) => state.setChatList);

  const user: User = { userName: "user1", profileUrl: profil };

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

  const sendMessage = () => {
    if (!text) return;
    socket.emit("message", { user: user, text: text, time: new Date() });
    setText("");
  };

  return (
    <>
      <div className="flex flex-col h-screen w-[450px]">
        <div className="flex justify-center mt-4">
          <span className="text-center w-1/2 bg-primary rounded">{"채팅하기"}</span>
        </div>
        <div>
          <ul className="flex-grow overflow-y-auto p-4">
            {chatList.map((chat, index) => (
              <li key={index} className="mb-2">
                <img className="w-12 h-12 inline-block" src={chat.user.profileUrl} alt="profile" />
                <span>{chat.user.userName}</span>
                <br />
                <span>{chat.text}</span>
                <span className="text-xs text-gray-500 ml-1">{formatTime(chat.time)}</span>
              </li>
            ))}
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

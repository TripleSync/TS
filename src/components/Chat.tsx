import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import profil from "../assets/user1.svg";
import { useChatStore } from "../store/actions/useChatStore";
import { User } from "../types/user";

const socket = io("localhost:5000");

const Chat = () => {
  const [message, setMessage] = useState("");
  const chatList = useChatStore((state) => state.chatList);
  const setChatList = useChatStore((state) => state.setChatList);

  const user: User = { userName: "user1", profileUrl: profil };

  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message);
      setChatList(message);
    });
  }, []);

  const sendMessage = () => {
    if (!message) return;
    socket.emit("message", { user: user, text: message, time: new Date() });
    setMessage("");
  };

  return (
    <>
      <span>이름: {user.userName}</span>
      <div>
        <p>채팅하기</p>
        <ul>
          {chatList.map((chat, index) => (
            <li key={index}>
              <span>{chat.user.userName}</span>
              <img className="w-12 h-12" src={chat.user.profileUrl} alt="profile" />
              <span>{chat.text}</span>
              <span>{chat.time.toString()}</span>
            </li>
          ))}
        </ul>
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button className="bg-secondary text-dark" onClick={sendMessage}>
        전송
      </button>
    </>
  );
};
export default Chat;

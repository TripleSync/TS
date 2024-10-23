import { Chat } from "@customTypes/chat";
import { formatTime } from "@utils/date";
import React, { useMemo } from "react";

const ChatMessage = ({ chat, userName }: { chat: Chat; userName: string }) => {
  const textLines = useMemo(() => chat.text.match(/.{1,20}/g) || [], [chat.text]);
  const formattedTime = useMemo(() => formatTime(chat.time), [chat.time]);

  return (
    <li className={`mb-2 flex items-center ${chat.user.userName === userName ? "flex-row-reverse text-right" : ""}`}>
      <img className="w-12 h-12 inline-block" src={chat.user.profileUrl} alt="profile" />
      <div>
        <span>{chat.user.userName}</span>
        <br />
        {textLines.map((line, idx) => (
          <span key={idx} className="block">
            {line}
          </span>
        ))}
        <span className="text-xs text-gray-500 ml-1 mr-1">{formattedTime}</span>
      </div>
    </li>
  );
};
export default React.memo(ChatMessage);

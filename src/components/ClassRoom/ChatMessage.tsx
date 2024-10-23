import { Chat } from "@customTypes/chat";
import { formatTime } from "@utils/date";
import React, { useMemo } from "react";

const ChatMessage = ({ chat, userName }: { chat: Chat; userName: string }) => {
  const textLines = useMemo(() => chat.text.match(/.{1,20}/g) || [], [chat.text]);

  return (
    <li className={`mb-2 flex items-center ${chat.user.userName === userName ? "flex-row-reverse text-right" : ""}`}>
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
};
export default React.memo(ChatMessage);

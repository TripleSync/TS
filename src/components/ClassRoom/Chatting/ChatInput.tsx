import React, { useState } from "react";

const ChatInput = ({ sendMessage }: { sendMessage: (text: string) => void }) => {
  const [text, setText] = useState("");

  const sendText = () => {
    if (text) {
      sendMessage(text);
      setText("");
    }
  };
  return (
    <div className="flex h-20 w-full p-4">
      <input
        className="mr-4 flex-grow rounded border border-gray-300 p-2"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendText()}
      />
      <button className="rounded bg-secondary px-4 py-2 text-dark" onClick={sendText}>
        전송
      </button>
    </div>
  );
};
export default React.memo(ChatInput);

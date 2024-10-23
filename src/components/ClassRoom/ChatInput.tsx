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
    <div className="fixed bottom-0 left-0 w-[450px] bg-white p-4 flex shadow-md">
      <input
        className="flex-grow mr-4 p-2 border border-gray-300 rounded"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendText()}
      />
      <button className="bg-secondary text-dark py-2 px-4 rounded" onClick={sendText}>
        전송
      </button>
    </div>
  );
};
export default React.memo(ChatInput);

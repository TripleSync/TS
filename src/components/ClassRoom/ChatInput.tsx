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
    <div className="fixed bottom-0 left-0 flex w-[450px] bg-white p-4 shadow-md">
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

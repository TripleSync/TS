import Chat from "@components/ClassRoom/Chat";
import Drawing from "@components/ClassRoom/Drawing";
import { useState } from "react";
import { IoChatboxOutline } from "react-icons/io5";

const ClassRoom = () => {
  const [isChat, setIsChat] = useState(false);
  return (
    <>
      <Drawing />
      <div
        className={`fixed right-0 bottom-0 transition-transform duration-300 ${
          isChat ? "translate-x-0" : "translate-x-full"
        }`}>
        <Chat />
      </div>
      <button className="fixed right-0 bottom-2" onClick={() => setIsChat((prev) => !prev)}>
        <IoChatboxOutline fontSize={"1.5em"} />
      </button>
    </>
  );
};
export default ClassRoom;

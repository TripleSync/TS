import Chat from "@components/ClassRoom/Chat";
import Drawing from "@components/ClassRoom/Drawing";
import VideoChat from "@components/ClassRoom/VideoChat";
import { useEffect } from "react";
/*
화면 규격 참고
pc : 1920*1053(1080)
노트북 : 1536*864 (125%)
 
*/
const ClassRoom = () => {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <Drawing />
      <VideoChat />
      <Chat />
    </>
  );
};
export default ClassRoom;

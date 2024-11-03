import Chat from "@components/ClassRoom/Chat";
import Drawing from "@components/ClassRoom/Drawing";
import VideoChat from "@components/VideoChat/VideoChat";

const ClassRoom = () => {
  return (
    <>
      <Drawing />
      <VideoChat />
      <Chat />
    </>
  );
};
export default ClassRoom;

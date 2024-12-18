import Chat from "@components/ClassRoom/Chat";
import Drawing from "@components/ClassRoom/Drawing";
import VideoChat from "@components/ClassRoom/VideoChat";
import { useSocket } from "hooks/useSocket";
import { useParams } from "react-router-dom";
import { useUserStore } from "store/actions/useUserStore";
/*
화면 규격 참고
pc : 1920*1053(1080)
노트북 : 1536*864 (125%)
 
*/
const port = window.location.port;
const URL = import.meta.env.VITE_SERVER_URL;

const ClassRoom = () => {
  const user = useUserStore((state) => state.user);
  const userName = user?.name ?? port;
  const { roomId } = useParams();
  const { socket, isConnected } = useSocket(URL, roomId, userName);

  return (
    <>
      <Drawing socket={socket} isConnected={isConnected} />
      <VideoChat />
      <Chat socket={socket} isConnected={isConnected} />
    </>
  );
};
export default ClassRoom;

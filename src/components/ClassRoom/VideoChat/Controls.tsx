import { useEffect, useState } from "react";
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from "react-icons/fa";
interface ControlsProps {
  stream: MediaStream;
}

const Controls = ({ stream }: ControlsProps) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(false);

  const muteHandler = () => {
    stream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
    setIsMuted(!isMuted);
  };

  const videoToggleHandler = () => {
    stream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
    setIsVideoOn((prev) => !prev);
  };

  useEffect(() => {
    stream.getVideoTracks().forEach((track) => {
      track.enabled = false;
    });
    stream.getAudioTracks().forEach((track) => {
      track.enabled = false;
    });
  }, [stream]);

  return (
    <div id="controls" className="flex flex-row gap-3 text-xl">
      <button onClick={videoToggleHandler}>{isVideoOn ? <FaVideo /> : <FaVideoSlash />}</button>
      <button onClick={muteHandler}>{isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}</button>
    </div>
  );
};
export default Controls;

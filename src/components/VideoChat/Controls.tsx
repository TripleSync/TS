import { useEffect, useState } from "react";

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
    <div>
      <button onClick={muteHandler}>{isMuted ? "마이크 on" : "마이크 off"}</button>
      <button onClick={videoToggleHandler}>{isVideoOn ? "비디오 off" : "비디오 on"}</button>
    </div>
  );
};
export default Controls;

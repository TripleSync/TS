import { ChangeEvent, useEffect, useState } from "react";

interface VolumeControlProps {
  stream: MediaStream;
}

const VolumeControls = ({ stream }: VolumeControlProps) => {
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const gainNode = audioContext.createGain();
    source.connect(gainNode).connect(audioContext.destination);
    gainNode.gain.value = volume;
    return () => {
      audioContext.close();
    };
  }, [volume, stream]);

  const volumeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <div>
      <label>Volume</label>
      <input type="range" min="0" max="1" step="0.1" value={volume} onChange={volumeHandler} />
    </div>
  );
};
export default VolumeControls;

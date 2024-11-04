import { forwardRef } from "react";

interface VideoProps {
  id: string;
}

const Video = forwardRef<HTMLVideoElement, VideoProps>(({ id }, ref) => {
  return (
    <div id="videoBox" className="w-fit rounded-md border-8 border-solid border-primary">
      <video
        id={id}
        style={{
          width: 300,
          height: 250,
          backgroundColor: "white",
        }}
        ref={ref}
        autoPlay
        playsInline
      />
    </div>
  );
});

export default Video;

import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import io, { Socket } from "socket.io-client";
import Controls from "./Controls";
import VolumeControls from "./VolumeControls";

const VideoChat = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const socketRef = useRef<typeof Socket | null>(null);
  const peerRef = useRef<RTCPeerConnection | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

  const getMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      setLocalStream(stream);

      if (!(peerRef.current && socketRef.current)) {
        console.log("연결된 Peer 또는 Socket이 없습니다.");
        return;
      }

      stream.getTracks().forEach((track) => {
        if (!peerRef.current) return;
        peerRef.current.addTrack(track, stream);
      });

      createOffer();
    } catch (e) {
      console.error(e);
    }
  };

  const createOffer = async () => {
    if (!(peerRef.current && socketRef.current)) {
      console.log("연결된 Peer 또는 Socket이 없습니다.");
      return;
    }

    try {
      const sdp = await peerRef.current.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });

      await peerRef.current.setLocalDescription(new RTCSessionDescription(sdp));
      socketRef.current.emit("createOffer", { sdp: sdp, roomId: roomId });
    } catch (e) {
      console.error(e);
    }
  };

  const createAnswer = async (sdp: RTCSessionDescription) => {
    if (!(peerRef.current && socketRef.current)) {
      console.log("연결된 Peer 또는 Socket이 없습니다.");
    }

    try {
      await peerRef.current?.setRemoteDescription(new RTCSessionDescription(sdp));
      const mySdp = await peerRef.current?.createAnswer({
        offerToReceiveVideo: true,
        offerToReceiveAudio: true,
      });

      await peerRef.current?.setLocalDescription(new RTCSessionDescription(mySdp as RTCSessionDescriptionInit));
      socketRef.current?.emit("createAnswer", { sdp: mySdp, roomId: roomId });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    socketRef.current = io("localhost:5000", {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    peerRef.current = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });

    peerRef.current.onicecandidate = (e) => {
      if (e.candidate) {
        if (!socketRef.current) return;
        socketRef.current.emit("createCandidate", { candidate: e.candidate, roomId: roomId });
      }
    };

    peerRef.current.ontrack = (e) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = e.streams[0];
      }
    };

    socketRef.current.on("userConnection", (allUsers: Array<{ id: string }>) => {
      if (allUsers.length < 2) createOffer();
    });

    socketRef.current.on("getOffer", (sdp: RTCSessionDescription) => {
      createAnswer(sdp);
    });

    socketRef.current.on("getAnswer", async (sdp: RTCSessionDescription) => {
      if (!peerRef.current) return;

      try {
        if (peerRef.current.signalingState === "have-local-offer") {
          await peerRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
        }
      } catch (e) {
        console.error(e);
      }
    });

    socketRef.current.on("getCandidate", async (candidate: RTCIceCandidate) => {
      if (!peerRef.current) return;
      await peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));
    });

    socketRef.current.on("fullRoom", (roomId: string) => {
      if (!peerRef.current) return;
      console.log(`현재 ${roomId}번 강의실에 입장할 수 없습니다.`);
      navigate("/");
    });

    socketRef.current.on("userDisconnect", () => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = null;
      }
      console.log("유저가 퇴장하였습니다.");
    });

    socketRef.current.emit("joinRoom", { roomId: roomId });

    getMedia();

    return () => {
      socketRef.current?.disconnect();
    };
  }, [roomId]);

  return (
    <div>
      <video
        id="myVideo"
        style={{
          width: 240,
          height: 240,
          backgroundColor: "black",
        }}
        ref={localVideoRef}
        autoPlay
        playsInline
      />
      <video
        id="remoteVideo"
        style={{
          width: 240,
          height: 240,
          backgroundColor: "black",
        }}
        ref={remoteVideoRef}
        autoPlay
        playsInline
      />
      {localStream && <Controls stream={localStream} />}
      {localStream && <VolumeControls stream={localStream} />}
    </div>
  );
};

export default VideoChat;

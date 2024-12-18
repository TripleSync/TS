import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";

export const useSocket = (url: string, roomId: string | undefined, name: string | undefined) => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<typeof Socket | null>(null);

  useEffect(() => {
    if (!roomId) return;

    const socket = io(url, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      setIsConnected(true);
      socket.emit("initialize", { name: name, roomId: roomId });
      console.log(`Joined room ${roomId}`);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, [url, roomId]);

  return { socket: socketRef.current, isConnected };
};

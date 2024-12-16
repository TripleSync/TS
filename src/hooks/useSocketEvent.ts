import { useEffect } from "react";
import { Socket } from "socket.io-client";

export const useSocketEvent = (
  socket: typeof Socket | null,
  isConnected: boolean,
  eventName: string,
  callback: (data: any) => void
) => {
  useEffect(() => {
    if (!socket) return;

    if (isConnected) {
      socket.on(eventName, callback);

      return () => {
        socket.off(eventName, callback);
      };
    }
  }, [socket, eventName, callback]);
};

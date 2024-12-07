import { useCallback } from "react";
import { Socket } from "socket.io-client";

export const useSocketEmit = (socket: typeof Socket | null, isConnected: boolean) => {
  return useCallback(
    (eventName: string, data?: any) => {
      if (!socket) return;

      if (isConnected) {
        socket.emit(eventName, data);
      }
    },
    [socket, isConnected]
  );
};

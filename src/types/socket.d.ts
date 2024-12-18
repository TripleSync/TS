export interface SocketData {
  socket: typeof Socket | null;
  isConnected: boolean;
  eventName: string;
}

export interface SocketProps {
  socket: typeof Socket | null;
  isConnected: boolean;
}

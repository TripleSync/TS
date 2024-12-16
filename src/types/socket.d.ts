export interface SocketData {
  socket: typeof Socket | null;
  isConnected: boolean;
  eventName: string;
}

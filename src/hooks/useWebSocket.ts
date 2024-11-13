import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

import SOCKET_ENENTS from "../consttants/socketEvents";

interface UseWebSocketProps {
  serverUrl?: string;
  onRequestCounter: () => void;
}
interface UseWebSocketReturn {
  socket: Socket | null;
  sendMessage: (event: string, data: any) => void;
}

const useWebSocket = ({
  serverUrl = "http://localhost:3000/",
  onRequestCounter,
}: UseWebSocketProps): UseWebSocketReturn => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io(serverUrl);
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [serverUrl]);

  useEffect(() => {
    if (!socket) return;

    socket.on(SOCKET_ENENTS.REQUEST_COUNTER, () => {
      if (onRequestCounter) onRequestCounter();
    });

    return () => {
      socket.off(SOCKET_ENENTS.REQUEST_COUNTER);
    };
  }, [onRequestCounter, socket]);

  const sendMessage = (event: string, data: any) => {
    if (socket) {
      socket.emit(event, data);
    }
  };

  return { socket, sendMessage };
};

export default useWebSocket;

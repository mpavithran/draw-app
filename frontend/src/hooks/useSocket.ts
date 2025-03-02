import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import API from "../utils/API";

const SOCKET_URL = API.SOCKET_BASE_URL;

export const socket: Socket = io(SOCKET_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  transports: ["websocket"],
});

const useSocket = () => {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    const handlePong = (data: string) => {
      console.log("Received Pong:", data);
    };

    socket.on("pong", handlePong);

    return () => {
      socket.off("pong", handlePong);
    };
  }, []);

  return socket;
};

export default useSocket;

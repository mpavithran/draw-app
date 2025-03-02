import { useEffect } from "react";
import DrawCanva from "../components/DrawCanva";
import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:3001/v1");
const Home = () => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected server");
    });

    socket.emit("ping", "Hello");
    socket.on("pong", (data) => {
      console.log(data);
    });
  }, [socket.connected]);

  return (
    <div className="w-[100vw]">
      <h1 className="font-bold text-xl text-center mb-4">Draw App</h1>
      <DrawCanva />
    </div>
  );
};

export default Home;

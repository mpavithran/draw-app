import fs from "fs";
import { Server } from "socket.io";

const connectSocket = async (server, app) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  app.set("socket", io);

  const versions = ["./v1"];

  versions.map((each) => {
    const initiateSocketVersion = require(each + "/socket");

    const v = "/" + each;
    io.of(v).on("connection", (socket) => {
      initiateSocketVersion(socket, io.of(v));
    });
    console.log(each + " started");
  });
};

export default connectSocket;

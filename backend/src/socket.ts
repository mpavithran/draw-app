import fs from "fs";
import { Server } from "socket.io";

const connectSocket = async (server, app) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  app.set("socket", io);
  const files = await fs.promises.readdir("./src");
  const folders = files.filter((file) =>
    fs.statSync(`./src/${file}`).isDirectory()
  );

  const versions = folders;

  versions.map((each) => {
    const initiateSocketVersion = require("./" + each + "/socket");

    const v = "/" + each;
    io.of(v).on("connection", (socket) => {
      initiateSocketVersion(socket, io.of(v));
    });
    console.log(each + " started");
  });
};

export default connectSocket;

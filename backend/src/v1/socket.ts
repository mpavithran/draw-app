import constantUtils from "./utils/constant.utils";

const initiateSocketVersion = async (socket, io) => {
  socket.on(constantUtils?.ping, (data) => {
    console.log(data);
    socket.emit(constantUtils?.pong, "Pong");
  });
};

export default initiateSocketVersion;

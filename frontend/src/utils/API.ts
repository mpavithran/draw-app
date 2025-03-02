const MODE = import.meta.env.VITE_MODE || "LOCAL";

type APIProps = {
  SOCKET_BASE_URL?: string;
  BASE_URL?: string;
};

const API: APIProps = {};

if (MODE === "LOCAL") {
  API["BASE_URL"] = "http://localhost:3001";
  API["SOCKET_BASE_URL"] = "http://localhost:3001/v1";
}

export default API;

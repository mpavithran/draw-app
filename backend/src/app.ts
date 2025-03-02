import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import connectSocket from "./socket";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3001;
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
let expressServer = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  connectSocket(expressServer, app);
});

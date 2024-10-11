import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import biddingControlRoutes from "./routes/bidding-control.js";
import scoreboardRoutes from "./routes/scoreboard.js";
import questionControlRoutes from "./routes/question-control.js";
import questionboardRoutes from "./routes/questionboard.js";
import infoboardRoutes from "./routes/infoboard.js";
import soundControlRoutes from "./routes/sound-control.js";
import { io as gameStateIo } from "./gameState.js";
import { io as questionStateIo } from "./questionState.js";
import cors from "cors";
const app = express();
const server = createServer(app);
const io = new Server(server);

const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

app.use("/", biddingControlRoutes);
app.use("/", scoreboardRoutes);
app.use("/", questionControlRoutes);
app.use("/", questionboardRoutes);
app.use("/", infoboardRoutes);
app.use("/", soundControlRoutes);

gameStateIo(io);
questionStateIo(io);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

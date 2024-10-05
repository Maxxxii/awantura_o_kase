import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { updateBids, declareWinner, getGameState, resetGame } from "../gameState.js";

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

router.get("/bidding-control", async (req, res) => {
  const template = await fs.readFile(path.join(__dirname, "../templates/bidding-control.html"), "utf-8");
  res.send(template);
});

router.post("/bid", (req, res) => {
  const { team, bid } = req.body;
  const bidAmount = parseInt(bid, 10) || 0;

  updateBids({ [team]: bidAmount });

  res.json(getGameState());
});

router.post("/declare-winner", (req, res) => {
  const winner = req.body.winner;
  declareWinner(winner);

  res.json(getGameState());
});

router.post("/initialize-bidding", (req, res) => {
  const initialBid = 200;
  updateBids({ yellow: initialBid, blue: initialBid, green: initialBid });
  res.json(getGameState());
});

router.post("/reset-bidding", (req, res) => {
  resetGame();
  res.json(getGameState());
});

export default router;

import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { getQuestionState } from "../questionState.js";
import { getGameState } from "../gameState.js";
const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

router.get("/infoboard/:id", async (req, res) => {
  const id = req.params.id;
  let host = "";
  if (id === "0") {
    host = "Zosia Janik";
  } else {
    host = "Bartek Basiński";
  }
  const template = await fs.readFile(path.join(__dirname, "../templates/infoboard.html"), "utf-8");
  const { currentQuestion } = getQuestionState();
  const { teamBids, bidPool, teamBalances } = getGameState();

  const filledTemplate = template
    .replace("{{host}}", host)
    .replace("{{category}}", currentQuestion.category)
    .replace("{{text}}", currentQuestion.text)
    .replace("{{answer}}", currentQuestion.answer)
    .replace("{{blue_score}}", teamBalances.blue)
    .replace("{{blue_bid}}", teamBids.blue)
    .replace("{{green_score}}", teamBalances.green)
    .replace("{{green_bid}}", teamBids.green)
    .replace("{{yellow_score}}", teamBalances.yellow)
    .replace("{{yellow_bid}}", teamBids.yellow)
    .replace("{{red_score}}", teamBalances.red)
    .replace("{{red_bid}}", teamBids.red)
    .replace("{{pool_bids}}", bidPool);

  res.send(filledTemplate);
});

export default router;

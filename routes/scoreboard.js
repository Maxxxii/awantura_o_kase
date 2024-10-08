import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { getGameState } from "../gameState.js";

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

router.get("/scoreboard", async (req, res) => {
  const template = await fs.readFile(path.join(__dirname, "../templates/scoreboard.html"), "utf-8");
  const { teamBids, bidPool, teamBalances } = getGameState();

  const filledTemplate = template
    .replace("{{yellowBid}}", teamBids.yellow)
    .replace("{{blueBid}}", teamBids.blue)
    .replace("{{greenBid}}", teamBids.green)
    .replace("{{redBid}}", teamBids.red)
    .replace("{{bidPool}}", bidPool)
    .replace("{{yellowBalance}}", teamBalances.yellow)
    .replace("{{blueBalance}}", teamBalances.blue)
    .replace("{{greenBalance}}", teamBalances.green)
    .replace("{{redBalance}}", teamBalances.red);

  res.send(filledTemplate);
});

export default router;

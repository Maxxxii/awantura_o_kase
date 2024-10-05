import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { drawQuestion, getQuestionState } from "../questionState.js";

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

router.get("/question-control", async (req, res) => {
  const template = await fs.readFile(path.join(__dirname, "../templates/question-control.html"), "utf-8");
  res.send(template);
});

router.post("/draw-question", (req, res) => {
  const { category } = req.body;
  drawQuestion(category);

  res.json(getQuestionState());
});

export default router;

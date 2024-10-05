import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { getQuestionState } from "../questionState.js";

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

router.get("/questionboard", async (req, res) => {
  const template = await fs.readFile(path.join(__dirname, "../templates/questionboard.html"), "utf-8");
  const { currentQuestion } = getQuestionState();

  const filledTemplate = template.replace("{{text}}", currentQuestion.text.toUpperCase());

  res.send(filledTemplate);
});

export default router;

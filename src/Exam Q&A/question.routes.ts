// routes/question.routes.ts
import { Router } from "express";
import {
  addQuestion,
  getQuestions,
  deleteQuestion,
  generateRandomQuestion,
} from "./question.controller";

const router = Router();

router.post("/", addQuestion);
router.get("/", getQuestions);
router.get("/random", generateRandomQuestion);
router.delete("/:id", deleteQuestion);

export default router;

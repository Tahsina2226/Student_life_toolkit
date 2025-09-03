// routes/expense.routes.ts
import { Router } from "express";
import { addExpense, getExpenses, deleteExpense } from "./expense.controller";

const router = Router();

router.post("/", addExpense);
router.get("/", getExpenses);
router.delete("/:id", deleteExpense);

export default router;

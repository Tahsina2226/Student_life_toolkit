import { Router } from "express";
import { addIncome, getIncome, deleteIncome } from "./income.controller";

const router = Router();

router.post("/", addIncome);
router.get("/", getIncome);
router.delete("/:id", deleteIncome);

export default router;

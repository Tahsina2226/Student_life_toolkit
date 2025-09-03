import { Router } from "express";
import { getSummary } from "../summary/summary.controller";

const router = Router();

router.get("/", getSummary);

export default router;

import { Router } from "express";
import { addStudySession, getMotivation } from "./motivation.controller";
import { protect } from "../../src/middlewares/authmiddleware";

const router = Router();

router.post("/add", protect, addStudySession);
router.get("/", protect, getMotivation);

export default router;

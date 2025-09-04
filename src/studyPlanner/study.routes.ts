import { Router } from "express";
import {
  createStudyPlan,
  getAllStudyPlans,
  getStudyPlanById,
  updateStudyPlan,
  deleteStudyPlan,
  markComplete,
  getScheduleByDay,
} from "./study.controller";

const router = Router();

router.post("/", createStudyPlan);
router.get("/", getAllStudyPlans);
router.get("/schedule/:day", getScheduleByDay);
router.get("/:id", getStudyPlanById);
router.put("/:id", updateStudyPlan);
router.delete("/:id", deleteStudyPlan);
router.put("/:id/complete", markComplete);

export default router;

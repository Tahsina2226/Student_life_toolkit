import { Router } from "express";
import {
  addStudyPlan,
  getStudyPlans,
  getStudyPlanById,
  updateStudyPlan,
  deleteStudyPlan,
  markComplete,
  getScheduleByDay,
} from "./study.controller";

const router = Router();

router.post("/", addStudyPlan);
router.get("/", getStudyPlans);
router.get("/:id", getStudyPlanById);
router.put("/:id", updateStudyPlan);
router.delete("/:id", deleteStudyPlan);

// mark complete
router.put("/:id/complete", markComplete);

// get schedule for a day
router.get("/schedule/:day", getScheduleByDay);

export default router;

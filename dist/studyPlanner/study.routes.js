"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const study_controller_1 = require("./study.controller");
const router = (0, express_1.Router)();
router.post("/", study_controller_1.addStudyPlan);
router.get("/", study_controller_1.getStudyPlans);
router.get("/:id", study_controller_1.getStudyPlanById);
router.put("/:id", study_controller_1.updateStudyPlan);
router.delete("/:id", study_controller_1.deleteStudyPlan);
// mark complete
router.put("/:id/complete", study_controller_1.markComplete);
// get schedule for a day
router.get("/schedule/:day", study_controller_1.getScheduleByDay);
exports.default = router;

import { Router } from "express";
import {
  getClasses,
  getClassById,
  addClass,
  updateClass,
  deleteClass,
} from "./shedule.controller";

const router = Router();

router.get("/", getClasses);
router.get("/:id", getClassById);
router.post("/", addClass);
router.put("/:id", updateClass);
router.delete("/:id", deleteClass);

export default router;

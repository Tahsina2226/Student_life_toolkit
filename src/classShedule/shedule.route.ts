import { Router } from "express";
import { getClasses, addClass, updateClass, deleteClass } from "./shedule.controller";

const router = Router();

router.get("/", getClasses);
router.post("/", addClass);
router.put("/:id", updateClass);
router.delete("/:id", deleteClass);

export default router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/question.routes.ts
const express_1 = require("express");
const question_controller_1 = require("./question.controller");
const router = (0, express_1.Router)();
router.post("/", question_controller_1.addQuestion);
router.get("/", question_controller_1.getQuestions);
router.get("/random", question_controller_1.generateRandomQuestion);
router.delete("/:id", question_controller_1.deleteQuestion);
exports.default = router;

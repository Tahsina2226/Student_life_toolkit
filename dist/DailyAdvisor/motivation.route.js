"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const motivation_controller_1 = require("./motivation.controller");
const authmiddleware_1 = require("../../src/middlewares/authmiddleware");
const router = (0, express_1.Router)();
router.post("/add", authmiddleware_1.protect, motivation_controller_1.addStudySession);
router.get("/", authmiddleware_1.protect, motivation_controller_1.getMotivation);
exports.default = router;

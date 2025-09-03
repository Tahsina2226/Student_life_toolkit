"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const income_controller_1 = require("./income.controller");
const router = (0, express_1.Router)();
router.post("/", income_controller_1.addIncome);
router.get("/", income_controller_1.getIncome);
router.delete("/:id", income_controller_1.deleteIncome);
exports.default = router;

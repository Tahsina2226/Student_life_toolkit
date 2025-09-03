"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/expense.routes.ts
const express_1 = require("express");
const expense_controller_1 = require("./expense.controller");
const router = (0, express_1.Router)();
router.post("/", expense_controller_1.addExpense);
router.get("/", expense_controller_1.getExpenses);
router.delete("/:id", expense_controller_1.deleteExpense);
exports.default = router;

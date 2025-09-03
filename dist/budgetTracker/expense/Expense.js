"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const expenseSchema = new mongoose_1.Schema({
    category: { type: String, required: true },
    amount: { type: Number, required: true, min: 0 },
    date: { type: Date, default: Date.now },
});
exports.default = (0, mongoose_1.model)("Expense", expenseSchema);

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExpense = exports.getExpenses = exports.addExpense = void 0;
const Expense_1 = __importDefault(require("./Expense"));
const addExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category, amount } = req.body;
        if (!category || amount < 0)
            return res.status(400).json({ message: "Invalid input" });
        const expense = yield Expense_1.default.create({ category, amount });
        res.status(201).json(expense);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.addExpense = addExpense;
const getExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expenses = yield Expense_1.default.find();
        res.status(200).json(expenses);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.getExpenses = getExpenses;
const deleteExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield Expense_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: "Expense deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.deleteExpense = deleteExpense;

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
exports.getSummary = void 0;
const income_model_1 = __importDefault(require("../income/income.model"));
const Expense_1 = __importDefault(require("../expense/Expense"));
const getSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const totalIncome = yield income_model_1.default.aggregate([
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);
        const totalExpenses = yield Expense_1.default.aggregate([
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);
        const summary = {
            totalIncome: ((_a = totalIncome[0]) === null || _a === void 0 ? void 0 : _a.total) || 0,
            totalExpenses: ((_b = totalExpenses[0]) === null || _b === void 0 ? void 0 : _b.total) || 0,
            savings: (((_c = totalIncome[0]) === null || _c === void 0 ? void 0 : _c.total) || 0) - (((_d = totalExpenses[0]) === null || _d === void 0 ? void 0 : _d.total) || 0),
        };
        res.status(200).json(summary);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.getSummary = getSummary;

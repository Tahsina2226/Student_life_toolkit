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
exports.deleteIncome = exports.getIncome = exports.addIncome = void 0;
const income_model_1 = __importDefault(require("./income.model"));
// Add Income
const addIncome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { source, amount } = req.body;
        if (!source || amount < 0)
            return res.status(400).json({ message: "Invalid input" });
        const income = yield income_model_1.default.create({ source, amount });
        res.status(201).json(income);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.addIncome = addIncome;
// Get All Income
const getIncome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const incomes = yield income_model_1.default.find();
        res.status(200).json(incomes);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.getIncome = getIncome;
// Delete Income
const deleteIncome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield income_model_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: "Income deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.deleteIncome = deleteIncome;

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
exports.deleteQuestion = exports.updateQuestion = exports.createQuestion = exports.getQuestions = void 0;
const Question_1 = __importDefault(require("./Question"));
// GET all questions
const getQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const difficulty = req.query.difficulty;
        const filter = difficulty ? { difficulty } : {};
        const questions = yield Question_1.default.find(filter);
        res.json(questions);
    }
    catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
});
exports.getQuestions = getQuestions;
// POST new question
const createQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newQuestion = new Question_1.default(req.body);
        const savedQuestion = yield newQuestion.save();
        res.json(savedQuestion);
    }
    catch (err) {
        res.status(400).json({ error: "Invalid Data" });
    }
});
exports.createQuestion = createQuestion;
// UPDATE question
const updateQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedQuestion = yield Question_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!updatedQuestion)
            return res.status(404).json({ error: "Question not found" });
        res.json(updatedQuestion);
    }
    catch (err) {
        res.status(400).json({ error: "Invalid Data" });
    }
});
exports.updateQuestion = updateQuestion;
// DELETE question
const deleteQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedQuestion = yield Question_1.default.findByIdAndDelete(id);
        if (!deletedQuestion)
            return res.status(404).json({ error: "Question not found" });
        res.json({ message: "Question deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
});
exports.deleteQuestion = deleteQuestion;

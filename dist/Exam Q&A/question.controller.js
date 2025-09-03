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
exports.generateRandomQuestion = exports.deleteQuestion = exports.getQuestions = exports.addQuestion = void 0;
const Question_1 = __importDefault(require("./Question"));
const addQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { questionText, options, answer, type, difficulty } = req.body;
        if (!questionText || !answer || !type || !difficulty)
            return res.status(400).json({ message: "Missing required fields" });
        const question = yield Question_1.default.create({
            questionText,
            options,
            answer,
            type,
            difficulty,
        });
        res.status(201).json(question);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.addQuestion = addQuestion;
const getQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { difficulty, type } = req.query;
        const filter = {};
        if (difficulty)
            filter.difficulty = difficulty;
        if (type)
            filter.type = type;
        const questions = yield Question_1.default.find(filter);
        res.status(200).json(questions);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.getQuestions = getQuestions;
const deleteQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield Question_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: "Question deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.deleteQuestion = deleteQuestion;
// Generate Random Question
const generateRandomQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { difficulty, type } = req.query;
        const filter = {};
        if (difficulty)
            filter.difficulty = difficulty;
        if (type)
            filter.type = type;
        const count = yield Question_1.default.countDocuments(filter);
        const randomIndex = Math.floor(Math.random() * count);
        const question = yield Question_1.default.findOne(filter).skip(randomIndex);
        if (!question)
            return res.status(404).json({ message: "No question found" });
        res.status(200).json(question);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.generateRandomQuestion = generateRandomQuestion;

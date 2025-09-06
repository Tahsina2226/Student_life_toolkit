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
exports.getMotivation = exports.addStudySession = void 0;
const motivation_1 = __importDefault(require("./motivation"));
const tips = [
    "Try using the Pomodoro technique for better focus.",
    "Review your notes daily to improve retention.",
    "Take short breaks between study sessions.",
    "Practice active recall instead of passive reading.",
    "Stay hydrated and maintain a good sleep schedule.",
];
const quotes = [
    "Success is the sum of small efforts repeated day in and day out.",
    "Don’t watch the clock; do what it does. Keep going.",
    "The expert in anything was once a beginner.",
    "Push yourself, because no one else is going to do it for you.",
    "Great things never come from comfort zones.",
];
// 📝 Log study session
const addStudySession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const { subject, duration } = req.body;
        if (!subject || !duration) {
            return res.status(400).json({
                success: false,
                message: "Subject and duration are required",
            });
        }
        const session = yield motivation_1.default.create({
            userId: req.user.id,
            subject,
            duration,
        });
        return res.status(201).json({ success: true, session });
    }
    catch (err) {
        console.error("Error adding study session:", err);
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred while adding the session",
            error: err.message,
        });
    }
});
exports.addStudySession = addStudySession;
// 🎯 Get personalized motivation
const getMotivation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        const sessions = yield motivation_1.default.find({
            userId: req.user.id,
            date: { $gte: weekAgo },
        });
        if (!sessions || sessions.length === 0) {
            return res.status(200).json({
                success: true,
                message: "You haven't studied this week. Start today with at least 30 minutes!",
                tip: tips[Math.floor(Math.random() * tips.length)],
            });
        }
        // Calculate least studied subject
        const subjectTotals = {};
        sessions.forEach((s) => {
            subjectTotals[s.subject] = (subjectTotals[s.subject] || 0) + s.duration;
        });
        const leastStudiedEntry = Object.entries(subjectTotals).sort((a, b) => a[1] - b[1])[0];
        const leastStudied = leastStudiedEntry
            ? leastStudiedEntry[0]
            : "any subject";
        return res.status(200).json({
            success: true,
            quote: quotes[Math.floor(Math.random() * quotes.length)],
            tip: `You studied most this week, but try reviewing more ${leastStudied}.`,
        });
    }
    catch (err) {
        console.error("Error fetching motivation:", err);
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred while fetching motivation",
            error: err.message,
        });
    }
});
exports.getMotivation = getMotivation;

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
exports.getScheduleByDay = exports.markComplete = exports.deleteStudyPlan = exports.updateStudyPlan = exports.getStudyPlanById = exports.getStudyPlans = exports.addStudyPlan = void 0;
const study_1 = __importDefault(require("./study"));
const isValidTime = (t) => {
    if (!t)
        return false;
    return /^([01]\d|2[0-3]):([0-5]\d)$/.test(t);
};
const addStudyPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { subject, topic, priority, deadline, daySlot, startTime, endTime, durationMinutes, notes, } = req.body;
        if (!subject || !priority) {
            return res
                .status(400)
                .json({ message: "subject and priority are required" });
        }
        if (!["low", "medium", "high"].includes(priority)) {
            return res
                .status(400)
                .json({ message: "priority must be one of 'low', 'medium', 'high'" });
        }
        if ((startTime && !isValidTime(startTime)) ||
            (endTime && !isValidTime(endTime))) {
            return res
                .status(400)
                .json({ message: "startTime/endTime must be in HH:MM 24-hour format" });
        }
        if (durationMinutes && durationMinutes < 0) {
            return res.status(400).json({ message: "durationMinutes must be >= 0" });
        }
        const plan = yield study_1.default.create({
            subject,
            topic,
            priority,
            deadline: deadline ? new Date(deadline) : undefined,
            daySlot,
            startTime,
            endTime,
            durationMinutes,
            notes,
        });
        res.status(201).json(plan);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.addStudyPlan = addStudyPlan;
const getStudyPlans = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { subject, priority, daySlot, completed, beforeDeadline } = req.query;
        const filter = {};
        if (subject)
            filter.subject = subject;
        if (priority)
            filter.priority = priority;
        if (daySlot)
            filter.daySlot = daySlot;
        if (completed !== undefined)
            filter.completed = completed === "true";
        if (beforeDeadline)
            filter.deadline = { $lte: new Date(String(beforeDeadline)) };
        const plans = yield study_1.default.find(filter).sort({
            priority: -1,
            deadline: 1,
            createdAt: -1,
        });
        res.status(200).json(plans);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.getStudyPlans = getStudyPlans;
const getStudyPlanById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const plan = yield study_1.default.findById(id);
        if (!plan)
            return res.status(404).json({ message: "Plan not found" });
        res.status(200).json(plan);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.getStudyPlanById = getStudyPlanById;
const updateStudyPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (updates.priority &&
            !["low", "medium", "high"].includes(updates.priority)) {
            return res.status(400).json({ message: "Invalid priority value" });
        }
        if ((updates.startTime && !isValidTime(updates.startTime)) ||
            (updates.endTime && !isValidTime(updates.endTime))) {
            return res
                .status(400)
                .json({ message: "Invalid time format for startTime/endTime" });
        }
        if (updates.durationMinutes && updates.durationMinutes < 0) {
            return res.status(400).json({ message: "durationMinutes must be >= 0" });
        }
        if (updates.deadline)
            updates.deadline = new Date(updates.deadline);
        const plan = yield study_1.default.findByIdAndUpdate(id, updates, { new: true });
        if (!plan)
            return res.status(404).json({ message: "Plan not found" });
        res.status(200).json(plan);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.updateStudyPlan = updateStudyPlan;
const deleteStudyPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield study_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: "Study plan deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.deleteStudyPlan = deleteStudyPlan;
const markComplete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const plan = yield study_1.default.findByIdAndUpdate(id, { completed: true }, { new: true });
        if (!plan)
            return res.status(404).json({ message: "Plan not found" });
        res.status(200).json(plan);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.markComplete = markComplete;
const getScheduleByDay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { day } = req.params;
        const plans = yield study_1.default.find({ daySlot: day, completed: false }).sort({ startTime: 1 });
        res.status(200).json(plans);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.getScheduleByDay = getScheduleByDay;

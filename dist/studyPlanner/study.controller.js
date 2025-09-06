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
exports.getScheduleByDay = exports.markComplete = exports.deleteStudyPlan = exports.updateStudyPlan = exports.getStudyPlanById = exports.getAllStudyPlans = exports.createStudyPlan = void 0;
const study_1 = __importDefault(require("./study"));
const isValidTime = (time) => /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(time);
const createStudyPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { subject, topic, priority, deadline, day, startTime, durationMinutes, } = req.body;
        if (!subject ||
            !topic ||
            !priority ||
            !deadline ||
            !day ||
            !startTime ||
            durationMinutes === undefined) {
            return res.status(400).json({ message: "All fields are required." });
        }
        if (!["low", "medium", "high"].includes(priority)) {
            return res
                .status(400)
                .json({ message: "Priority must be low, medium, or high." });
        }
        if (!isValidTime(startTime)) {
            return res.status(400).json({ message: "Invalid time format (HH:MM)." });
        }
        if (durationMinutes < 0) {
            return res
                .status(400)
                .json({ message: "Duration must be zero or positive." });
        }
        const newPlan = new study_1.default({
            subject,
            topic,
            priority,
            deadline,
            day,
            startTime,
            durationMinutes,
        });
        const savedPlan = yield newPlan.save();
        res.status(201).json(savedPlan);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createStudyPlan = createStudyPlan;
const getAllStudyPlans = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const plans = yield study_1.default.find().sort({ createdAt: -1 });
        res.json(plans);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllStudyPlans = getAllStudyPlans;
const getStudyPlanById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const plan = yield study_1.default.findById(req.params.id);
        if (!plan)
            return res.status(404).json({ message: "Study plan not found." });
        res.json(plan);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getStudyPlanById = getStudyPlanById;
const updateStudyPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updates = req.body;
        if (updates.priority &&
            !["low", "medium", "high"].includes(updates.priority)) {
            return res
                .status(400)
                .json({ message: "Priority must be low, medium, or high." });
        }
        if (updates.startTime && !isValidTime(updates.startTime)) {
            return res.status(400).json({ message: "Invalid time format (HH:MM)." });
        }
        if (updates.durationMinutes !== undefined && updates.durationMinutes < 0) {
            return res
                .status(400)
                .json({ message: "Duration must be zero or positive." });
        }
        if (updates.deadline) {
            const d = new Date(updates.deadline);
            if (isNaN(d.getTime())) {
                return res.status(400).json({ message: "Invalid deadline date." });
            }
            updates.deadline = d;
        }
        const updatedPlan = yield study_1.default.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!updatedPlan)
            return res.status(404).json({ message: "Study plan not found." });
        res.json(updatedPlan);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateStudyPlan = updateStudyPlan;
const deleteStudyPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedPlan = yield study_1.default.findByIdAndDelete(req.params.id);
        if (!deletedPlan)
            return res.status(404).json({ message: "Study plan not found." });
        res.json({ message: "Study plan deleted successfully." });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteStudyPlan = deleteStudyPlan;
const markComplete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const plan = yield study_1.default.findByIdAndUpdate(req.params.id, { completed: true }, { new: true });
        if (!plan)
            return res.status(404).json({ message: "Study plan not found." });
        res.json(plan);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.markComplete = markComplete;
const getScheduleByDay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { day } = req.params;
        const plans = yield study_1.default.find({ day, completed: false }).sort({
            startTime: 1,
        });
        res.json(plans);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getScheduleByDay = getScheduleByDay;

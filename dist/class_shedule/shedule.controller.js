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
exports.deleteClass = exports.updateClass = exports.addClass = exports.getClassById = exports.getClasses = void 0;
const shedule_model_1 = __importDefault(require("./shedule.model"));
// Get all classes for a user
const getClasses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classes = yield shedule_model_1.default.find({ userId: req.body.userId });
        res.json(classes);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getClasses = getClasses;
// Get a single class by ID
const getClassById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classItem = yield shedule_model_1.default.findById(req.params.id);
        if (!classItem) {
            return res.status(404).json({ message: "Class not found" });
        }
        res.json(classItem);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getClassById = getClassById;
// Add a new class
const addClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subject, instructor, day, startTime, endTime, color, userId } = req.body;
    // Validate required fields
    if (!subject || !instructor || !day || !startTime || !endTime) {
        return res.status(400).json({ message: "All fields are required!" });
    }
    // Validate time
    if (startTime >= endTime) {
        return res
            .status(400)
            .json({ message: "Start time must be before end time!" });
    }
    try {
        const newClass = new shedule_model_1.default({
            subject,
            instructor,
            day,
            startTime,
            endTime,
            color,
            userId,
        });
        yield newClass.save();
        res.status(201).json(newClass);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.addClass = addClass;
// Update a class by ID
const updateClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedClass = yield shedule_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedClass);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.updateClass = updateClass;
// Delete a class by ID
const deleteClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield shedule_model_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: "Class deleted" });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.deleteClass = deleteClass;

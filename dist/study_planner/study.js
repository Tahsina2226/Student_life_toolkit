"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const studyPlanSchema = new mongoose_1.Schema({
    subject: { type: String, required: true, trim: true },
    topic: { type: String, trim: true, default: "" },
    priority: { type: String, enum: ["low", "medium", "high"], required: true },
    deadline: { type: Date },
    daySlot: { type: String, trim: true },
    startTime: { type: String, trim: true },
    endTime: { type: String, trim: true },
    durationMinutes: { type: Number, min: 0 },
    notes: { type: String, default: "" },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});
exports.default = (0, mongoose_1.model)("StudyPlan", studyPlanSchema);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const questionSchema = new mongoose_1.Schema({
    questionText: { type: String, required: true },
    options: { type: [String], default: [] },
    answer: { type: mongoose_1.Schema.Types.Mixed, required: true },
    type: { type: String, enum: ["mcq", "short", "truefalse"], required: true },
    difficulty: {
        type: String,
        enum: ["easy", "medium", "hard"],
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
});
exports.default = (0, mongoose_1.model)("Question", questionSchema);

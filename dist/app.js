"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const shedule_route_1 = __importDefault(require("./classShedule/shedule.route"));
const income_routes_1 = __importDefault(require("./budgetTracker/income/income.routes"));
const expense_routes_1 = __importDefault(require("./budgetTracker/expense/expense.routes"));
const summary_routes_1 = __importDefault(require("./budgetTracker/summary/summary.routes"));
const study_routes_1 = __importDefault(require("./studyPlanner/study.routes"));
const question_routes_1 = __importDefault(require("./ExamQ&A/question.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Welcome to Student Life Toolkit");
});
app.use("/api/classes", shedule_route_1.default);
app.use("/api/income", income_routes_1.default);
app.use("/api/expenses", expense_routes_1.default);
app.use("/api/summary", summary_routes_1.default);
app.use("/api/questions", question_routes_1.default);
app.use("/api/study", study_routes_1.default);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res
        .status(500)
        .json({ message: err.message || "Server encountered an issue!" });
});
exports.default = app;

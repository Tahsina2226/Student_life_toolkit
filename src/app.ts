import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import classRoutes from "./classShedule/shedule.route";
import incomeRoutes from "./budgetTracker/income/income.routes";
import expenseRoutes from "./budgetTracker/expense/expense.routes";
import summaryRoutes from "./budgetTracker/summary/summary.routes";
import studyRoutes from "./studyPlanner/study.routes";
import questionRoutes from "./ExamQ&A/question.routes";
import authRoutes from "./auth/auth.route";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Student Life Toolkit");
});

app.use("/api/classes", classRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/summary", summaryRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/study", studyRoutes);
app.use("/api/auth", authRoutes);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: err.message || "Server encountered an issue!" });
});

export default app;

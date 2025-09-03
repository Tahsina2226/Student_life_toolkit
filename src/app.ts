import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import classRoutes from "../src/class_shedule/shedule.route";
import incomeRoutes from "./budget-tracker/income/income.routes";
import expenseRoutes from "./budget-tracker/expense/expense.routes";
import summaryRoutes from "./budget-tracker/summary/summary.routes";

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
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: err.message || "Server encountered an issue!" });
});

export default app;

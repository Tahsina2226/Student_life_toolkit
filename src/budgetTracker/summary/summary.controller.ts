
import { Request, Response } from "express";
import Income from "../income/income.model";
import Expense from "../expense/Expense";

export const getSummary = async (req: Request, res: Response) => {
  try {
    const totalIncome = await Income.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalExpenses = await Expense.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const summary = {
      totalIncome: totalIncome[0]?.total || 0,
      totalExpenses: totalExpenses[0]?.total || 0,
      savings: (totalIncome[0]?.total || 0) - (totalExpenses[0]?.total || 0),
    };

    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

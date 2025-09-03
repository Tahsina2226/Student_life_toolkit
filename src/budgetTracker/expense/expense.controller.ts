import { Request, Response } from "express";
import Expense from "./Expense";

export const addExpense = async (req: Request, res: Response) => {
  try {
    const { category, amount } = req.body;
    if (!category || amount < 0)
      return res.status(400).json({ message: "Invalid input" });

    const expense = await Expense.create({ category, amount });
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getExpenses = async (req: Request, res: Response) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Expense.findByIdAndDelete(id);
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

import { Request, Response } from "express";
import Income from "./income.model";

// Add Income
export const addIncome = async (req: Request, res: Response) => {
  try {
    const { source, amount } = req.body;
    if (!source || amount < 0)
      return res.status(400).json({ message: "Invalid input" });

    const income = await Income.create({ source, amount });
    res.status(201).json(income);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get All Income
export const getIncome = async (req: Request, res: Response) => {
  try {
    const incomes = await Income.find();
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete Income
export const deleteIncome = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Income.findByIdAndDelete(id);
    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

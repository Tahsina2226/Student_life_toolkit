import { Schema, model } from "mongoose";

interface Expense {
  category: string;
  amount: number;
  date: Date;
}

const expenseSchema = new Schema<Expense>({
  category: { type: String, required: true },
  amount: { type: Number, required: true, min: 0 },
  date: { type: Date, default: Date.now },
});

export default model<Expense>("Expense", expenseSchema);

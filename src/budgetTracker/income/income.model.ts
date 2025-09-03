import { Schema, model } from "mongoose";

interface Income {
  source: string;
  amount: number;
  date: Date;
}

const incomeSchema = new Schema<Income>({
  source: { type: String, required: true },
  amount: { type: Number, required: true, min: 0 },
  date: { type: Date, default: Date.now },
});

export default model<Income>("Income", incomeSchema);
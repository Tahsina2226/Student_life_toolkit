import mongoose, { Document, Schema } from "mongoose";

export interface IQuestion extends Document {
  question: string;
  type: "MCQ" | "True/False" | "Short Answer";
  options?: string[];
  answer: string;
  difficulty: "easy" | "medium" | "hard";
}

const QuestionSchema: Schema = new Schema({
  question: { type: String, required: true },
  type: {
    type: String,
    enum: ["MCQ", "True/False", "Short Answer"],
    required: true,
  },
  options: { type: [String], default: [] },
  answer: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
});

export default mongoose.model<IQuestion>("Question", QuestionSchema);

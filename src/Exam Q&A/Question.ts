
import { Schema, model } from "mongoose";

export interface Question {
  questionText: string;
  options?: string[]; 
  answer: string | boolean;
  type: "mcq" | "short" | "truefalse";
  difficulty: "easy" | "medium" | "hard";
  createdAt?: Date;
}

const questionSchema = new Schema<Question>({
  questionText: { type: String, required: true },
  options: { type: [String], default: [] },
  answer: { type: Schema.Types.Mixed, required: true },
  type: { type: String, enum: ["mcq", "short", "truefalse"], required: true },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export default model<Question>("Question", questionSchema);

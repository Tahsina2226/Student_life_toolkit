import mongoose, { Schema, Document } from "mongoose";

export interface StudyPlan extends Document {
  subject: string;
  topic: string;
  priority: "low" | "medium" | "high";
  deadline: Date;
  day: string;
  startTime: string;
  durationMinutes: number;
  completed: boolean;
  createdAt: Date;
}

const StudyPlanSchema: Schema = new Schema({
  subject: { type: String, required: true },
  topic: { type: String, required: true },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    required: true,
  },
  deadline: { type: Date, required: true },
  day: { type: String, required: true },
  startTime: { type: String, required: true }, 
  durationMinutes: { type: Number, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<StudyPlan>("StudyPlan", StudyPlanSchema);

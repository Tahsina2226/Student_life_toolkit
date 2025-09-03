import { Schema, model } from "mongoose";

export type Priority = "low" | "medium" | "high";

export interface StudyPlan {
  subject: string;
  topic?: string;
  priority: Priority;
  deadline?: Date;
  daySlot?: string;
  startTime?: string;
  endTime?: string;
  durationMinutes?: number;
  notes?: string;
  completed?: boolean;
  createdAt?: Date;
}

const studyPlanSchema = new Schema<StudyPlan>({
  subject: { type: String, required: true, trim: true },
  topic: { type: String, trim: true, default: "" },
  priority: { type: String, enum: ["low", "medium", "high"], required: true },
  deadline: { type: Date },
  daySlot: { type: String, trim: true },
  startTime: { type: String, trim: true },
  endTime: { type: String, trim: true },
  durationMinutes: { type: Number, min: 0 },
  notes: { type: String, default: "" },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default model<StudyPlan>("StudyPlan", studyPlanSchema);

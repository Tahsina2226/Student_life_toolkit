import mongoose, { Schema, Document } from "mongoose";

export interface IClass extends Document {
  subject: string;
  instructor: string;
  day: string;
  startTime: string;
  endTime: string;
  color: string;
  userId: string;
}

const classSchema: Schema<IClass> = new Schema(
  {
    subject: { type: String, required: true },
    instructor: { type: String, required: true },
    day: {
      type: String,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      required: true,
    },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    color: { type: String, default: "#4ade80" },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IClass>("Class", classSchema);

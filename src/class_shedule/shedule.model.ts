import mongoose, { Schema, Document } from "mongoose";

export interface IClass extends Document {
  subject: string;
  instructor: string;
  day:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
  startTime: string;
  endTime: string;
  color: string;
  userId: mongoose.Types.ObjectId;
}

const classSchema: Schema<IClass> = new Schema(
  {
    subject: { type: String, required: true },
    instructor: { type: String, required: true },
    day: {
      type: String,
      required: true,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    color: { type: String, default: "#4ade80" },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IClass>("Class", classSchema);

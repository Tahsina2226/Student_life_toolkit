import mongoose, { Schema, Document } from "mongoose";

export interface IStudySession extends Document {
  userId: mongoose.Types.ObjectId;
  subject: string;
  duration: number; // minutes
  date: Date;
}

const studySessionSchema = new Schema<IStudySession>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    subject: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<IStudySession>(
  "StudySession",
  studySessionSchema
);

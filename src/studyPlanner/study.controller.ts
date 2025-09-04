import { Request, Response } from "express";
import StudyPlan from "./study";

const isValidTime = (time: string) => /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(time);

export const createStudyPlan = async (req: Request, res: Response) => {
  try {
    const {
      subject,
      topic,
      priority,
      deadline,
      day,
      startTime,
      durationMinutes,
    } = req.body;

    if (
      !subject ||
      !topic ||
      !priority ||
      !deadline ||
      !day ||
      !startTime ||
      durationMinutes === undefined
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!["low", "medium", "high"].includes(priority)) {
      return res
        .status(400)
        .json({ message: "Priority must be low, medium, or high." });
    }

    if (!isValidTime(startTime)) {
      return res.status(400).json({ message: "Invalid time format (HH:MM)." });
    }

    if (durationMinutes < 0) {
      return res
        .status(400)
        .json({ message: "Duration must be zero or positive." });
    }

    const newPlan = new StudyPlan({
      subject,
      topic,
      priority,
      deadline,
      day,
      startTime,
      durationMinutes,
    });

    const savedPlan = await newPlan.save();
    res.status(201).json(savedPlan);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllStudyPlans = async (_req: Request, res: Response) => {
  try {
    const plans = await StudyPlan.find().sort({ createdAt: -1 });
    res.json(plans);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudyPlanById = async (req: Request, res: Response) => {
  try {
    const plan = await StudyPlan.findById(req.params.id);
    if (!plan)
      return res.status(404).json({ message: "Study plan not found." });
    res.json(plan);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStudyPlan = async (req: Request, res: Response) => {
  try {
    const updates = req.body;

    if (
      updates.priority &&
      !["low", "medium", "high"].includes(updates.priority)
    ) {
      return res
        .status(400)
        .json({ message: "Priority must be low, medium, or high." });
    }

    if (updates.startTime && !isValidTime(updates.startTime)) {
      return res.status(400).json({ message: "Invalid time format (HH:MM)." });
    }

    if (updates.durationMinutes !== undefined && updates.durationMinutes < 0) {
      return res
        .status(400)
        .json({ message: "Duration must be zero or positive." });
    }

    if (updates.deadline) {
      const d = new Date(updates.deadline);
      if (isNaN(d.getTime())) {
        return res.status(400).json({ message: "Invalid deadline date." });
      }
      updates.deadline = d;
    }

    const updatedPlan = await StudyPlan.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );
    if (!updatedPlan)
      return res.status(404).json({ message: "Study plan not found." });

    res.json(updatedPlan);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteStudyPlan = async (req: Request, res: Response) => {
  try {
    const deletedPlan = await StudyPlan.findByIdAndDelete(req.params.id);
    if (!deletedPlan)
      return res.status(404).json({ message: "Study plan not found." });
    res.json({ message: "Study plan deleted successfully." });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const markComplete = async (req: Request, res: Response) => {
  try {
    const plan = await StudyPlan.findByIdAndUpdate(
      req.params.id,
      { completed: true },
      { new: true }
    );
    if (!plan)
      return res.status(404).json({ message: "Study plan not found." });
    res.json(plan);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getScheduleByDay = async (req: Request, res: Response) => {
  try {
    const { day } = req.params;
    const plans = await StudyPlan.find({ day, completed: false }).sort({
      startTime: 1,
    });
    res.json(plans);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

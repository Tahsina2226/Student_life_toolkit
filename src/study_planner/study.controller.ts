import { Request, Response } from "express";
import StudyPlan from "./study";

const isValidTime = (t?: string) => {
  if (!t) return false;
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(t);
};

export const addStudyPlan = async (req: Request, res: Response) => {
  try {
    const {
      subject,
      topic,
      priority,
      deadline,
      daySlot,
      startTime,
      endTime,
      durationMinutes,
      notes,
    } = req.body;

    if (!subject || !priority) {
      return res
        .status(400)
        .json({ message: "subject and priority are required" });
    }
    if (!["low", "medium", "high"].includes(priority)) {
      return res
        .status(400)
        .json({ message: "priority must be one of 'low', 'medium', 'high'" });
    }
    if (
      (startTime && !isValidTime(startTime)) ||
      (endTime && !isValidTime(endTime))
    ) {
      return res
        .status(400)
        .json({ message: "startTime/endTime must be in HH:MM 24-hour format" });
    }
    if (durationMinutes && durationMinutes < 0) {
      return res.status(400).json({ message: "durationMinutes must be >= 0" });
    }

    const plan = await StudyPlan.create({
      subject,
      topic,
      priority,
      deadline: deadline ? new Date(deadline) : undefined,
      daySlot,
      startTime,
      endTime,
      durationMinutes,
      notes,
    });

    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getStudyPlans = async (req: Request, res: Response) => {
  try {
    const { subject, priority, daySlot, completed, beforeDeadline } = req.query;
    const filter: any = {};

    if (subject) filter.subject = subject;
    if (priority) filter.priority = priority;
    if (daySlot) filter.daySlot = daySlot;
    if (completed !== undefined) filter.completed = completed === "true";
    if (beforeDeadline)
      filter.deadline = { $lte: new Date(String(beforeDeadline)) };

    const plans = await StudyPlan.find(filter).sort({
      priority: -1,
      deadline: 1,
      createdAt: -1,
    });
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getStudyPlanById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const plan = await StudyPlan.findById(id);
    if (!plan) return res.status(404).json({ message: "Plan not found" });
    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateStudyPlan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (
      updates.priority &&
      !["low", "medium", "high"].includes(updates.priority)
    ) {
      return res.status(400).json({ message: "Invalid priority value" });
    }
    if (
      (updates.startTime && !isValidTime(updates.startTime)) ||
      (updates.endTime && !isValidTime(updates.endTime))
    ) {
      return res
        .status(400)
        .json({ message: "Invalid time format for startTime/endTime" });
    }
    if (updates.durationMinutes && updates.durationMinutes < 0) {
      return res.status(400).json({ message: "durationMinutes must be >= 0" });
    }
    if (updates.deadline) updates.deadline = new Date(updates.deadline);

    const plan = await StudyPlan.findByIdAndUpdate(id, updates, { new: true });
    if (!plan) return res.status(404).json({ message: "Plan not found" });
    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteStudyPlan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await StudyPlan.findByIdAndDelete(id);
    res.status(200).json({ message: "Study plan deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const markComplete = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const plan = await StudyPlan.findByIdAndUpdate(
      id,
      { completed: true },
      { new: true }
    );
    if (!plan) return res.status(404).json({ message: "Plan not found" });
    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getScheduleByDay = async (req: Request, res: Response) => {
  try {
    const { day } = req.params;
    const plans = await StudyPlan.find({ daySlot: day, completed: false }).sort(
      { startTime: 1 }
    );
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

import { Request, Response } from "express";
import Class, { IClass } from "./shedule.model";

// Get all classes for a user
export const getClasses = async (req: Request, res: Response) => {
  try {
    const classes = await Class.find({ userId: req.body.userId });
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Get a single class by ID
export const getClassById = async (req: Request, res: Response) => {
  try {
    const classItem = await Class.findById(req.params.id);
    if (!classItem) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.json(classItem);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Add a new class
export const addClass = async (req: Request, res: Response) => {
  const { subject, instructor, day, startTime, endTime, color, userId } =
    req.body;

  // Validate required fields
  if (!subject || !instructor || !day || !startTime || !endTime) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  // Validate time
  if (startTime >= endTime) {
    return res
      .status(400)
      .json({ message: "Start time must be before end time!" });
  }

  try {
    const newClass: IClass = new Class({
      subject,
      instructor,
      day,
      startTime,
      endTime,
      color,
      userId,
    });
    await newClass.save();
    res.status(201).json(newClass);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

// Update a class by ID
export const updateClass = async (req: Request, res: Response) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedClass);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

// Delete a class by ID
export const deleteClass = async (req: Request, res: Response) => {
  try {
    await Class.findByIdAndDelete(req.params.id);
    res.json({ message: "Class deleted" });
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

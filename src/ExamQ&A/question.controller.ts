import { Request, Response } from "express";
import Question from "./Question";

export const addQuestion = async (req: Request, res: Response) => {
  try {
    const { questionText, options, answer, type, difficulty } = req.body;
    if (!questionText || !answer || !type || !difficulty)
      return res.status(400).json({ message: "Missing required fields" });

    const question = await Question.create({
      questionText,
      options,
      answer,
      type,
      difficulty,
    });
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getQuestions = async (req: Request, res: Response) => {
  try {
    const { difficulty, type } = req.query;

    const filter: any = {};
    if (difficulty) filter.difficulty = difficulty;
    if (type) filter.type = type;

    const questions = await Question.find(filter);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Question.findByIdAndDelete(id);
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Generate Random Question
export const generateRandomQuestion = async (req: Request, res: Response) => {
  try {
    const { difficulty, type } = req.query;

    const filter: any = {};
    if (difficulty) filter.difficulty = difficulty;
    if (type) filter.type = type;

    const count = await Question.countDocuments(filter);
    const randomIndex = Math.floor(Math.random() * count);
    const question = await Question.findOne(filter).skip(randomIndex);

    if (!question)
      return res.status(404).json({ message: "No question found" });
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

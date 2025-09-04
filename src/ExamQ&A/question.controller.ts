import { Request, Response } from "express";
import Question, { IQuestion } from "./Question";

// GET all questions
export const getQuestions = async (req: Request, res: Response) => {
  try {
    const difficulty = req.query.difficulty as string | undefined;
    const filter = difficulty ? { difficulty } : {};
    const questions = await Question.find(filter);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// POST new question
export const createQuestion = async (req: Request, res: Response) => {
  try {
    const newQuestion: IQuestion = new Question(req.body);
    const savedQuestion = await newQuestion.save();
    res.json(savedQuestion);
  } catch (err) {
    res.status(400).json({ error: "Invalid Data" });
  }
};

// UPDATE question
export const updateQuestion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedQuestion = await Question.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedQuestion)
      return res.status(404).json({ error: "Question not found" });
    res.json(updatedQuestion);
  } catch (err) {
    res.status(400).json({ error: "Invalid Data" });
  }
};

// DELETE question
export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedQuestion = await Question.findByIdAndDelete(id);
    if (!deletedQuestion)
      return res.status(404).json({ error: "Question not found" });
    res.json({ message: "Question deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

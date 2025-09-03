import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import classRoutes from "../src/class_shedule/shedule.route";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Student Life Toolkit");
});

app.use("/api/classes", classRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: err.message || "Server encountered an issue!" });
});

export default app;

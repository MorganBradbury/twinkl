import express, { Request, Response } from "express";
import userRouter from "./routers/userRouter";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response): void => {
  res.status(200).json({ message: "Hello, world!" });
});

// Main Routes and middleware
app.use("/", userRouter);

// Export the app
export default app;
import express, { Request, Response } from "express";


const app = express();

// Middleware
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response): void => {
  res.status(200).json({ message: "Hello, world!" });
});


// Export the app
export default app;
import { Request, Response, NextFunction } from "express";
import { validateUserRequest } from "../config/zod";

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validateUserRequest.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: result.error.errors.map((e) => e.message),
    });
  }
  next();
};
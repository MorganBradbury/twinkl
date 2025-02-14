// userController.ts

import { Request, Response, NextFunction } from "express";
import { createUser, getUserById } from "../services/userService";
import { User } from "../types/User";

// Sign up API.
export const signUp = async (
  req: Request<User>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullName, email, password, userType } = req.body;
    const user = await createUser(fullName, email, password, userType);
    res
      .status(201)
      .json({ message: "User created successfully", userId: user.id });
  } catch (error) {
    next(error);
  }
};

// Get user API
export const getUser = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    // Goes to DB and gets user by ID. If No ID, return Not found.
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    next(error);
  }
};
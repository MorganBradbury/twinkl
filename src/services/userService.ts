import { PrismaClient, UserType } from "@prisma/client";
import bcrypt from "bcryptjs";
import { AppError } from "../utils/appError";

const prisma = new PrismaClient();

export const createUser = async (
  fullName: string,
  email: string,
  password: string,
  userType: UserType
) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    // Throw an APP error when user already exists. This is caught in the errorHandler middleware.
    throw new AppError("User already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: { fullName, email, password: hashedPassword, userType },
  });
};

export const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      fullName: true,
      email: true,
      userType: true,
      createdAt: true,
    },
  });
};
import { PrismaClient, UserType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const createUser = async (
  fullName: string,
  email: string,
  password: string,
  userType: UserType
) => {
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
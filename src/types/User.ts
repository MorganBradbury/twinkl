import { UserType } from "@prisma/client";

export type User = {
  fullName: string;
  email: string;
  password: string;
  userType: UserType;
};
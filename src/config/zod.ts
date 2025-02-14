import { z } from "zod";
import { validationMessages } from "./constants";
import { UserType } from "@prisma/client";

export const validateUserRequest = z.object({
  fullName: z
    .string({
      required_error: validationMessages.fullName,
    })
    .nonempty(validationMessages.fullName),
  
  email: z
    .string({
      required_error: validationMessages.email,
    })
    .email("Invalid email format"),
  
  password: z
    .string({
      required_error: validationMessages.password,
    })
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be at most 64 characters")
    .regex(/[0-9]/, "Password must contain a number")
    .regex(/[a-z]/, "Password must contain a lowercase letter")
    .regex(/[A-Z]/, "Password must contain an uppercase letter"),
  
  userType: z.nativeEnum(UserType, {
    required_error: validationMessages.userType,
  }),
});

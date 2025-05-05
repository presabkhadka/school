import { z } from "zod";

export const adminValidation = z.object({
  userName: z.string().min(1, "Username is required"),
  userEmail: z.string().email("Invalid email format"),
  userPassword: z.string().min(8, "Password must be minimum 8 characters"),
  userContact: z
    .string()
    .min(10, "Contact number should be 10 characters")
    .max(10, "Contact number cannot exceed more than 10 characters"),
});

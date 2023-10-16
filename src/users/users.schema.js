import z from "zod";
import { extracValidationData } from "../common/utils/extracErrorData.js";

export const userSchema = z.object({
  name: z.string().min(3).max(99),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(["client", "employee"]),
});

export function validateUser(data) {
  const result = userSchema.safeParse(data);

  const {
    data: userData,
    hasError,
    errorMessages,
  } = extracValidationData(result);

  return {
    userData,
    errorMessages,
    hasError,
  };
}

export function validatePartialUser(data) {
  const result = userSchema.partial().safeParse(data);

  const {
    data: userData,
    errorMessages,
    hasError,
  } = extracValidationData(result);

  return {
    errorMessages,
    hasError,
    userData,
  };
}

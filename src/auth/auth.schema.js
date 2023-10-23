import z from "zod";
import { extracValidationData } from "../common/utils/extracErrorData.js";

const registerSchema = z.object({
  fullname: z
    .string()
    .min(3, { message: "Name is too short" })
    .max(199, { message: "Name is too long" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8, { message: "Password is too short" }),
  role: z.enum(["client", "employee"]),
});

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8, { message: "Password is too short" }),
});

export const validateRegister = (data) => {
  const result = registerSchema.safeParse(data);

  const {
    data: registerData,
    errorMessages,
    hasError,
  } = extracValidationData(result);

  return {
    errorMessages,
    hasError,
    registerData,
  };
};

export const validateLogin = (data) => {
  const result = loginSchema.safeParse(data);

  const {
    data: loginData,
    errorMessages,
    hasError,
  } = extracValidationData(result);

  return {
    errorMessages,
    hasError,
    loginData,
  };
};

export const validateUserAuth = (data) => {
  const result = registerSchema.partial().safeParse(data)

  const {
    data: userData,
    errorMessages,
    hasError
  } = extracValidationData(result)

  return {
    errorMessages,
    hasError,
    userData
  }
}

import z from "zod";
import { extracValidationData } from "../common/utils/extracErrorData.js";

export const repairSchema = z.object({
  date: z.string(),
  motorsNumber: z.number().positive(),
  description: z.string().min(3).max(254),
  createdBy: z.number(),
});

export function validateRepair(data) {
  const result = repairSchema.safeParse(data);

  const {
    errorMessages,
    data: repairData,
    hasError,
  } = extracValidationData(result);

  return {
    errorMessages,
    hasError,
    repairData,
  };
}

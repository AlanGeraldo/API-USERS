import { AppError } from "../errors/appError.js";
import { RepairsService } from "./repairs.services.js";

const reapirService = new RepairsService();

export const validateExistRepair = async (req, res, next) => {
  const { id } = req.params;

  const repair = await reapirService.findOneRepair(id);

  if (!repair) {
    return next(new AppError(`Repair with id: ${id} not found`, 404));
  }

  req.repair = repair;

  next();
};

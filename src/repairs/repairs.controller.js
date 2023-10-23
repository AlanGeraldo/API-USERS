import { catchAsync } from "../errors/index.js";
import { validateRepair } from "./repairs.schema.js";
import { RepairsService } from "./repairs.services.js";

const repairService = new RepairsService();

export const findAllRepairs = catchAsync(async (req, res, next) => {
  const repairs = await repairService.findAllWithData();

  return res.json(repairs);
});

export const findOneRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;

  return res.json(repair);
});

export const createRepairs = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, repairData } = validateRepair(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessages,
    });
  }

  const repair = await repairService.createRepair(repairData);

  return res.status(201).json(repair);
});

export const updateRepair = catchAsync(async (req, res) => {
  const { repair } = req;

  const updateRepair = await repairService.updateRepair(repair);
  return res.json(updateRepair);
});

export const deleteRepair = catchAsync(async (req, res) => {
  const { repair } = req;

  await repairService.deleteRepair(repair);

  return res.status(204).json(null);
});

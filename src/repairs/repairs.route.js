import { Router } from "express";
import {
  createRepairs,
  deleteRepair,
  findAllRepairs,
  findOneRepair,
  updateRepair,
} from "./repairs.controller.js";
import { validateExistRepair } from "./repairs.middleware.js";
import { protect, restrictTo } from "../auth/auth.middleware.js";

export const router = Router();

router.use(protect);

router
  .route("/")
  .get(restrictTo("employee"), findAllRepairs)
  .post(restrictTo("employee"), createRepairs);

router
  .use("/:id", validateExistRepair)
  .route("/:id")
  .get(restrictTo("employee"), findOneRepair)
  .patch(restrictTo("employee"), updateRepair)
  .delete(restrictTo("employee"), deleteRepair);

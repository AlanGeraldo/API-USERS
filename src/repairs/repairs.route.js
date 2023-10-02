import { Router } from "express";
import {
  createRepairs,
  deleteRepair,
  findAllRepairs,
  findOneRepair,
  updateRepair,
} from "./repairs.controller.js";

export const router = Router();

router.route("/").get(findAllRepairs).post(createRepairs);

router
  .route("/:id")
  .get(findOneRepair)
  .patch(updateRepair)
  .delete(deleteRepair);

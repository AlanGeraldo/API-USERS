import Router from "express";
import {
  createUser,
  deleteUser,
  findAllUsers,
  findOneUser,
  updateUser,
} from "./users.controller.js";
import { validateExistUser } from "../users/users.middleware.js";

export const router = Router();

router.route("/").get(findAllUsers).post(createUser);

router
  .use("/:id", validateExistUser)
  .route("/:id")
  .get(findOneUser)
  .patch(updateUser)
  .delete(deleteUser);

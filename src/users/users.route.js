import Router from "express";
import {
  createUser,
  deleteUser,
  findAllUsers,
  findOneUser,
  updateUser,
} from "./users.controller.js";

export const router = Router();

router
.route('/')
.get(findAllUsers)
.post(createUser)

router
.route('/:id')
.get(findOneUser)
.patch(updateUser)
.delete(deleteUser)

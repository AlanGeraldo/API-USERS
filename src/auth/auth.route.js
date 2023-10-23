import express from "express";
import { login, register, updateUser, deleteUserAuth } from "./auth.controller.js";
import { protect, restrictTo, validateExistUserById, protectAccountOwner} from "./auth.middleware.js";

export const router = express.Router();

router.post("/login", login);

router.post("/register",restrictTo("employee"), register);

router.patch('/:id',protect, validateExistUserById ,updateUser)

router.delete('/:id', protect ,validateExistUserById, protectAccountOwner ,deleteUserAuth)
import express from "express";
import { login, register } from "./auth.controller.js";
import { protect, restrictTo } from "./auth.middleware.js";

export const router = express.Router();

router.post("/login", login);
router.post("/register", protect, restrictTo("employee"), register);

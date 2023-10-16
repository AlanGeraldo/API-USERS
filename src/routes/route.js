import { Router } from "express";
import { router as userRouter } from "../users/users.route.js";
import { router as repairsRouter } from "../repairs/repairs.route.js";
import { router as authRouter } from "../auth/auth.route.js";

export const router = Router()

router.use('/login', authRouter)

router.use('/users', userRouter)
router.use('/repairs', repairsRouter)
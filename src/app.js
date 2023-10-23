import express from "express";
import { router } from "./routes/route.js";
import { AppError } from "./errors/appError.js";
import { globalErrorHandler } from "./errors/error.controller.js";
import { envs } from "./config/env/enviroments.js";
import { enableMorgan } from "./config/plugin/morgan.plugin.js";

const app = express();

app.use(express.json());

if (envs.NODE_ENV === 'development') {
  enableMorgan(app)
}

app.use("/api/v1", router);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;

import { envs } from "../config/env/enviroments.js";
import Error from "./error.model.js";
import { AppError } from "./appError.js";

const handelCastError22001 = () => {
    return new AppError('Value too long type an attribute in database', 400)
}

const handelCastError23505 = () => {
    return new AppError('Duplicate field value: please use another value', 400)
}

const handleCast22P02 = () => {
    return new AppError('Invalid data type in database', 400)
}

const handleJWTExpiredError = () => {
    return new AppError('Your token has expired! Please login again', 401)
}

const handleJWTInvalid = () => {
    return new AppError('Invalid token. Please login again', 401)
}


const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = async (err, res) => {
  await Error.create({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });

  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log("ERROR", err);
    res.status(500).json({
      status: "fail",
      message: "Something went very wrong!",
    });
  }
};

export const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'fail';

    if (envs.NODE_ENV === 'development') {
        sendErrorDev(err, res)
    }

    if (envs.NODE_ENV === 'production') {
        let error = err;

        if (err.parent?.code === '22001') error = handelCastError22001()
        if (err.parent?.code === '23505') error = handelCastError23505()
        if (err.parent?.code === '22P02') error = handleCast22P02()
        if (err.name === 'TokenExpiredError') error = handleJWTExpiredError()
        if (err.name === 'JsonWebTokenError') error = handleJWTInvalid()

        sendErrorProd(error, res)
    }
}

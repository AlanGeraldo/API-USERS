import { envs } from "../config/env/enviroments.js";
import { AppError, catchAsync } from "../errors/index.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import { AuthService } from "./auth.services.js";

const authService = new AuthService();

export const protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access")
    );
  }

  const decoded = await promisify(jwt.verify)(token, envs.SECRET_JWT_SEED);

  const register = await authService.findOneRegisterById(decoded.id);

  if (!register) {
    return next(
      new AppError("The owner of this token is not longer available", 401)
    );
  }

  req.sessionRegister = register;

  next();
});

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionRegister.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};

export const protectAccountOwner = (req, res, next) => {
  const {user, sessionRegister } = req;

  if (user.id !== sessionRegister.id) {
    return next(new AppError('You do not own this accound', 401))
  }
  next()
}

export const validateExistUserById = async (req, res, next) => {
  const { id } = req.params

  const user = await authService.findOneUserAuth(id)

  if (!user) {
    return next(new AppError(`User with id: ${id} not found`, 404))
  }

  req.user = user

  next()

}

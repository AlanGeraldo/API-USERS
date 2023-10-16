import { AppError } from "../errors/index.js";
import { UserService } from "./users.services.js";

const userService = new UserService();

export const validateExistUser = async (req, res, next) => {
  const { id } = req.params;

  const user = await userService.findOneUser(id);

  if (!user) {
    return next(new AppError(`User with id: ${id} not found`, 404))
  }

  req.user = user;

  next()
};

import { catchAsync } from "../errors/index.js";
import { validatePartialUser, validateUser } from "./users.schema.js";
import { UserService } from "./users.services.js";

const userService = new UserService();

export const findAllUsers = catchAsync(async (req, res, next) => {
  const users = await userService.findAllUsers();

  return res.json(users);
});

export const createUser = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, userData } = validateUser(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessages,
    });
  }

  const user = await userService.createUser(userData);

  return res.status(201).json(user);
});

export const findOneUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  return res.json(user);
});

export const updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  const { errorMessages, hasError, userData } = validatePartialUser(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessages,
    });
  }

  const updatedUser = await userService.updateUser(user, userData);

  return res.json(updatedUser);
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await userService.deleteUser(user);

  res.status(204).json(null);
});

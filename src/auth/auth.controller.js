import { verifyPassword } from "../config/plugin/encripted-password.plugin.js";
import generateJWT from "../config/plugin/generate-jwt.plugin.js";
import { AppError, catchAsync } from "../errors/index.js";
import { validateLogin, validateRegister, validateUserAuth } from "./auth.schema.js";
import { AuthService } from "./auth.services.js";

const authService = new AuthService();

export const login = catchAsync(async (req, res, next) => {
  const { errorMessages, hasError, loginData } = validateLogin(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessages,
    });
  }

  const register = await authService.findOneByEmail(loginData.email);

  if (!register) {
    return next(new AppError("This accound does not exist", 404));
  }

  const isCorrectPassword = await verifyPassword(
    loginData.password,
    register.password
  );

  if (!isCorrectPassword) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = await generateJWT(register.id);

  return res.status(200).json({
    token,
    register: {
      id: register.id,
      fullname: register.fullname,
      email: register.email,
      role: register.role,
    },
  });
});

export const register = catchAsync(async (req, res, next) => {
  const { errorMessages, hasError, registerData } = validateRegister(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessages,
    });
  }

  const register = await authService.createRegister(registerData);

  const token = await generateJWT(register.id);

  return res.status(201).json({
    token,
    register: {
      id: register.id,
      fullname: register.fullname,
      email: register.email,
      role: register.role,
    },
  });
});

export const updateUser = catchAsync( async (req, res, next) => {
  const { user } = req;

  const {
    errorMessages,
    hasError,
    userData
  } = validateUserAuth(req.body)

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    })
  }

  const updateUser = await authService.updateUser(user, userData)

  return res.json(updateUser)
})

export const deleteUserAuth = catchAsync( async (req, res, next) => {
  const { user } = req;

  await authService.deleteuserAuth(user)

  res.status(204).json(null)
})

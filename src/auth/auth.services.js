import Register from "./auth.model.js";

export class AuthService {
  async createRegister(data) {
    return await Register.create(data);
  }

  async findOneRegisterById(id) {
    return await Register.findOne({
      where: {
        id,
        status: true,
      },
    });
  }

  async findOneByEmail(email) {
    return await Register.findOne({
      where: {
        email,
        status: true,
      },
    });
  }
}

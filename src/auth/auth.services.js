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

  async findOneUserAuth(id) {
    return await Register.findOne({
      where: {
        id,
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

  async updateUser (user,data) {
    return await user.update(data)
  }

  async deleteuserAuth (user) {
    return await user.update({status: false})
  }
}

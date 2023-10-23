import { Repair } from "./repairs.model.js";
import User from "../users/users.model.js";
import { Op } from "sequelize";

export class RepairsService {
  async findAllRepairs() {
    return await Repair.findAll({
      where: {
        status: "pending",
      },
    });
  }

  async findAllWithData () {
    return await Repair.findAll({
      where: {
        status: {
          [Op.in]: ['pending', 'completed']
        }
      },
      include: [
        {
          model: User
        }
      ]
    })
  }

  async findOneRepair(id) {
    return await Repair.findOne({
      where: {
        id,
        status: "pending",
      },
    });
  }

  async createRepair(data) {
    return await Repair.create(data);
  }

  async updateRepair(repair) {
    return await repair.update({ status: "completed" });
  }

  async deleteRepair(repair) {
    return await repair.update({
      status: "cancelled",
    });
  }
}

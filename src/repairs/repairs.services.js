import { Repair } from "./repairs.model.js";

export class RepairsService {
  async findAllRepairs() {
    return await Repair.findAll({
      where: {
        status: "pending",
      },
    });
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

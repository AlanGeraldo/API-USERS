import { RepairsService } from "./repairs.services.js";

const repairService = new RepairsService();

export const findAllRepairs = async (req, res) => {
  try {
    const repairs = await repairService.findAllRepairs();

    return res.json(repairs);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const findOneRepair = async (req, res) => {
  try {
    const { id } = req.params;

    const repair = await repairService.findOneRepair(id);

    if (!repair) {
      return res.status(404).json({
        status: "error",
        message: `Request with id: ${id} not found`,
      });
    }
    return res.json(repair);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createRepairs = async (req, res) => {
  try {
    const repair = await repairService.createRepair(req.body);

    return res.status(201).json(repair);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateRepair = async (req, res) => {
  try {
    const { id } = req.params;

    const repair = await repairService.findOneRepair(id);

    if (!repair) {
      return res.status(404).json({
        status: "error",
        message: `Request with id: ${id} not found`,
      });
    }

    const updateRepair = await repairService.updateRepair(repair, req.body);
    return res.json(updateRepair);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteRepair = async (req, res) => {
    try {
        
        const { id } = req.params

        const repair = await repairService.findOneRepair(id)

        if (!repair) {
            return res.status(404).json({
                status: 'error',
                message: `Request with id: ${id} not found`
            })
        }

        await repairService.deleteRepair(repair)

        return res.status(204).json(null)

    } catch (error) {
        return res.status(500).json(error)        
    }
}
import { Request, Response, NextFunction } from "express";
import EquipmentModel from "../../models/Equipment";

// inputs email , password

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const equipments = await EquipmentModel.find();

    return res.status(200).json({
      total: equipments.length,
      equipments
    });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const _id = req.params.id;

    const doc = await EquipmentModel.findOne({ _id });

    if (!doc)
      return res.status(400).json({
        message: "Product with given id doesnot exist",
        id: _id
      });

    return res.status(200).json(doc);
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}

export async function getEquipmentsByFarmer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const farmer = req["userData"]._id;

    const equipments = await EquipmentModel.find({ farmer });

    return res.status(200).json({
      total: equipments.length,
      equipments
    });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}

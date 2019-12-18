import { Request, Response, NextFunction } from "express";
import EquipmentModel from "../../models/Equipment";

// inputs email , password

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    // user must be authenticted as farmer
    const farmer = req["userData"]._id;
    const { name, price, description, location, nStock } = req.body;

    const equipment = new EquipmentModel({
      name,
      price,
      description,
      location,
      nStock,
      farmer
    });

    const equipmentDoc = await equipment.save();

    return res.status(200).json({
      message: "New equipment added",
      farmer,
      equipment: equipmentDoc
    });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}

export async function updateStock(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // user must be authenticted as farmer
    const farmer = req["userData"]._id;
    const equipment = req.params.id;
    const nStock = req.params.nStock;

    const equipmentRecord = await EquipmentModel.findOne({
      _id: equipment,
      farmer
    });

    if (!equipmentRecord)
      return res.status(400).json({
        message:
          "Equipment doesnot exist or user doesnot have access to this item",
        data: {
          farmer,
          equipment
        }
      });

    equipmentRecord.updateStock(nStock);
    await equipmentRecord.save();
    const doc = await EquipmentModel.findOne({ _id: equipmentRecord._id });

    return res.status(200).json({
      message: "equipment stock updated",
      farmer,
      equipment: doc
    });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}

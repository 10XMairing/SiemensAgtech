import { Request, Response, NextFunction } from "express";
import EqRequestModel from "../../models/EquipmentRequest";

// inputs email , password

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    // user must be authenticted as farmer
    const reqFarmer = req["userData"]._id;
    const equipment = req.params.equipment; //eq id

    const { nDays, dateRequired, nQuantity } = req.body;

    const eqRequestRecord = new EqRequestModel({
      reqFarmer,
      nDays,
      dateRequired,
      nQuantity,
      equipment
    });

    const eqRequestDoc = await eqRequestRecord.save();

    return res.status(200).json({
      message: "New equipment request created",
      data: eqRequestDoc
    });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}

// export async function updateStock(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     // user must be authenticted as farmer
//     const farmer = req["userData"]._id;
//     const equipment = req.params.id;
//     const nStock = req.params.nStock;

//     const equipmentRecord = await EqRequestModel.findOne({
//       _id: equipment,
//       farmer
//     });

//     if (!equipmentRecord)
//       return res.status(400).json({
//         message:
//           "Equipment doesnot exist or user doesnot have access to this item",
//         data: {
//           farmer,
//           equipment
//         }
//       });

//     equipmentRecord.updateStock(nStock);
//     await equipmentRecord.save();
//     const doc = await EqRequestModel.findOne({ _id: equipmentRecord._id });

//     return res.status(200).json({
//       message: "equipment stock updated",
//       farmer,
//       equipment: doc
//     });
//   } catch (err) {
//     req["status"] = 400;
//     next(err);
//   }
// }

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EquipmentRequest_1 = require("../../models/EquipmentRequest");
// inputs email , password
async function create(req, res, next) {
    try {
        // user must be authenticted as farmer
        const reqFarmer = req["userData"]._id;
        const equipment = req.params.equipment; //eq id
        const { nDays, dateRequired, nQuantity } = req.body;
        const eqRequestRecord = new EquipmentRequest_1.default({
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
    }
    catch (err) {
        req["status"] = 400;
        next(err);
    }
}
exports.create = create;
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
//# sourceMappingURL=create.js.map
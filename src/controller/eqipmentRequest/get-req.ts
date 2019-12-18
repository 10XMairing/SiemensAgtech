import { Request, Response, NextFunction } from "express";
import EqRequestModel from "../../models/EquipmentRequest";

// inputs email , password

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const requests = await EqRequestModel.find();

    return res.status(200).json({
      total: requests.length,
      requests
    });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const _id = req.params.id;

    const doc = await EqRequestModel.findOne({ _id });

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

export async function getEquipmentsRequestedByFarmer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const reqFarmer = req["userData"]._id;

    const requests = await EqRequestModel.find({ reqFarmer });

    return res.status(200).json({
      message: "All requests made by farmer",
      farmer: reqFarmer,
      total: requests.length,
      requests,
   
    });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}

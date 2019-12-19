import { Request, Response, NextFunction } from "express";
import CropModel from "../../models/Crop";

// inputs email , password

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const crops = await CropModel.find();

    return res.status(200).json({
      total: crops.length,
      crops
    });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const _id = req.params.id;

    const doc = await CropModel.findOne({ _id });

    if (!doc)
      return res.status(400).json({
        message: "Order with given id doesnot exist",
        id: _id
      });

    return res.status(200).json(doc);
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}

export async function getCropsForAuthenticatedFarmer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // farmer auth required
    const farmer = req["userData"]._id;
    const crops = await CropModel.find({ farmer });

    return res.status(200).json({
      message: "All crops for farmer",
      total: crops.length,
      crops,
      farmer
    });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}

export async function getCropsByFarmerid(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // business auth required
    const farmer = req.params.farmer;
    const crops = await CropModel.find({ farmer });

    return res.status(200).json({
      message: "All crops for farmer with given id",
      total: crops.length,
      orders: crops,
      farmer
    });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}

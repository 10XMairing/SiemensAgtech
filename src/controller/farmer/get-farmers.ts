import { Request, Response, NextFunction } from "express";
import FarmerModel from "../../models/Farmer";

// inputs email , password

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const farmers = await FarmerModel.find({}, { password: 0 });

    return res.status(200).json({
      total: farmers.length,
      farmers
    });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const _id = req.params.id;

    const doc = await FarmerModel.findOne({ _id }, { password: 0 });

    if (!doc)
      return res.status(400).json({
        message: "Farmer with given id doesnot exist",
        id: _id
      });

    return res.status(200).json(doc);
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}
export async function getByToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // requires auth as farmer
    const _id = req["userData"]._id;

    const doc = await FarmerModel.findOne({ _id }, { password: 0 });

    if (!doc)
      return res.status(400).json({
        message: "Farmer with given id doesnot exist",
        id: _id
      });

    return res.status(200).json(doc);
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}

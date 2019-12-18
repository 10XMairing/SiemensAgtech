import { Request, Response, NextFunction } from "express";
import BusinessModel from "../../models/Business";

// inputs email , password

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const businesses = await BusinessModel.find({}, { password: 0 });

    return res.status(200).json({
      total: businesses.length,
      businesses
    });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}


export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const _id = req.params.id;

    const businessDoc = await BusinessModel.findOne({_id }, { password: 0 });

    if(!businessDoc)
      return res.status(400).json({
        message : "Business with given id doesnot exist",
        id : _id
      })

    return res.status(200).json(businessDoc);
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}

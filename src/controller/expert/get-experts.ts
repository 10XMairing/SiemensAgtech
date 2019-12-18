import { Request, Response, NextFunction } from "express";
import ExpertModel from "../../models/Expert";

// inputs email , password

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const experts = await ExpertModel.find({}, { password: 0 });

    return res.status(200).json({
      total: experts.length,
      experts
    });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}


export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const _id = req.params.id;

    const expertDoc = await ExpertModel.findOne({_id }, { password: 0 });

    if(!expertDoc)
      return res.status(400).json({
        message : "Expert with given id doesnot exist",
        id : _id
      })

    return res.status(200).json(expertDoc);
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}

import { Request, Response, NextFunction } from "express";
import DistributorModel from "../../models/Distributor";
import { Logger } from "winston";
import { Container } from "typedi";

// inputs email , password

const logger: Logger = Container.get("logger");

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const distributors = await DistributorModel.find({}, { password: 0 });

    return res.status(200).json({
      total: distributors.length,
      distributors
    });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const _id = req.params.id;
    logger.debug("dist id : %o", _id);
    const doc = await DistributorModel.findOne({ _id }, { password: 0 });

    if (!doc)
      return res.status(400).json({
        message: "Distributor with given id doesnot exist",
        id: _id
      });

    return res.status(200).json(doc);
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}

export async function getUserByToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // requires auth
    const _id = req["userData"]._id;
    logger.debug("dist id : %o", _id);
    const doc = await DistributorModel.findOne({ _id }, { password: 0 });

    if (!doc)
      return res.status(400).json({
        message: "Distributor with given id doesnot exist",
        id: _id
      });

    return res.status(200).json(doc);
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}

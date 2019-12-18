import { Request, Response, NextFunction } from "express";
import DistributorModel from "../../models/Distributor";

import { comparePassword, generateToken } from "../../utils";
import { Logger } from "winston";
import { Container } from "typedi";

const logger: Logger = Container.get("logger");

// inputs email , password

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    const distRecord = await DistributorModel.findOne({ email });

    if (!distRecord)
      return res.status(400).json({
        message: `Distributor record does not exist with given email ${email}`,
        data: {
          email,
          id: distRecord._id
        }
      });

    const isMatch = await comparePassword(password, distRecord.password);

    if (!isMatch)
      return res.status(401).json({
        message: `Password do not match`,
        data: {
          email
        }
      });
    else
      return res.status(200).json({
        message: "Authenticated",
        token: generateToken({
          _id: distRecord.id,
          email,
          type: "distributor"
        }),
        data: {
          email
        }
      });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}

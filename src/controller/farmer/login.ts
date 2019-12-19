import { Request, Response, NextFunction } from "express";
import FarmerModel from "../../models/Farmer";

import { comparePassword, generateToken } from "../../utils";
import { Logger } from "winston";
import { Container } from "typedi";

const logger: Logger = Container.get("logger");

// inputs email , password

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    const farmerRecord = await FarmerModel.findOne({ email });

    if (!farmerRecord)
      return res.status(400).json({
        message: `Farmer record does not exist with given email ${email}`,
        data: {
          email,
          id: farmerRecord._id
        }
      });

    // record exists match password
    logger.debug(email);
    logger.debug(password);
    logger.debug(farmerRecord);
    const isMatch = await comparePassword(password, farmerRecord.password);
    logger.debug("password match status : %o", isMatch);
    if (!isMatch)
      return res.status(401).json({
        message: `Password do not match`,
        data: {
          email,
          id: farmerRecord._id
        }
      });
    else
      return res.status(200).json({
        message: "Authenticated",
        token: generateToken({ _id: farmerRecord.id, email, type: "farmer" }),
        data: {
          email,
          id: farmerRecord._id
        }
      });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}

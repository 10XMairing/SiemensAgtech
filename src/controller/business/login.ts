import { Request, Response, NextFunction } from "express";
import BusinessModel from "../../models/Business";

import { comparePassword, generateToken } from "../../utils";

// inputs email , password

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    const businessRecord = await BusinessModel.findOne({ email });

    if (!businessRecord)
      return res.status(400).json({
        message: `Business record does not exist with given email ${email}`,
        data: {
          email
        }
      });

    // record exists match password

    const isMatch = await comparePassword(password, businessRecord.password);

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
        token: generateToken({ _id: businessRecord.id, email, type: "business" }),
        data: {
          email
        }
      });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}

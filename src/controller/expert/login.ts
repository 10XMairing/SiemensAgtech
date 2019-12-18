import { Request, Response, NextFunction } from "express";
import ExpertModel from "../../models/Expert";

import { comparePassword, generateToken } from "../../utils";

// inputs email , password

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    const expertRecord = await ExpertModel.findOne({ email });

    if (!expertRecord)
      return res.status(400).json({
        message: `Expert record does not exist with given email ${email}`,
        data: {
          email,
          id: expertRecord._id
        }
      });

    // record exists match password

    const isMatch = await comparePassword(password, expertRecord.password);

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
        token: generateToken({ _id: expertRecord.id, email, type: "expert" }),
        data: {
          email
        }
      });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}

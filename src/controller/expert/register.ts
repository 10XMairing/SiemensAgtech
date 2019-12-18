import { Request, Response, NextFunction } from "express";
import ExpertModel from "../../models/Expert";
import {generateToken} from "../../utils"
// inputs email , password

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;

    const expert = new ExpertModel({
      email,
      password
    });

    const expertDoc = await expert.save();

    let expertRecord = expertDoc.toObject();
    delete expertRecord.password;

    const token = await generateToken({
      _id: expertDoc._id,
      email: expertDoc.email,
      type: "expert"
    });

    return res.status(200).json({
      message: "Expert registered",
      expert: expertRecord,
      token
    });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}

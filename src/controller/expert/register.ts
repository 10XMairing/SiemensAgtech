import { Request, Response, NextFunction } from "express";
import ExpertModel from "../../models/Expert";
import { generateToken } from "../../utils";
// inputs email , password

import { Container } from "typedi";
import EmailService from "../../services/EmailService";
const emailIns = Container.get(EmailService);

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = req.body;

    const expert = new ExpertModel({
      ...data
    });

    const expertDoc = await expert.save();

    let expertRecord = expertDoc.toObject();
    delete expertRecord.password;

    const token = await generateToken({
      _id: expertDoc._id,
      email: expertDoc.email,
      type: "expert"
    });

    // send email to user
    emailIns.sendMail({
      to: expertDoc.email,
      subject: "Registeted at agtech",
      text: `You just registered at agtech  as a farmer with email ${expertDoc.email}`
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

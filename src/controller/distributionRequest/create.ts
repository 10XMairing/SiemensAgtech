import { Request, Response, NextFunction } from "express";
import DistRequestModel from "../../models/DistributionRequest";
import FarmerModel from "../../models/Farmer";
import * as cron from "node-cron";
import { Logger } from "winston";
import eventDispatcher from "event-dispatch";
import { Container } from "typedi";
// inputs email , password

const logger: Logger = Container.get("logger");

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    // user must be authenticted as farmer
    const reqFarmer = req["userData"]._id;
    const data = req.body;

    const distRequestRecord = new DistRequestModel({
      ...data,
      farmer: reqFarmer
    });

    const distReqDoc = await distRequestRecord.save();
    const farmerDoc = await FarmerModel.findById(reqFarmer);

    cron.schedule(" 20 * * * * *", async () => {
      await DistRequestModel.findByIdAndUpdate(distReqDoc._id, {
        confirmStatus: true
      });
      logger.debug("updated confirmStatus");
      eventDispatcher.dispatch("dist-confirm", {
        to: farmerDoc.email,
        token: farmerDoc.token
      });
    });

    return res.status(200).json({
      message: "New Distribution request created",
      data: distReqDoc
    });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}

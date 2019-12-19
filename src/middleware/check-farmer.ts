import * as jwt from "jsonwebtoken";
import config from "../config";
import FarmerModel from "../models/Farmer";
export function checkFarmer(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decoded = jwt.verify(token, config.JWT_AUTH_FARMER);
    req.userData = decoded;
    const farmerDoc = FarmerModel.findById(decoded._id);
    if (!farmerDoc)
      throw new Error(
        "Farmer with given id has been removed or does not exist"
      );

    next();
  } catch (err) {
    return res.status(401).json({
      message: err.message || "Farmer unauthorized"
    });
  }
}

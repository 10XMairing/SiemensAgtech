import * as jwt from "jsonwebtoken";
import config from "../config";
import ExpertModel from "../models/Expert";
export async function checkExpert(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decoded = jwt.verify(token, config.JWT_AUTH_EXPERT);
    req.userData = decoded;
    const doc = await ExpertModel.findById(decoded._id);
    if (!doc)
      throw new Error(
        "Expert with given id may have been deleted or does not exist"
      );
    next();
  } catch (err) {
    return res.status(401).json({
      message: err.message || "Expert unauthorized"
    });
  }
}

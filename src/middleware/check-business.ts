import * as jwt from "jsonwebtoken";
import config from "../config";

export function checkBusiness(req, res, next) {


  try {
    const token = req.headers.authorization.split(" ")[1];
    let decoded = jwt.verify(token, config.JWT_AUTH_BUSINESS);
    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Business unauthorized"
    });
  }
}

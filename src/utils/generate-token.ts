import * as jwt from "jsonwebtoken";
import config from "../config";

export interface UserTokenData {
  _id: string;
  type: string;
  email: string;
}

export function generateToken(data: UserTokenData) {
  const type = data.type;
  if (
    type == "farmer" ||
    type == "expert" ||
    type == "business" ||
    type == "distributor"
  ) {
    let secret = "";

    if (type == "farmer") secret = config.JWT_AUTH_FARMER;
    else if (type == "expert") secret = config.JWT_AUTH_EXPERT;
    else if (type == "distributor") secret = config.JWT_AUTH_DISTRIBUTOR;
    else secret = config.JWT_AUTH_BUSINESS; //last business

    const token = jwt.sign(data, secret);

    return token;
  } else {
    throw new Error(
      "Type must be 'farmer' , 'expert', 'distributor' or 'business'"
    );
  }
}

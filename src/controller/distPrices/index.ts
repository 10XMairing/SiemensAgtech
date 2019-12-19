import * as fs from "fs";
import * as path from "path";

export function getAllDistPrices(req, res, next) {
  let rawdata = fs.readFileSync(path.join(__dirname, "../../data/prices.json"));
  let prices = JSON.parse(rawdata.toString());
  return res.status(200).json(prices);
}

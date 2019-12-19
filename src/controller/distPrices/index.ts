import * as fs from "fs";
import * as path from "path";

export function getAllDistPrices(req, res, next) {
  let rawdata = fs.readFileSync(path.join(__dirname, "../../data/prices.json"));
  let prices = JSON.parse(rawdata.toString());
  return res.status(200).json(prices);
}

export function calculateDistCost(req, res, next) {
  const { name, quantity } = req.body;
  let rawdata = fs.readFileSync(path.join(__dirname, "../../data/prices.json"));
  let prices: Object = JSON.parse(rawdata.toString());
  if (!prices.hasOwnProperty(name.toLowerCase()))
    return res.status(400).json({
      message: "Distribution servuce does not currently accept this crop type",
      name,
      acceptedKeys: Object.keys(prices)
    });
  const rate = prices[name];
  const total = quantity * rate;
  const distCost = total * 0.2;
  const farmerRevenue = total - distCost;

  return res.status(200).json({
    message: "Predicted average distribution cost",
    data: { rate, total, distCost, farmerRevenue }
  });
}

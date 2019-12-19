import * as fs from "fs";
import * as path from "path";

import prices from "../../data/prices";

export function getAllDistPrices(req, res, next) {
  return res.status(200).json(prices);
}

export function calculateDistCost(req, res, next) {
  const { name, quantity } = req.body;

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

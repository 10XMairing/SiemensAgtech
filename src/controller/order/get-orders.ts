import { Request, Response, NextFunction } from "express";
import OrderModel from "../../models/Order";

// inputs email , password

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const orders = await OrderModel.find();

    return res.status(200).json({
      total: orders.length,
      orders
    });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const _id = req.params.id;

    const doc = await OrderModel.findOne({ _id });

    if (!doc)
      return res.status(400).json({
        message: "Order with given id doesnot exist",
        id: _id
      });

    return res.status(200).json(doc);
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}

export async function getOrdersForFarmer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // farmer auth required
    const farmer = req["userData"]._id;
    const orders = await OrderModel.find({ farmer });

    return res.status(200).json({
      message: "All orders for farmer",
      total: orders.length,
      orders,
      farmer
    });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}

export async function getOrdersForBusiness(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // business auth required
    const business = req["userData"]._id;
    const orders = await OrderModel.find();

    return res.status(200).json({
      message: "All orders for business - This route is not accurate!",
      total: orders.length,
      orders,
      business
    });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}

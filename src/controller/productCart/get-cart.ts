import { Request, Response, NextFunction } from "express";
import ProductCartModel from "../../models/ProductCart";

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const carts = await ProductCartModel.find();

    return res.status(200).json({
      message: "required for test only",
      total: carts.length,
      carts
    });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const _id = req.params.id;

    const doc = await ProductCartModel.findOne({ _id });

    if (!doc)
      return res.status(400).json({
        message: "Cart with given id doesnot exist",
        id: _id
      });

    return res.status(200).json(doc);
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}

export async function getProductCartByFarmerToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    //   must have business auth
    const farmer = req["userData"]._id;

    const cart = await ProductCartModel.findById(farmer);

    return res.status(200).json({
      farmer,
      cart
    });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}

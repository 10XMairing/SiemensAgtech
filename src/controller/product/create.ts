import { Request, Response, NextFunction } from "express";
import ProductModel from "../../models/Product";

// inputs email , password

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    // user must be authenticted as business
    const business = req["userData"]._id;
    const { name, price, description, discount } = req.body;

    const product = new ProductModel({
      name,
      price,
      description,
      discount,
      business
    });

    const productRecord = await product.save();

    return res.status(200).json({
      message: "New Product added",
      business,
      product: productRecord
    });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}

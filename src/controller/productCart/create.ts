import { Request, Response, NextFunction } from "express";
import ProductCartModel from "../../models/ProductCart";

// inputs email , password

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    // user must be authenticted as farmer
    const farmer = req["userData"]._id;
    const { products, deliveryAddress , paymentAddress } = req.body; // products should be {id , quantity}[]

    const cart =  await ProductCartModel.findOne({farmer});

    
    cart.create(products, deliveryAddress , paymentAddress);
    
    const cartRecord = await cart.save();

    return res.status(200).json({
      message: "Cart refreshed",
      farmer,
      cart : cartRecord
    });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}

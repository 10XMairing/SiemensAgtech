import { Request, Response, NextFunction } from "express";
import OrderModel from "../../models/Order";
import ProductModel from "../../models/Product";
import { Logger } from "winston";
import { Container } from "typedi";
const logger: Logger = Container.get("logger");
// inputs email , password

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    // user must be authenticted as farmer
    const farmer = req["userData"]._id;
    const { products } = req.body; //this will be a list of product ids

    

    if(products.length == 0)
        return res.status(400).json({
            message : "Products cannot be null",
            error : {
                message  : "missing key 'products'",
                description : "array of product ids"
            }
        })

    const productDocs = await ProductModel.find({ _id: { $in: products } });
 
    const orderRecord = new OrderModel({
      products: productDocs,
      farmer
    });

    const order = await orderRecord.save();

    return res.status(200).json({
      message: "New Order created",
      farmer,
      order
    });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}

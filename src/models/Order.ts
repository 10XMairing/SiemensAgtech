import * as mongoose from "mongoose";
import { Logger } from "winston";
import { Container } from "typedi";
import ProductModel from "./Product";

const logger: Logger = Container.get("logger");

export interface IOrderModel {
  products: { completed: boolean; business: string; stamp: JSON }[];
  total: number;
  discountTotal: number;
  orderTotal: number;
  deliveryAddress: string;
  paymentAddress: string;
  farmer: string;
}

export interface IOrderDoc extends mongoose.Document, IOrderModel {}

// product -- > {name,price,description,discount}

const OrderSchema = new mongoose.Schema(
  {
    total: { type: Number },
    deliveryAddress: { type: String },
    paymentAddress: { type: String },
    completed: { type: Boolean, default: false },
    discountTotal: { type: Number },
    orderTotal: { type: Number },
    products: [
      {
        completed: { type: Boolean, default: false },
        quantity: { type: Number, default: 1 },

        business: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Business",
          required: true
        },
        stamp: { type: Object }
      }
    ],

    farmer: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer" }
  },
  {
    timestamps: true
  }
);

//orderTotal & discount total will be calculated automatically
OrderSchema.pre("save", async function(next) {
  var Order = this;

  let total = 0.0;
  let discountTotal = 0.0;
  let orderTotal = 0.0;

  const products: string[] = Order["products"]; //list of product ids
  const productDocs = await ProductModel.find({ _id: { $in: products } });

  let modifiedProducts = [];

  logger.debug("docs : %o", productDocs);
  productDocs.forEach(data => {
    const price = data.price * 1.0; //number
    const discount = data.discount * 1.0; //number%

    modifiedProducts.push({
      business: data.business,
      stamp: data
    });

    total += price;
    const prodDiscount = (discount * price) / 100;
    discountTotal += prodDiscount;
  });

  orderTotal = total - discountTotal;

  Order["total"] = total;
  Order["discountTotal"] = discountTotal;
  Order["orderTotal"] = orderTotal;
  Order["products"] = modifiedProducts;
  next();
});

OrderSchema.post("updateOne", function(doc, next) {
  // after every update check complete status of each product
  // if all product status is "true" , set the order complete status to true
  const products = doc["products"];

  products.array.forEach(item => {
    if (!item.completed) {
      next();
    }
  });

  // all completed
  doc["completed"] = true;
  next();
});

export default mongoose.model<IOrderDoc>("Order", OrderSchema);

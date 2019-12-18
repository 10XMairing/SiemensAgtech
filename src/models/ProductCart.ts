import * as mongoose from "mongoose";
import { Logger } from "winston";
import { Container } from "typedi";
import ProductModel from "./Product";

const logger: Logger = Container.get("logger");

export interface IProductCartModel {
  products: {
    quantity: number;
    id: any;
  }[]; //array of product ids and quantity
  total: number;
  discountTotal: number;
  cartTotal: number;
  deliveryAddress: string;
  paymentAddress: string;
  farmer: string;
}

export interface IProductCartDoc extends mongoose.Document, IProductCartModel {
  create: (
    prods: { id: string; quantity: number },
    deliveryAddress: string,
    paymentAddress: string
  ) => this;
}

const IProductCartSchema = new mongoose.Schema(
  {
    total: { type: Number },
    deliveryAddress: { type: String },
    paymentAddress: { type: String },
    completed: { type: Boolean, default: false },
    discountTotal: { type: Number },
    cartTotal: { type: Number },
    products: [
      {
        quantity: { type: Number, default: 1 },
        id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }
      }
    ],

    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farmer",
      unique: true,
      required: true
    }
  },
  {
    timestamps: true
  }
);

IProductCartSchema.pre("save", async function(done) {
  const products = this["products"];
  let total = 0.0;
  let discountTotal = 0.0;
  let cartTotal = 0.0;

  for(var i=0; i<products.length; i++){
    const item = products[i];
    const prodRecord = await ProductModel.findById(item.id);
    total += prodRecord.price * item.quantity;
    discountTotal +=
      (prodRecord.discount * prodRecord.price * item.quantity) / 100;

  }
  
  cartTotal = total - discountTotal;

  console.log(cartTotal)

  this["total"] = total;
  this["discountTotal"] = discountTotal;
  this["cartTotal"] = cartTotal;
  done();
});

// IProductCartSchema.methods.addProduct = function(prods: {
//   quantity: number;
//   id: string;
// }) {
//   this["products"].push(prods);
// };

IProductCartSchema.methods.create = function(
  prods: {
    quantity: number;
    id: string;
  },
  deliveryAddress: string,
  paymentAddress: string
) {
  this["products"] = prods;
  this["deliveryAddress"] = deliveryAddress;
  this["paymentAddress"] = paymentAddress;
  return this;
};

export default mongoose.model<IProductCartDoc>(
  "ProductCart",
  IProductCartSchema
);

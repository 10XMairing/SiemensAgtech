import * as mongoose from "mongoose";
import { Logger } from "winston";
import { Container } from "typedi";
import ProductModel from "./Product";

const logger: Logger = Container.get("logger");

export interface IDistributionModel {
    cropName : string, //potato tomato aalu paalu
    description : string,
    expectedPriceTotal : number, //price of total expected produce
    expectedProduce : number //in kgs
    location : string,
    rate : number //expPrice/expProduc   rs/kg
    farmer : any //farmer ref
    paymentStatus : boolean,
    confirmStatus : boolean,
    price: number //cost for storage and transport




}

export interface IDistDoc extends mongoose.Document, IDistributionModel {

}

const DistSchema = new mongoose.Schema(
  {
    cropName : {type : String , required : true},
    description : {type : String , required : true},
    location : {type : String , required : true},
    expectedPriceTotal : {type : Number , required : true},
    expectedProduce : {type : Number , required : true},
    rate : {type : Number },
    paymentStatus : {type : Boolean , default : false },
    confirmStatus : {type : Boolean , default : false },
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer" }
  },
  {
    timestamps: true
  }
);

//orderTotal & discount total will be calculated automatically
DistSchema.pre("save", async function(next) {
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

DistSchema.post("updateOne", function(doc, next) {
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

export default mongoose.model<IDistDoc>("Order", DistSchema);

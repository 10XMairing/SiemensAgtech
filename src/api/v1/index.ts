import { Express } from "express";
import farmerRouter from "./farmer";
import expertRouter from "./expert";
import businessRouter from "./business";
import appointmentRouter from "./appointment";
import productRouter from "./product";
import orderRouter from "./order";
import equipmentRouter from "./equipment";
import eqRequestRouter from "./eqRequest";
import prodCartRouter from "./productCart";
import distRouter from "./distributor";
import distReqRouter from "./distRequest";

export default function(app: Express) {
  app.use("/api/farmer", farmerRouter);
  app.use("/api/expert", expertRouter);
  app.use("/api/business", businessRouter);
  app.use("/api/distributor", distRouter);
  app.use("/api/appointment", appointmentRouter);
  app.use("/api/product", productRouter);
  app.use("/api/order", orderRouter);
  app.use("/api/equipment", equipmentRouter);
  app.use("/api/request", eqRequestRouter);
  app.use("/api/product-cart", prodCartRouter);
  app.use("/api/dist-request", distReqRouter);
}

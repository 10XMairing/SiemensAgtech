import { Router } from "express";

import { celebrate, Joi } from "celebrate";

import * as Controller from "../../../controller/productCart";
import { checkFarmer, checkExpert, checkBusiness } from "../../../middleware";
const router = Router();

router.post(
  "/create",
  checkFarmer,
  celebrate({
    body: Joi.object().keys({
      products: Joi.array().items(
        Joi.object().keys({
          id: Joi.string(),
          quantity: Joi.number()
        })
      ),
      deliveryAddress: Joi.string().required(),
      paymentAddress: Joi.string().required()
    })
  }),
  (req, res, next) => {
    Controller.create(req, res, next);
  }
);

router.get("/farmer/me", checkFarmer, (req, res, next) => {
  Controller.getProductCartByFarmerToken(req, res, next);
});
router.get("/", (req, res, next) => {
  Controller.getAll(req, res, next);
});

export default router;

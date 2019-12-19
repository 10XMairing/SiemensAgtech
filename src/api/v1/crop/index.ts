import { Router } from "express";

import { celebrate, Joi } from "celebrate";

import * as Controller from "../../../controller/crop";
import {
  getAllDistPrices,
  calculateDistCost
} from "../../../controller/distPrices";
import { checkFarmer, checkExpert, checkBusiness } from "../../../middleware";
const router = Router();

router.post(
  "/create",
  checkFarmer,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string().required(),
      expPrice: Joi.number().required()
    })
  }),
  (req, res, next) => {
    Controller.create(req, res, next);
  }
);

router.get("/", (req, res, next) => {
  Controller.getAll(req, res, next);
});
router.get("/prices", (req, res, next) => {
  getAllDistPrices(req, res, next);
});
router.post(
  "/price/predict",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      quantity: Joi.number().required()
    })
  }),
  (req, res, next) => {
    calculateDistCost(req, res, next);
  }
);

router.get("/farmer/me", checkFarmer, (req, res, next) => {
  Controller.getCropsForAuthenticatedFarmer(req, res, next);
});
router.get("/farmer=:farmer", checkFarmer, (req, res, next) => {
  Controller.getCropsByFarmerid(req, res, next);
});

router.get("/:id", (req, res, next) => {
  Controller.getById(req, res, next);
});

export default router;

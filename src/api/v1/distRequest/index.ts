import { Router } from "express";

import { celebrate, Joi } from "celebrate";

import * as Controller from "../../../controller/distributionRequest";
import { checkFarmer, checkExpert, checkBusiness } from "../../../middleware";
const router = Router();

router.post(
  "/agent=:distributor",
  checkFarmer,
  celebrate({
    body: Joi.object().keys({
      cropName: Joi.string().required(),
      description: Joi.string().required(),
      location: Joi.string().required(),
      expectedPriceTotal: Joi.number().required(),
      expectedProduce: Joi.number().required()
    })
  }),
  (req, res, next) => {
    Controller.create(req, res, next);
  }
);

router.get("/", (req, res, next) => {
  Controller.getAll(req, res, next);
});

router.get("/farmer/me", checkFarmer, (req, res, next) => {
  Controller.getDistRequestByFarmer(req, res, next);
});

router.get("/:id", (req, res, next) => {
  Controller.getById(req, res, next);
});

export default router;

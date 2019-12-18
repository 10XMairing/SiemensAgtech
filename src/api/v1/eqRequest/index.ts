import { Router } from "express";

import { celebrate, Joi } from "celebrate";

import * as Controller from "../../../controller/eqipmentRequest";
import { checkFarmer, checkExpert, checkBusiness } from "../../../middleware";
const router = Router();

router.post(
  "/:equipment",
  checkFarmer,
  celebrate({
    body: Joi.object().keys({
      nDays: Joi.number(),
      nQuantity: Joi.number(),
      dateRequired: Joi.string().required()
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
  Controller.getEquipmentsRequestedByFarmer(req, res, next);
});

router.get("/:id", (req, res, next) => {
  Controller.getById(req, res, next);
});

export default router;

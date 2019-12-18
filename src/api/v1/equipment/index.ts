import { Router } from "express";

import { celebrate, Joi } from "celebrate";

import * as Controller from "../../../controller/equipment";
import { checkFarmer, checkExpert, checkBusiness } from "../../../middleware";
const router = Router();

router.post(
  "/create",
  checkFarmer,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string().required(),
      location: Joi.string().required(),
      price: Joi.number().required(),
      nStock: Joi.number()
    })
  }),
  (req, res, next) => {
    Controller.create(req, res, next);
  }
);
router.patch(
  "/:id/stock=:nStock",
  checkFarmer,
  (req, res, next) => {
    Controller.updateStock(req, res, next);
  }
);

router.get("/", (req, res, next) => {
  Controller.getAll(req, res, next);
});

router.get("/farmer/me", checkFarmer, (req, res, next) => {
  Controller.getEquipmentsByFarmer(req, res, next);
});

router.get("/:id", (req, res, next) => {
  Controller.getById(req, res, next);
});

export default router;

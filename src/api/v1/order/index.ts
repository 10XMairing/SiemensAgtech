import { Router } from "express";

import { celebrate, Joi } from "celebrate";
import * as Controller from "../../../controller/order";
import { checkFarmer, checkExpert, checkBusiness } from "../../../middleware";
const router = Router();

router.post(
  "/create",
  checkFarmer,
  celebrate({
    body: Joi.object().keys({
        products : Joi.array().items(Joi.string())
    })
  }),
  (req, res, next) => {
    Controller.create(req, res, next);
  }
);

router.get("/", (req, res, next) => {
  Controller.getAll(req, res, next);
});

router.get("/:id", (req, res, next) => {
  Controller.getById(req, res, next);
});

router.get("/farmer/me", checkFarmer, (req, res, next) => {
  Controller.getOrdersForFarmer(req, res, next);
});
router.get("/business/me", checkBusiness, (req, res, next) => {
  Controller.getOrdersForBusiness(req, res, next);
});



export default router;

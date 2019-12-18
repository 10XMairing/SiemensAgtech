import { Router } from "express";

import { celebrate, Joi } from "celebrate";

import * as Controller from "../../../controller/appointment";
import {checkFarmer , checkExpert} from "../../../middleware" 
const router = Router();

router.post(
  "/create&expert=:expert",
  checkFarmer,
  celebrate({
    body: Joi.object().keys({
      price: Joi.number().required(),
      location: Joi.string().required(),
      date: Joi.string().required()
    })
  }),
  (req, res, next) => {
    Controller.create(req, res, next);
  }
);

router.post("/:id/confirm=:confirm" , checkExpert, (req, res, next) => {
    Controller.updateStatus(req, res, next);
  });


router.get("/", (req, res, next) => {
  Controller.getAll(req, res, next);
});
router.get("/:id", (req, res, next) => {
    Controller.getById(req, res, next);
  });

router.get("/farmer/me",checkFarmer, (req, res, next) => {
    Controller.getAppointmentForFarmer(req, res, next);
  });
router.get("/expert/me" , checkExpert, (req, res, next) => {
    Controller.getAppointmentForExpert(req, res, next);
  });


 


export default router;

import { Router } from "express";

import { celebrate, Joi } from "celebrate";

import * as Controller from "../../../controller/product";
import {checkFarmer , checkExpert , checkBusiness} from "../../../middleware" 
const router = Router();

router.post(
  "/create",
  checkBusiness,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
      discount: Joi.number(),
   
    })
  }),
  (req, res, next) => {
    Controller.create(req,res,next)
  }
);



router.get("/", (req, res, next) => {
  Controller.getAll(req, res, next);
});

router.get("/business/me",checkBusiness, (req, res, next) => {
  Controller.getProductsForBusiness(req, res, next);
});


router.get("/:id", (req, res, next) => {
    Controller.getById(req, res, next);
  });



 


export default router;

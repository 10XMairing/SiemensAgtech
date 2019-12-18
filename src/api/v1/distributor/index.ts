import { Router } from "express";

import { celebrate, Joi } from "celebrate";

import * as Controller from "../../../controller/distributor";
import { checkDistributor } from "../../../middleware";

const router = Router();

router.post(
  "/register",
  celebrate({
    body: Joi.object().keys({
      password: Joi.string().required(),
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required()
    })
  }),
  (req, res, next) => {
    Controller.register(req, res, next);
  }
);

router.post(
  "/login",
  celebrate({
    body: Joi.object().keys({
      password: Joi.string().required(),
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required()
    })
  }),
  (req, res, next) => {
    Controller.login(req, res, next);
  }
);

router.get("/", (req, res, next) => {
  Controller.getAll(req, res, next);
});

router.get("/profile/me", checkDistributor, (req, res, next) => {
  Controller.getUserByToken(req, res, next);
});
router.patch(
  "/profile/me",
  checkDistributor,
  celebrate({
    body: Joi.object().keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      businessName: Joi.string(),
      isAvailable: Joi.boolean(),
      acceptedCrops: Joi.array().items(
        Joi.object().keys({
          name: Joi.string().required(),
          rate: Joi.number().required()
        })
      )
    })
  }),
  (req, res, next) => {
    Controller.updateProfile(req, res, next);
  }
);

router.get("/:id", (req, res, next) => {
  Controller.getById(req, res, next);
});
export default router;

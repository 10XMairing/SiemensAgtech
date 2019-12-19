import { Router } from "express";

import { celebrate, Joi } from "celebrate";

import * as Controller from "../../../controller/expert";
import { checkExpert } from "../../../middleware";
const router = Router();

router.post(
  "/register",
  celebrate({
    body: Joi.object().keys({
      password: Joi.string().required(),
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      location: Joi.string(),
      bio: Joi.string(),
      profileImage: Joi.string()
    })
  }),
  (req, res, next) => {
    Controller.register(req, res, next);
  }
);

router.patch(
  "/update/me",
  checkExpert,
  celebrate({
    body: Joi.object().keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      location: Joi.string(),
      profileImage: Joi.string(),
      bio: Joi.string()
    })
  }),
  (req, res, next) => {
    Controller.updateExpertProfile(req, res, next);
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
router.get("/profile/me", checkExpert, (req, res, next) => {
  Controller.getExpertByToken(req, res, next);
});

router.get("/:id", (req, res, next) => {
  Controller.getById(req, res, next);
});

export default router;

import { Router } from "express";

import { celebrate, Joi } from "celebrate";

import * as Controller from "../../../controller/expert";

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

router.get("/:id", (req, res, next) => {
    Controller.getById(req, res, next);
  });

export default router;

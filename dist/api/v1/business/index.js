"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const Controller = require("../../../controller/business");
const router = express_1.Router();
router.post("/register", celebrate_1.celebrate({
    body: celebrate_1.Joi.object().keys({
        password: celebrate_1.Joi.string().required(),
        email: celebrate_1.Joi.string()
            .email({ minDomainSegments: 2 })
            .required()
    })
}), (req, res, next) => {
    Controller.register(req, res, next);
});
router.post("/login", celebrate_1.celebrate({
    body: celebrate_1.Joi.object().keys({
        password: celebrate_1.Joi.string().required(),
        email: celebrate_1.Joi.string()
            .email({ minDomainSegments: 2 })
            .required()
    })
}), (req, res, next) => {
    Controller.login(req, res, next);
});
router.get("/", (req, res, next) => {
    Controller.getAll(req, res, next);
});
router.get("/:id", (req, res, next) => {
    Controller.getById(req, res, next);
});
exports.default = router;
//# sourceMappingURL=index.js.map
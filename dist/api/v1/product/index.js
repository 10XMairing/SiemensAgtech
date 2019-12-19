"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const Controller = require("../../../controller/product");
const middleware_1 = require("../../../middleware");
const router = express_1.Router();
router.post("/create", middleware_1.checkBusiness, celebrate_1.celebrate({
    body: celebrate_1.Joi.object().keys({
        name: celebrate_1.Joi.string().required(),
        description: celebrate_1.Joi.string().required(),
        price: celebrate_1.Joi.number().required(),
        discount: celebrate_1.Joi.number(),
    })
}), (req, res, next) => {
    Controller.create(req, res, next);
});
router.get("/", (req, res, next) => {
    Controller.getAll(req, res, next);
});
router.get("/business/me", middleware_1.checkBusiness, (req, res, next) => {
    Controller.getProductsForBusiness(req, res, next);
});
router.get("/:id", (req, res, next) => {
    Controller.getById(req, res, next);
});
exports.default = router;
//# sourceMappingURL=index.js.map
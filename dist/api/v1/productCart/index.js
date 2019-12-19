"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const Controller = require("../../../controller/productCart");
const middleware_1 = require("../../../middleware");
const router = express_1.Router();
router.post("/create", middleware_1.checkFarmer, celebrate_1.celebrate({
    body: celebrate_1.Joi.object().keys({
        products: celebrate_1.Joi.array().items(celebrate_1.Joi.object().keys({
            id: celebrate_1.Joi.string(),
            quantity: celebrate_1.Joi.number()
        })),
        deliveryAddress: celebrate_1.Joi.string().required(),
        paymentAddress: celebrate_1.Joi.string().required()
    })
}), (req, res, next) => {
    Controller.create(req, res, next);
});
router.get("/farmer/me", middleware_1.checkFarmer, (req, res, next) => {
    Controller.getProductCartByFarmerToken(req, res, next);
});
router.get("/", (req, res, next) => {
    Controller.getAll(req, res, next);
});
exports.default = router;
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const Controller = require("../../../controller/order");
const middleware_1 = require("../../../middleware");
const router = express_1.Router();
router.post("/create", middleware_1.checkFarmer, celebrate_1.celebrate({
    body: celebrate_1.Joi.object().keys({
        products: celebrate_1.Joi.array().items(celebrate_1.Joi.string())
    })
}), (req, res, next) => {
    Controller.create(req, res, next);
});
router.get("/", (req, res, next) => {
    Controller.getAll(req, res, next);
});
router.get("/:id", (req, res, next) => {
    Controller.getById(req, res, next);
});
router.get("/farmer/me", middleware_1.checkFarmer, (req, res, next) => {
    Controller.getOrdersForFarmer(req, res, next);
});
router.get("/business/me", middleware_1.checkBusiness, (req, res, next) => {
    Controller.getOrdersForBusiness(req, res, next);
});
exports.default = router;
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const Controller = require("../../../controller/distributionRequest");
const middleware_1 = require("../../../middleware");
const router = express_1.Router();
router.post("/agent=:distributor", middleware_1.checkFarmer, celebrate_1.celebrate({
    body: celebrate_1.Joi.object().keys({
        cropName: celebrate_1.Joi.string().required(),
        description: celebrate_1.Joi.string().required(),
        location: celebrate_1.Joi.string().required(),
        expectedPriceTotal: celebrate_1.Joi.number().required(),
        expectedProduce: celebrate_1.Joi.number().required()
    })
}), (req, res, next) => {
    Controller.create(req, res, next);
});
router.get("/", (req, res, next) => {
    Controller.getAll(req, res, next);
});
router.get("/farmer/me", middleware_1.checkFarmer, (req, res, next) => {
    Controller.getDistRequestByFarmer(req, res, next);
});
router.get("/:id", (req, res, next) => {
    Controller.getById(req, res, next);
});
exports.default = router;
//# sourceMappingURL=index.js.map
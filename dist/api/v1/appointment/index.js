"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const Controller = require("../../../controller/appointment");
const middleware_1 = require("../../../middleware");
const router = express_1.Router();
router.post("/create&expert=:expert", middleware_1.checkFarmer, celebrate_1.celebrate({
    body: celebrate_1.Joi.object().keys({
        price: celebrate_1.Joi.number().required(),
        location: celebrate_1.Joi.string().required(),
        date: celebrate_1.Joi.string().required()
    })
}), (req, res, next) => {
    Controller.create(req, res, next);
});
router.post("/:id/confirm=:confirm", middleware_1.checkExpert, (req, res, next) => {
    Controller.updateStatus(req, res, next);
});
router.get("/", (req, res, next) => {
    Controller.getAll(req, res, next);
});
router.get("/:id", (req, res, next) => {
    Controller.getById(req, res, next);
});
router.get("/farmer/me", middleware_1.checkFarmer, (req, res, next) => {
    Controller.getAppointmentForFarmer(req, res, next);
});
router.get("/expert/me", middleware_1.checkExpert, (req, res, next) => {
    Controller.getAppointmentForExpert(req, res, next);
});
exports.default = router;
//# sourceMappingURL=index.js.map
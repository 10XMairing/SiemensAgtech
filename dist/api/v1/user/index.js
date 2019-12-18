"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const user_1 = require("../../../controller/user");
const typedi_1 = require("typedi");
const router = express_1.Router();
const UserController = typedi_1.Container.get(user_1.default);
router.get("/", (req, res, next) => {
    UserController.getUsers(req, res, next);
});
router.post("/", celebrate_1.celebrate({
    body: celebrate_1.Joi.object().keys({
        username: celebrate_1.Joi.string().required(),
        password: celebrate_1.Joi.string().required(),
        email: celebrate_1.Joi.string()
            .email({ minDomainSegments: 2 })
            .required()
    })
}), (req, res, next) => {
    UserController.registerUser(req, res, next);
});
exports.default = router;
//# sourceMappingURL=index.js.map
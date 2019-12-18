"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const UserService_1 = require("../services/UserService");
let UserController = class UserController {
    async getUsers(req, res, next) {
        try {
            const users = await this.UserServiceIns.getAllUsers();
            return res.status(200).json({
                message: "All users fetched from db",
                total: users.length,
                users
            });
        }
        catch (err) {
            err["status"] = 400;
            next(err);
        }
    }
    async registerUser(req, res, next) {
        try {
            const { username, email, password } = req.body;
            const user = await this.UserServiceIns.saveUser({
                username,
                email,
                password
            });
            return res.status(200).json({
                message: "User registered successfully",
                user
            });
        }
        catch (err) {
            err["status"] = 400;
            next(err);
        }
    }
};
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", UserService_1.default)
], UserController.prototype, "UserServiceIns", void 0);
UserController = __decorate([
    typedi_1.Service()
], UserController);
exports.default = UserController;
//# sourceMappingURL=user.js.map
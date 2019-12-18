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
const User_1 = require("../models/User");
let default_1 = class default_1 {
    async getAllUsers() {
        try {
            const users = User_1.default.find({}, { password: 0 });
            return users;
        }
        catch (err) {
            this.logger.error(err);
            throw new Error("Error fetching user data");
        }
    }
    async saveUser(user) {
        try {
            const newUser = new User_1.default(Object.assign({}, user));
            const out = await newUser.save();
            const temp = Object.assign({}, out.toObject());
            // delete password field
            delete temp.password;
            return temp;
        }
        catch (err) {
            this.logger.error(JSON.stringify(err));
            if (err.code == "11000") {
                throw new Error("Email already exists in database");
            }
            throw new Error("Error saving new user");
        }
    }
};
__decorate([
    typedi_1.Inject("logger"),
    __metadata("design:type", Object)
], default_1.prototype, "logger", void 0);
default_1 = __decorate([
    typedi_1.Service()
], default_1);
exports.default = default_1;
//# sourceMappingURL=UserService.js.map
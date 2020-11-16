"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var userModel_1 = __importDefault(require("../models/userModel"));
var espModel_1 = __importDefault(require("../models/espModel"));
var UserService = /** @class */ (function () {
    function UserService() {
    }
    Object.defineProperty(UserService, "Instance", {
        get: function () {
            if (!UserService.instance) {
                UserService.instance = new UserService();
            }
            return UserService.instance;
        },
        enumerable: false,
        configurable: true
    });
    UserService.prototype.create = function (user) {
        return new userModel_1.default(user).save();
    };
    UserService.prototype.login = function (email) {
        return userModel_1.default.findOne({ email: email }).populate({
            path: 'devices',
            populate: { path: 'lastMeasure' },
            schema: espModel_1.default,
        });
    };
    UserService.prototype.addEspToUser = function (uid, idESP) {
        return userModel_1.default.findByIdAndUpdate(uid, { $addToSet: { devices: idESP } }, { new: true }).populate({
            path: 'devices',
            populate: { path: 'lastMeasure' },
            schema: espModel_1.default,
        });
    };
    return UserService;
}());
exports.default = UserService;

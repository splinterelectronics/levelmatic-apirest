"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var userModel_1 = __importDefault(require("../models/userModel"));
var levelmaticModel_1 = __importDefault(require("../models/levelmaticModel"));
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
    UserService.prototype.getByEmail = function (email) {
        return userModel_1.default.findOne({ email: email }).populate({
            path: 'devices',
            populate: { path: 'devicesESP', populate: { path: 'lastMeasure' } },
            schema: levelmaticModel_1.default,
        });
    };
    UserService.prototype.getById = function (id) {
        return userModel_1.default.findById(id);
    };
    UserService.prototype.addLevelmaticToUser = function (uid, idLevelmatic) {
        return userModel_1.default.findByIdAndUpdate(uid, { $addToSet: { devices: idLevelmatic } }, { new: true, runValidators: true }).populate({
            path: 'devices',
            populate: { path: 'devicesESP', populate: { path: 'lastMeasure' } },
            schema: levelmaticModel_1.default,
        });
    };
    UserService.prototype.getEsps = function (uid) {
        return userModel_1.default.findById(uid).populate({
            path: 'devices',
            populate: { path: 'devicesESP', populate: { path: 'lastMeasure' } },
            schema: levelmaticModel_1.default,
        });
    };
    UserService.prototype.update = function (uid, toUpdate) {
        return userModel_1.default.findByIdAndUpdate(uid, toUpdate, {
            new: true,
            runValidators: true,
        });
    };
    return UserService;
}());
exports.default = UserService;

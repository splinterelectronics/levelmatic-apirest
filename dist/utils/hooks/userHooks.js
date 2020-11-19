"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegisterPreHandler = exports.userAddDevicePreHandler = void 0;
var espController_1 = __importDefault(require("../../controllers/espController"));
var userController_1 = __importDefault(require("../../controllers/userController"));
var espController = espController_1.default.Instance;
var userController = userController_1.default.Instance;
exports.userAddDevicePreHandler = espController.exist;
exports.userRegisterPreHandler = userController.exist;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegisterPreHandler = exports.userAddDeviceByIdPreHandler = exports.userAddDevicePreHandler = void 0;
var levelmaticController_1 = __importDefault(require("../../controllers/levelmaticController"));
var userController_1 = __importDefault(require("../../controllers/userController"));
var userController = userController_1.default.Instance;
var levelmaticController = levelmaticController_1.default.Instance;
exports.userAddDevicePreHandler = levelmaticController.existByCred;
exports.userAddDeviceByIdPreHandler = levelmaticController.existById;
exports.userRegisterPreHandler = userController.exist;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var espController_1 = __importDefault(require("../../controllers/espController"));
var espController = espController_1.default.Instance;
var userAddDevicePreHandler = espController.exist;
exports.default = userAddDevicePreHandler;

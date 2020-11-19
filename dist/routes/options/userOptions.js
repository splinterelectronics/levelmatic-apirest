"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userGetDevicesOpts = exports.userAddDeviceOpts = exports.userLoginOpts = exports.userRegisterOpts = void 0;
var userHooks_1 = __importDefault(require("../../utils/hooks/userHooks"));
var userOptionsSchema_1 = require("../../utils/schemas/userOptionsSchema");
exports.userRegisterOpts = {
    schema: {
        body: userOptionsSchema_1.userRegisterBodySchema,
        response: userOptionsSchema_1.userRegisterResponseSchema,
    },
};
exports.userLoginOpts = {
    schema: {
        body: userOptionsSchema_1.userLoginBodySchema,
        response: userOptionsSchema_1.userLoginResponseSchema,
    },
};
exports.userAddDeviceOpts = {
    schema: {
        body: userOptionsSchema_1.userAddDeviceBodySchema,
        response: userOptionsSchema_1.userAddDeviceResponseSchema,
    },
    preHandler: userHooks_1.default,
};
exports.userGetDevicesOpts = {
    schema: {
        response: userOptionsSchema_1.userAddDeviceResponseSchema,
    },
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdateOpts = exports.userGetDevicesOpts = exports.userAddDeviceByIdOpts = exports.userAddDeviceOpts = exports.userLoginOpts = exports.userRegisterOpts = void 0;
var userHooks_1 = require("../../utils/hooks/userHooks");
var userOptionsSchema_1 = require("../../utils/schemas/userOptionsSchema");
exports.userRegisterOpts = {
    schema: {
        body: userOptionsSchema_1.userRegisterBodySchema,
        response: userOptionsSchema_1.userLoginResponseSchema,
    },
    preHandler: userHooks_1.userRegisterPreHandler,
};
exports.userLoginOpts = {
    schema: {
        body: userOptionsSchema_1.userLoginBodySchema,
    },
};
exports.userAddDeviceOpts = {
    schema: {
        body: userOptionsSchema_1.userAddDeviceBodySchema,
        response: userOptionsSchema_1.userAddDeviceResponseSchema,
    },
    preHandler: userHooks_1.userAddDevicePreHandler,
};
exports.userAddDeviceByIdOpts = {
    schema: {
        body: userOptionsSchema_1.userAddDeviceByIdBodySchema,
        response: userOptionsSchema_1.userAddDeviceResponseSchema,
    },
    preHandler: userHooks_1.userAddDeviceByIdPreHandler,
};
exports.userGetDevicesOpts = {
    schema: {
        response: userOptionsSchema_1.userAddDeviceResponseSchema,
    },
};
exports.userUpdateOpts = {
    schema: {
        body: userOptionsSchema_1.userUpdatePasswordBodySchema,
    },
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userVerifyEmailOpts = exports.userVerifyCodeOpts = exports.userResetSetNewPassOpts = exports.userResetPassCodeOpts = exports.userUpdateOpts = exports.userGetDevicesOpts = exports.userAddDeviceByIdOpts = exports.userAddDeviceOpts = exports.userLoginOpts = exports.userRegisterOpts = void 0;
var userHooks_1 = require("../../utils/hooks/userHooks");
var userOptionsSchema_1 = require("../../utils/schemas/userOptionsSchema");
exports.userRegisterOpts = {
    schema: {
        body: userOptionsSchema_1.userRegisterBodySchema,
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
exports.userResetPassCodeOpts = {
    schema: {
        params: {
            type: 'object',
            additionalProperties: false,
            required: ['code'],
            properties: {
                code: { type: 'number', minimum: 100000, maximum: 999999 },
            },
        },
    },
};
exports.userResetSetNewPassOpts = {
    schema: {
        body: {
            type: 'object',
            additionalProperties: false,
            required: ['newPassword'],
            maxProperties: 1,
            minProperties: 1,
            properties: {
                newPassword: { type: 'string', minLength: 6 },
            },
        },
        params: {
            type: 'object',
            additionalProperties: false,
            required: ['code'],
            properties: {
                code: { type: 'number', minimum: 100000, maximum: 999999 },
            },
        },
    },
};
exports.userVerifyCodeOpts = {
    schema: {
        params: {
            type: 'object',
            additionalProperties: false,
            required: ['code'],
            properties: {
                code: { type: 'number', minimum: 100000, maximum: 999999 },
            },
        },
    },
};
exports.userVerifyEmailOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                email: { type: 'string', format: 'email', minLength: 4 },
            },
            additionalProperties: false,
            required: ['email'],
            maxProperties: 1,
            minProperties: 1,
        },
    },
};

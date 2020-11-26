"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAddDeviceResponseSchema = exports.userAddDeviceBodySchema = exports.userUpdatePasswordBodySchema = exports.userLoginBodySchema = exports.userLoginResponseSchema = exports.userRegisterBodySchema = void 0;
exports.userRegisterBodySchema = {
    title: 'User Register Body Schema',
    type: 'object',
    properties: {
        username: { type: 'string' },
        password: { type: 'string', minLength: 6 },
        email: { type: 'string', format: 'email', minLength: 4 },
    },
    additionalProperties: false,
    required: ['username', 'password', 'email'],
    maxProperties: 3,
    minProperties: 3,
};
exports.userLoginResponseSchema = {
    200: {
        type: 'object',
        properties: {
            ok: { type: 'boolean' },
            uid: { type: 'string' },
            username: { type: 'string' },
            email: { type: 'string' },
            tokenJWT: { type: 'string' },
            devices: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        name: { type: 'string' },
                        owner: { type: 'string' },
                        rxConnection: { type: 'string', format: 'date-time' },
                        lastMeasure: {
                            type: 'object',
                            properties: {
                                liquidLevel: { type: 'number' },
                                batteryLevel: { type: 'number' },
                                dateMeasure: { type: 'string', format: 'date-time' },
                            },
                        },
                    },
                },
            },
        },
    },
};
exports.userLoginBodySchema = {
    title: 'User Login Body Schema',
    type: 'object',
    properties: {
        email: { type: 'string', format: 'email', minLength: 4 },
        password: { type: 'string', minLength: 6 },
    },
    additionalProperties: false,
    required: ['email', 'password'],
    maxProperties: 2,
    minProperties: 2,
};
exports.userUpdatePasswordBodySchema = {
    title: 'User Update Password Body Schema',
    type: 'object',
    properties: {
        newPassword: { type: 'string', minLength: 6 },
        password: { type: 'string', minLength: 6 },
    },
    additionalProperties: false,
    required: ['newPassword', 'password'],
    maxProperties: 2,
    minProperties: 2,
};
exports.userAddDeviceBodySchema = {
    title: 'User Add Device Body Schema',
    type: 'object',
    properties: {
        idESP: { type: 'string', minLength: 24, maxLength: 24 },
    },
    require: ['idESP'],
    maxProperties: 1,
};
exports.userAddDeviceResponseSchema = {
    200: {
        type: 'object',
        properties: {
            ok: { type: 'boolean' },
            devices: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        name: { type: 'string' },
                        owner: { type: 'string' },
                        minLevel: { type: 'number' },
                        notification: { type: 'boolean' },
                        rxConnection: { type: 'string', format: 'date-time' },
                        lastMeasure: {
                            type: 'object',
                            properties: {
                                liquidLevel: { type: 'number' },
                                batteryLevel: { type: 'number' },
                                dateMeasure: { type: 'string', format: 'date-time' },
                            },
                        },
                    },
                },
            },
        },
    },
};

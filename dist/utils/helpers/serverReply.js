"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var serverReply = {
    success: {
        code: 200,
        ok: true,
        message: 'Successfully',
    },
    created: {
        code: 201,
        ok: true,
        message: 'Successfully created',
    },
    badRequest: {
        code: 400,
        ok: false,
        message: 'Bad request',
    },
    unauthorized: {
        code: 401,
        ok: false,
        message: 'Unauthorized',
    },
    internalError: {
        code: 500,
        ok: false,
        message: 'Internal server error',
    },
};
exports.default = serverReply;

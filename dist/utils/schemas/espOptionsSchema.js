"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.espUpdateResponseSchema = exports.espUpdateBodySchema = void 0;
exports.espUpdateBodySchema = {
    title: 'Esp Update Body Schema',
    type: 'object',
    properties: {
        id: { type: 'string', minLength: 24, maxLength: 24 },
        name: { type: 'string', minLength: 1 },
        notification: { type: 'boolean' },
        minLevel: { type: 'number', minimum: 0, maximum: 100 },
    },
    additionalProperties: false,
    required: ['id', 'name', 'notification', 'minLevel'],
    maxProperties: 4,
};
exports.espUpdateResponseSchema = {};

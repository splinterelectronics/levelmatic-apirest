"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.measureDeleteOpts = exports.measureReadOpts = void 0;
var measureOptionsSchema_1 = require("../../utils/schemas/measureOptionsSchema");
exports.measureReadOpts = {
    schema: {
        querystring: measureOptionsSchema_1.measureReadBodySchema,
        response: measureOptionsSchema_1.measureReadResponseSchema,
    },
};
exports.measureDeleteOpts = {};

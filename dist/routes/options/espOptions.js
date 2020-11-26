"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.measureDeleteOpts = exports.espUpdateOpts = void 0;
var espOptionsSchema_1 = require("../../utils/schemas/espOptionsSchema");
exports.espUpdateOpts = {
    schema: {
        body: espOptionsSchema_1.espUpdateBodySchema,
    },
};
exports.measureDeleteOpts = {};

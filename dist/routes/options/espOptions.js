"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.espUpdateOpts = void 0;
var espOptionsSchema_1 = require("../../utils/schemas/espOptionsSchema");
// eslint-disable-next-line import/prefer-default-export
exports.espUpdateOpts = {
    schema: {
        body: espOptionsSchema_1.espUpdateBodySchema,
    },
};

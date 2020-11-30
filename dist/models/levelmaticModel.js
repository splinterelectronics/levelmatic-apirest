"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var LevelmaticSchemaFields = {
    devicesESP: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Esp',
        },
    ],
};
var LevelmaticSchema = new mongoose_1.Schema(LevelmaticSchemaFields);
var Levelmatic = mongoose_1.model('Levelmatic', LevelmaticSchema);
exports.default = Levelmatic;

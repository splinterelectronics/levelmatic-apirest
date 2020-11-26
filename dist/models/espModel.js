"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var EspSchemaFields = {
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    lastMeasure: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Measure',
    },
    name: String,
    rxConnection: Date,
    minLevel: Number,
    notification: Boolean,
};
var EspSchema = new mongoose_1.Schema(EspSchemaFields);
var Esp = mongoose_1.model('Esp', EspSchema);
exports.default = Esp;

"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var MeasureSchemaFields = {
    idESP: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Esp',
    },
    liquidLevel: {
        type: Number,
    },
    batteryLevel: {
        type: Number,
    },
    dateMeasure: {
        type: Date,
        default: Date.now,
    },
};
var MeasureSchema = new mongoose_1.Schema(MeasureSchemaFields);
MeasureSchema.methods.toJSON = function dataToReturn() {
    var _a = this.toObject(), _id = _a._id, idESP = _a.idESP, __v = _a.__v, measure = __rest(_a, ["_id", "idESP", "__v"]);
    return measure;
};
var Measure = mongoose_1.model('Measure', MeasureSchema);
exports.default = Measure;

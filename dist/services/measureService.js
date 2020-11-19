"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var measureModel_1 = __importDefault(require("../models/measureModel"));
var getRangeDate_1 = __importDefault(require("../utils/helpers/getRangeDate"));
var MeasureService = /** @class */ (function () {
    function MeasureService() {
    }
    Object.defineProperty(MeasureService, "Instance", {
        get: function () {
            if (!MeasureService.instance) {
                MeasureService.instance = new MeasureService();
            }
            return MeasureService.instance;
        },
        enumerable: false,
        configurable: true
    });
    MeasureService.prototype.getByEspId = function (idESP, range) {
        var _a = getRangeDate_1.default(range), from = _a.from, to = _a.to;
        return measureModel_1.default.find({
            idESP: idESP,
            dateMeasure: {
                $gte: from.toDate(),
                $lte: to.toDate(),
            },
        }).sort({ dateMeasure: 'asc' });
    };
    return MeasureService;
}());
exports.default = MeasureService;

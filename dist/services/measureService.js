"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var measureModel_1 = __importDefault(require("../models/measureModel"));
var getRangeDate_1 = __importDefault(require("../utils/helpers/getRangeDate"));
var measureAggregateByRange_1 = require("../utils/helpers/measureAggregateByRange");
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
        var dateMeasure = { $gte: from.toDate(), $lte: to.toDate() };
        if (range === '1h') {
            return measureModel_1.default.find({
                idESP: idESP,
                dateMeasure: dateMeasure,
            }).sort({ dateMeasure: 'asc' });
        }
        return measureModel_1.default.aggregate([
            {
                $match: {
                    idESP: mongoose_1.Types.ObjectId(idESP),
                    dateMeasure: dateMeasure,
                },
            },
        ])
            .project(measureAggregateByRange_1.getProjectObject(range))
            .group(measureAggregateByRange_1.getGroupObject(range))
            .sort(measureAggregateByRange_1.getSortObject(range));
    };
    return MeasureService;
}());
exports.default = MeasureService;

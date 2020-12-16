"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dayjs_1 = __importDefault(require("dayjs"));
var getDateArrayByDDMM = function (dates) {
    return dates.map(function (_a) {
        var day = _a._id, month = _a.month, year = _a.year;
        return dayjs_1.default(year + "-" + month + "-" + day).format('DD/MM');
    });
};
var getDateArrayByHour = function (dates) {
    return dates.map(function (_a) {
        var hour = _a._id;
        return hour + ":00";
    });
};
var getDateArray = function (dates, range) {
    if (range === '1m' || range === '7d') {
        return getDateArrayByDDMM(dates);
    }
    if (range === '6h' || range === '1d') {
        return getDateArrayByHour(dates);
    }
    return dates.map(function () { return ''; });
};
exports.default = getDateArray;

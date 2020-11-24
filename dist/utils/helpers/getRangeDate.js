"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dayjs_1 = __importDefault(require("dayjs"));
var getRangeDate = function (interval) {
    if (interval === void 0) { interval = '7d'; }
    var to = dayjs_1.default();
    switch (interval) {
        case '1h': {
            var from = to.subtract(1, 'hour');
            return { from: from, to: to };
        }
        case '6h': {
            var from = to.subtract(6, 'hour');
            return { from: from, to: to };
        }
        case '1d': {
            var from = to.subtract(1, 'day');
            return { from: from, to: to };
        }
        case '7d': {
            var from = to.subtract(7, 'day');
            return { from: from, to: to };
        }
        case '1m': {
            var from = to.subtract(30, 'day');
            return { from: from, to: to };
        }
        default: {
            var from = to.subtract(1, 'hour');
            return { from: from, to: to };
        }
    }
};
exports.default = getRangeDate;

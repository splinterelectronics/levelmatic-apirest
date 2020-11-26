"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var espModel_1 = __importDefault(require("../models/espModel"));
var EspService = /** @class */ (function () {
    function EspService() {
    }
    Object.defineProperty(EspService, "Instance", {
        get: function () {
            if (!EspService.instance) {
                EspService.instance = new EspService();
            }
            return EspService.instance;
        },
        enumerable: false,
        configurable: true
    });
    EspService.prototype.getById = function (id) {
        return espModel_1.default.findById(id);
    };
    EspService.prototype.updateById = function (id, data) {
        return espModel_1.default.findByIdAndUpdate(id, data, { new: true }).populate('lastMeasure');
    };
    return EspService;
}());
exports.default = EspService;

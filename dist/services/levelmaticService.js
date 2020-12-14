"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var levelmaticModel_1 = __importDefault(require("../models/levelmaticModel"));
var LevelmaticService = /** @class */ (function () {
    function LevelmaticService() {
    }
    Object.defineProperty(LevelmaticService, "Instance", {
        get: function () {
            if (!LevelmaticService.instance) {
                LevelmaticService.instance = new LevelmaticService();
            }
            return LevelmaticService.instance;
        },
        enumerable: false,
        configurable: true
    });
    LevelmaticService.prototype.getLevelmaticById = function (id) {
        return levelmaticModel_1.default.findById(id);
    };
    LevelmaticService.prototype.getLevelmaticByCredentials = function (credentials) {
        return levelmaticModel_1.default.findOne(credentials);
    };
    return LevelmaticService;
}());
exports.default = LevelmaticService;

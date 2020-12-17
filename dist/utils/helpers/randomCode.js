"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var randomCode = function () {
    return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
};
exports.default = randomCode;

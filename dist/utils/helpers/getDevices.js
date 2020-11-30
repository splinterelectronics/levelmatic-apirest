"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getDevices = function (devices) {
    if (devices === void 0) { devices = []; }
    var fetchDevices = [];
    devices.forEach(function (_a) {
        var _b = _a.devicesESP, devicesESP = _b === void 0 ? [] : _b;
        devicesESP.forEach(function (esp) {
            fetchDevices.push(esp);
        });
    });
    return fetchDevices;
};
exports.default = getDevices;

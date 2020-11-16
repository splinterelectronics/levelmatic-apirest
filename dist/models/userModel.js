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
var UserSchemaFields = {
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    devices: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Esp',
        },
    ],
};
var UserSchema = new mongoose_1.Schema(UserSchemaFields);
UserSchema.methods.toJSON = function dataToReturn() {
    var _a = this.toObject(), password = _a.password, __v = _a.__v, user = __rest(_a, ["password", "__v"]);
    return user;
};
var User = mongoose_1.model('User', UserSchema);
exports.default = User;

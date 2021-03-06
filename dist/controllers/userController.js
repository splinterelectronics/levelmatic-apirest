"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var userService_1 = __importDefault(require("../services/userService"));
var serverReply_1 = __importDefault(require("../utils/helpers/serverReply"));
var config_1 = require("../utils/nodemailer/config");
var getDevices_1 = __importDefault(require("../utils/helpers/getDevices"));
var randomCode_1 = __importDefault(require("../utils/helpers/randomCode"));
var service = userService_1.default.Instance;
var UserController = /** @class */ (function () {
    function UserController() {
    }
    Object.defineProperty(UserController, "Instance", {
        get: function () {
            if (!UserController.instance) {
                UserController.instance = new UserController();
            }
            return UserController.instance;
        },
        enumerable: false,
        configurable: true
    });
    UserController.prototype.create = function (req, reply) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, password, email, salt, emailLowerCase, user, userDB, mailOpts, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, username = _a.username, password = _a.password, email = _a.email;
                        salt = bcryptjs_1.default.genSaltSync(Number(process.env.SALT));
                        emailLowerCase = email.toLowerCase();
                        user = {
                            username: username,
                            verified: false,
                            verifiedCode: randomCode_1.default(),
                            verifiedCodeExpires: Date.now() + 600000,
                            email: emailLowerCase,
                            password: bcryptjs_1.default.hashSync(password, salt),
                        };
                        return [4 /*yield*/, service.create(user)];
                    case 1:
                        userDB = _b.sent();
                        if (!userDB) {
                            return [2 /*return*/, reply
                                    .code(400)
                                    .send({ ok: false, message: 'No se pudo crear el usuario' })];
                        }
                        mailOpts = {
                            to: userDB.email,
                            from: {
                                name: 'Levelmatic',
                                address: 'info@levelmatic.net',
                            },
                            subject: 'Creacion de cuenta en Levelmatic',
                            text: "Tu codigo para la verificaci\u00F3n de correo es: \n" + userDB.verifiedCode,
                            html: "\n              <p>Tu codigo de verificaci\u00F3n de correo es:</p>\n              <p style=\"font-size:36px;\">" + userDB.verifiedCode + "</p>\n        ",
                        };
                        return [4 /*yield*/, config_1.sendMail(mailOpts)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, reply.code(200).send({
                                ok: true,
                                message: 'El usuario ha sido creado exitosamente',
                            })];
                    case 3:
                        error_1 = _b.sent();
                        console.log(error_1);
                        return [2 /*return*/, reply.code(500).send({ ok: false, code: 500 })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.login = function (fastify, req, reply) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, user, payload, tokenJWT, devices, uid, username, fetchDevices, replyUserData, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, email = _a.email, password = _a.password;
                        return [4 /*yield*/, service.getByEmail(email.toLowerCase())];
                    case 1:
                        user = _b.sent();
                        if (!user || !bcryptjs_1.default.compareSync(password, user.password)) {
                            return [2 /*return*/, reply
                                    .code(serverReply_1.default.badRequest.code)
                                    .send({ ok: false, message: 'credenciales incorrectas' })];
                        }
                        if (!user.verified) {
                            return [2 /*return*/, reply
                                    .code(401)
                                    .send({ ok: false, message: 'El usuario no ha sido verificado' })];
                        }
                        payload = { uid: user._id, email: user.email };
                        tokenJWT = fastify.jwt.sign(payload, {
                            expiresIn: '30d',
                        });
                        devices = user.devices, uid = user._id, username = user.username;
                        fetchDevices = getDevices_1.default(devices);
                        replyUserData = {
                            ok: true,
                            tokenJWT: tokenJWT,
                            devices: fetchDevices,
                            uid: uid,
                            username: username,
                            email: email,
                        };
                        return [2 /*return*/, reply.code(serverReply_1.default.success.code).send(replyUserData)];
                    case 2:
                        error_2 = _b.sent();
                        console.log(error_2);
                        return [2 /*return*/, reply.code(500).send({ ok: false, code: 500 })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.addLevelmaticToUser = function (req, reply) {
        return __awaiter(this, void 0, void 0, function () {
            var uid, idLevelmatic, devices, fetchDevices, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uid = req.user.uid;
                        idLevelmatic = req.idLevelmatic;
                        return [4 /*yield*/, (service.addLevelmaticToUser(uid, idLevelmatic))];
                    case 1:
                        devices = (_a.sent()).devices;
                        if (!devices || (devices === null || devices === void 0 ? void 0 : devices.length) === 0) {
                            return [2 /*return*/, reply.code(400).send({ ok: false, code: 400 })];
                        }
                        fetchDevices = getDevices_1.default(devices);
                        return [2 /*return*/, reply.send({ ok: true, devices: fetchDevices })];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [2 /*return*/, reply.code(500).send({ ok: false, code: 500 })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getEspsByUser = function (req, reply) {
        return __awaiter(this, void 0, void 0, function () {
            var uid, devices, fetchDevices, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uid = req.user.uid;
                        return [4 /*yield*/, service.getEsps(uid)];
                    case 1:
                        devices = (_a.sent()).devices;
                        fetchDevices = getDevices_1.default(devices);
                        return [2 /*return*/, reply.send({ ok: true, devices: fetchDevices })];
                    case 2:
                        error_4 = _a.sent();
                        console.log(error_4);
                        return [2 /*return*/, reply.code(500).send({ ok: false, code: 500 })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getLevelmaticsByUser = function (req, reply) {
        return __awaiter(this, void 0, void 0, function () {
            var uid, levelmatics, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uid = req.user.uid;
                        return [4 /*yield*/, service.getById(uid)];
                    case 1:
                        levelmatics = (_a.sent()).devices;
                        return [2 /*return*/, reply.send({ ok: true, levelmatics: levelmatics })];
                    case 2:
                        error_5 = _a.sent();
                        console.log(error_5);
                        return [2 /*return*/, reply.code(500).send({ ok: false, code: 500 })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.exist = function (req, reply) {
        return __awaiter(this, void 0, void 0, function () {
            var email, userExist, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        email = req.body.email;
                        return [4 /*yield*/, service.getByEmail(email.toLowerCase())];
                    case 1:
                        userExist = _a.sent();
                        if (userExist) {
                            return [2 /*return*/, reply.code(400).send({
                                    ok: false,
                                    message: 'Ya hay un usuario registrado con ese email',
                                })];
                        }
                        return [2 /*return*/, true];
                    case 2:
                        error_6 = _a.sent();
                        console.log(error_6);
                        return [2 /*return*/, reply.code(500).send({ ok: false, message: 'Internal Error' })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.update = function (req, reply) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, uid, _b, password, newPassword, user, salt, newPasswordEncrypted, error_7;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _a = req.user, email = _a.email, uid = _a.uid;
                        _b = req.body, password = _b.password, newPassword = _b.newPassword;
                        if (password === newPassword) {
                            return [2 /*return*/, reply.code(serverReply_1.default.badRequest.code).send({
                                    ok: false,
                                    message: 'La nueva contraseña no debe ser igual a la anterior',
                                })];
                        }
                        return [4 /*yield*/, service.getByEmail(email)];
                    case 1:
                        user = _c.sent();
                        if (!user || !bcryptjs_1.default.compareSync(password, user.password)) {
                            return [2 /*return*/, reply
                                    .code(serverReply_1.default.badRequest.code)
                                    .send({ ok: false, message: 'Contraseña incorrecta' })];
                        }
                        salt = bcryptjs_1.default.genSaltSync(Number(process.env.SALT));
                        newPasswordEncrypted = bcryptjs_1.default.hashSync(newPassword, salt);
                        return [4 /*yield*/, service.update(uid, {
                                password: newPasswordEncrypted,
                            })];
                    case 2:
                        _c.sent();
                        return [2 /*return*/, reply
                                .code(200)
                                .send({ ok: true, message: 'La contraseña ha sido actualizada' })];
                    case 3:
                        error_7 = _c.sent();
                        console.log(error_7);
                        return [2 /*return*/, reply.code(500).send({ ok: false, message: 'Internal Error' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.generateNewToken = function (fastify, req, reply) {
        var _a = req.user, email = _a.email, uid = _a.uid;
        var payload = { uid: uid, email: email };
        var tokenJWT = fastify.jwt.sign(payload, {
            expiresIn: '30d',
        });
        return reply.send({ ok: true, tokenJWT: tokenJWT });
    };
    UserController.prototype.forgotPassword = function (req, reply) {
        return __awaiter(this, void 0, void 0, function () {
            var email, user, userForgotPass, mailOpts, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        email = req.body.email;
                        return [4 /*yield*/, service.getByEmail(email)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, reply.send({
                                    ok: false,
                                    message: 'No se encontró ningun usuario con este email',
                                })];
                        }
                        user.resetPasswordCode = randomCode_1.default();
                        user.resetPasswordExpires = Date.now() + 900000;
                        return [4 /*yield*/, user.save()];
                    case 2:
                        userForgotPass = _a.sent();
                        mailOpts = {
                            to: userForgotPass.email,
                            from: {
                                name: 'Levelmatic',
                                address: 'info@levelmatic.net',
                            },
                            subject: 'Restablecimiento de contraseña de Levelmatic',
                            text: "Tu codigo de restablecimiento de contrase\u00F1a es: \n" + userForgotPass.resetPasswordCode + " \n\nSi tu no pediste este restablecimiento de contrase\u00F1a, solamente ignora este email.",
                            html: "\n              <p>Tu codigo de restablecimiento de contrase\u00F1a es:</p>\n              <p style=\"font-size:36px;\">" + userForgotPass.resetPasswordCode + "</p>\n              <p>Si tu no pediste este restablecimiento de contrase\u00F1a, solamente ignora este email.</p>\n        ",
                        };
                        return [4 /*yield*/, config_1.sendMail(mailOpts)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, reply.send({
                                ok: true,
                                message: 'Se ha enviado el codigo de recuperación de contraseña a su correo',
                            })];
                    case 4:
                        error_8 = _a.sent();
                        console.log(error_8);
                        return [2 /*return*/, reply.code(500).send({ ok: false, message: 'Internal Error' })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.resetPassword = function (req, reply) {
        return __awaiter(this, void 0, void 0, function () {
            var code, user, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        code = req.params.code;
                        return [4 /*yield*/, service.getByPassCode(code)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, reply
                                    .code(401)
                                    .send({ ok: false, message: 'El codigo expiró o es invalido' })];
                        }
                        reply.send({ ok: true, code: Number(code) });
                        return [3 /*break*/, 3];
                    case 2:
                        error_9 = _a.sent();
                        console.log(error_9);
                        return [2 /*return*/, reply.code(500).send({ ok: false, message: 'Internal Error' })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.setupNewPassword = function (req, reply) {
        return __awaiter(this, void 0, void 0, function () {
            var code, newPassword, user, salt, newPasswordEncrypted, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        code = req.params.code;
                        newPassword = req.body.newPassword;
                        return [4 /*yield*/, service.getByPassCode(code)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, reply.code(401).send({
                                    ok: false,
                                    message: 'El tiempo para cambiar la contraseña expiró',
                                })];
                        }
                        salt = bcryptjs_1.default.genSaltSync(Number(process.env.SALT));
                        newPasswordEncrypted = bcryptjs_1.default.hashSync(newPassword, salt);
                        return [4 /*yield*/, service.update(user._id, {
                                password: newPasswordEncrypted,
                                resetPasswordCode: undefined,
                                resetPasswordExpires: undefined,
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, reply.send({
                                ok: true,
                                message: 'La contraseña ha sido modificada',
                            })];
                    case 3:
                        error_10 = _a.sent();
                        console.log(error_10);
                        return [2 /*return*/, reply.code(500).send({ ok: false, message: 'Internal Error' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.verifyEmail = function (req, reply) {
        return __awaiter(this, void 0, void 0, function () {
            var email, userDB, userToVerify, mailOpts, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        email = req.body.email;
                        return [4 /*yield*/, service.getByEmail(email)];
                    case 1:
                        userDB = _a.sent();
                        if (!userDB) {
                            return [2 /*return*/, reply.send({
                                    ok: false,
                                    message: 'El usuario con este email no existe',
                                })];
                        }
                        if (userDB.verified) {
                            return [2 /*return*/, reply.send({
                                    ok: false,
                                    message: 'Este usuario ya está verificado',
                                })];
                        }
                        userDB.verifiedCode = randomCode_1.default();
                        userDB.verifiedCodeExpires = Date.now() + 600000;
                        return [4 /*yield*/, service.update(userDB._id, userDB)];
                    case 2:
                        userToVerify = _a.sent();
                        mailOpts = {
                            to: userToVerify.email,
                            from: {
                                name: 'Levelmatic',
                                address: 'info@levelmatic.net',
                            },
                            subject: 'Verificación de correo',
                            text: "Tu codigo de verificaci\u00F3n de correo es: \n" + userToVerify.verifiedCode,
                            html: "\n              <p>Tu codigo de verificaci\u00F3n de correo es:</p>\n              <p style=\"font-size:36px;\">" + userToVerify.verifiedCode + "</p>\n        ",
                        };
                        return [4 /*yield*/, config_1.sendMail(mailOpts)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, reply.send({
                                ok: true,
                                message: 'Se ha enviado el codigo de verificacion al correo',
                            })];
                    case 4:
                        error_11 = _a.sent();
                        console.log(error_11);
                        return [2 /*return*/, reply.code(500).send({ ok: false, message: 'Internal Error' })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.verifyEmailCode = function (req, reply) {
        return __awaiter(this, void 0, void 0, function () {
            var code, user, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        code = req.params.code;
                        return [4 /*yield*/, service.getByVerifyCode(code)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, reply.send({
                                    ok: false,
                                    message: 'El codigo expiró o no es valido',
                                })];
                        }
                        return [4 /*yield*/, service.update(user._id, {
                                verified: true,
                                verifiedCode: undefined,
                                verifiedCodeExpires: undefined,
                            })];
                    case 2:
                        _a.sent();
                        reply.send({ ok: true, message: 'Usuario verificado' });
                        return [3 /*break*/, 4];
                    case 3:
                        error_12 = _a.sent();
                        console.log(error_12);
                        return [2 /*return*/, reply.code(500).send({ ok: false, message: 'Internal Error' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.default = UserController;

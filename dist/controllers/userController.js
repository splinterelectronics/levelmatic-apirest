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
            var _a, username, password, email, salt, user, userDB, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, username = _a.username, password = _a.password, email = _a.email;
                        salt = bcryptjs_1.default.genSaltSync(Number(process.env.SALT));
                        user = {
                            username: username,
                            email: email,
                            password: bcryptjs_1.default.hashSync(password, salt),
                        };
                        return [4 /*yield*/, service.create(user)];
                    case 1:
                        userDB = _b.sent();
                        return [2 /*return*/, reply.code(serverReply_1.default.created.code).send(userDB)];
                    case 2:
                        error_1 = _b.sent();
                        console.log(error_1);
                        return [2 /*return*/, reply.code(500).send({ ok: false, code: 500 })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.login = function (fastify, req, reply) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, user, payload, tokenJWT, devices, uid, username, replyUserData, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, email = _a.email, password = _a.password;
                        return [4 /*yield*/, service.login(email)];
                    case 1:
                        user = _b.sent();
                        if (!user || !bcryptjs_1.default.compareSync(password, user.password)) {
                            return [2 /*return*/, reply
                                    .code(serverReply_1.default.badRequest.code)
                                    .send({ ok: false, message: 'credenciales incorrectas' })];
                        }
                        payload = { uid: user._id, email: user.email };
                        tokenJWT = fastify.jwt.sign(payload, {
                            expiresIn: '30d',
                        });
                        devices = user.devices, uid = user._id, username = user.username;
                        replyUserData = {
                            ok: true,
                            tokenJWT: tokenJWT,
                            devices: devices,
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
    UserController.prototype.addEspToUser = function (req, reply) {
        return __awaiter(this, void 0, void 0, function () {
            var uid, idESP, user, devices, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uid = req.user.uid;
                        idESP = req.body.idESP;
                        return [4 /*yield*/, service.addEspToUser(uid, idESP)];
                    case 1:
                        user = _a.sent();
                        devices = user === null || user === void 0 ? void 0 : user.devices;
                        if (!devices || (devices === null || devices === void 0 ? void 0 : devices.length) === 0) {
                            return [2 /*return*/, reply.send({ ok: false, code: 400 })];
                        }
                        return [2 /*return*/, reply.send({ ok: true, devices: devices })];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [2 /*return*/, reply.code(500).send({ ok: false, code: 500 })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.default = UserController;
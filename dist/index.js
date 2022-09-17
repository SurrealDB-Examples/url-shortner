"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
require("dotenv/config");
var init_1 = require("./init");
var uid_1 = __importDefault(require("./uid"));
(0, init_1.init)({
    user: 'root',
    pass: 'root',
    ns: 'main',
    db: 'urlshort',
})
    .then(function (data) {
    console.log("Successfuly Connected To Database!");
})
    .catch(function (err) {
    console.log(err);
});
var envs = process.env;
var server = (0, express_1.default)();
server.use(body_parser_1.default.urlencoded({ extended: false }));
server.use(body_parser_1.default.json());
server.get('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                if (id == null) {
                    return [2 /*return*/, res.json({
                            Message: 'Invalid url',
                        })];
                }
                return [4 /*yield*/, init_1.db.select('links', {
                        id: (0, uid_1.default)(id),
                    })];
            case 1:
                data = _a.sent();
                if (data.length > 0) {
                    res.redirect(data[0].long);
                }
                else {
                    return [2 /*return*/, res.json({
                            Message: 'URL not found in database',
                        })];
                }
                return [2 /*return*/];
        }
    });
}); });
server.post('/create', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var url, created;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = req.body.url;
                if (url == null) {
                    return [2 /*return*/, res.json({
                            Message: 'No URL provided',
                        })];
                }
                return [4 /*yield*/, init_1.db.create("links:".concat((0, uid_1.default)(7)), {
                        long: req.body.url,
                    })];
            case 1:
                created = _a.sent();
                return [2 /*return*/, res.json({
                        Message: 'Shortened URL',
                        Data: __assign({}, created),
                    })];
        }
    });
}); });
server.listen({ port: envs.PORT }, function () {
    console.log("Application is available at http://127.0.0.1:".concat(envs.PORT));
});

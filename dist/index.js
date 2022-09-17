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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const init_1 = require("./init");
const uid_1 = __importDefault(require("./uid"));
const envs = process.env;
const server = (0, express_1.default)();
server.use(body_parser_1.default.urlencoded({ extended: false }));
server.use(body_parser_1.default.json());
(0, init_1.init)({
    user: 'root',
    pass: 'root',
    ns: 'main',
    db: 'urlshort',
})
    .then((data) => {
    console.log(`Successfuly Connected To Database!`);
})
    .catch((err) => {
    console.log(err);
});
server.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (id == null) {
        return res.json({
            Message: 'Invalid url',
        });
    }
    let data = yield init_1.db.select('links', {
        id: (0, uid_1.default)(id),
    });
    if (data.length > 0) {
        res.redirect(data[0].long);
    }
    else {
        return res.json({
            Message: 'URL not found in database',
        });
    }
}));
server.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    if (url == null) {
        return res.json({
            Message: 'No URL provided',
        });
    }
    let created = yield init_1.db.create(`links:${(0, uid_1.default)(7)}`, {
        long: req.body.url,
    });
    return res.json({
        Message: 'Shortened URL',
        Data: Object.assign({}, created),
    });
}));
server.listen({ port: envs.PORT }, () => {
    console.log(`Application is available at http://127.0.0.1:${envs.PORT}`);
});

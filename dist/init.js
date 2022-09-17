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
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.db = void 0;
const Surreal = require('surrealdb.js');
const db = new Surreal('http://127.0.0.1:8000/rpc');
exports.db = db;
function init(options) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db.signin({
            user: options.user,
            pass: options.pass,
        });
        yield db.use(options.ns, options.db);
        return db;
    });
}
exports.init = init;

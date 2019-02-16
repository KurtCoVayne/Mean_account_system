"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('*', (req, res) => {
            res.sendFile(path_1.default.join(__dirname, '../public/index.html'));
        });
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = __importDefault(require("../controllers/usersController"));
const passport = require("passport");
const passport_1 = __importDefault(require("../config/passport"));
class UsersRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        passport_1.default(passport);
        this.router.get('/profile', passport.authenticate('jwt', { session: false }), usersController_1.default.profile);
        this.router.post('/register', usersController_1.default.logup);
        this.router.post('/login', usersController_1.default.login);
    }
}
const usersRoutes = new UsersRoutes();
exports.default = usersRoutes.router;

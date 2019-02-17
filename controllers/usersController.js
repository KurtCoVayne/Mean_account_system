"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const secret_1 = __importDefault(require("../config/secret"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UsersController {
    logup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, username, password } = req.body;
            let newUser = new User_1.User({
                name,
                email,
                username,
                password
            });
            res.json(yield User_1.addUser(newUser));
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            const user = yield User_1.existingUser(username, username);
            if (!user) {
                return res.json({ ok: false, statusText: 'User with that username/mail dont found' });
            }
            if (yield User_1.comparePassword(password, user.password)) {
                const token = jsonwebtoken_1.default.sign(user, secret_1.default.jwtSecret, {
                    expiresIn: 604800 // 1 week
                });
                res.json({
                    ok: true,
                    body: {
                        token: 'JWT ' + token,
                        user: {
                            id: user._id,
                            name: user.name,
                            username: user.username,
                            email: user.email
                        }
                    }
                });
            }
            else {
                return res.json({ ok: false, statusText: 'Wrong password' });
            }
        });
    }
    profile(req, res) {
        res.json({ body: { user: req.user } });
    }
}
exports.usersController = new UsersController();
exports.default = exports.usersController;

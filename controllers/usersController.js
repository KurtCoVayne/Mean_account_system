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
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield User_1.User.find()
                .then(users => {
                if (users.length == 0) {
                    res.status(204).json({ text: "There's no users yet" });
                }
                else {
                    res.json(users);
                }
            })
                .catch(err => console.error(err.message));
        });
    }
    logup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, username, password } = req.body;
            let newUser = new User_1.User({
                name,
                email,
                username,
                password
            });
            User_1.addUser(newUser, (err, user) => {
                if (err) {
                    res.json({ ok: false, message: 'Failed to register user' });
                }
                else {
                    res.json({ ok: true, message: 'User registered' });
                }
            });
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            User_1.getUserByUsername(username, (err, user) => {
                if (err)
                    throw err;
                if (!user) {
                    return res.json({ ok: false, message: 'User with that username dont found' });
                }
                User_1.comparePassword(password, user.password, (err, isMatch) => {
                    if (err)
                        throw err;
                    if (isMatch) {
                        const token = jsonwebtoken_1.default.sign(user.toJSON(), secret_1.default.jwtSecret, {
                            expiresIn: 604800
                        });
                        res.json({
                            ok: true,
                            token: 'JWT ' + token,
                            user: {
                                id: user._id,
                                name: user.name,
                                username: user.username,
                                email: user.email
                            }
                        });
                    }
                    else {
                        return res.json({ ok: false, message: 'Wrong password' });
                    }
                });
            });
        });
    }
    profile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json({ user: req.user });
        });
    }
}
exports.usersController = new UsersController();
exports.default = exports.usersController;

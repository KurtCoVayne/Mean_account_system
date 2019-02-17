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
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
exports.User = mongoose_1.model('User', UserSchema);
exports.default = exports.User;
exports.existingUser = function (username, email) {
    return __awaiter(this, void 0, void 0, function* () {
        try { //Esta funcion puede servir para checkear si hay un usuario existente, tanto para logearse como para registrarse
            const user = yield exports.User.findOne({ $or: [{ email }, { username }] });
            if (user) {
                return user.toJSON();
            }
            return false;
        }
        catch (e) {
            const error = e;
            console.error(error);
            return false;
        }
    });
};
exports.getUserById = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        // User.findById(id, calback)
        try {
            const user = yield exports.User.findById(id);
            if (user) {
                return user;
            }
            return false;
        }
        catch (e) {
            const error = e;
            console.error(error);
            return error;
        }
    });
};
exports.addUser = function (newUser) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const _existingUser = yield exports.existingUser(newUser.username, newUser.email);
            if (!_existingUser) {
                const salt = yield bcryptjs_1.default.genSalt(10);
                newUser.password = yield bcryptjs_1.default.hash(newUser.password, salt);
                newUser.save();
                return { ok: true, statusText: `You were registered succesfully, now you can login` };
            }
            else {
                return { ok: false, status: 412, statusText: `There's already an user with that mail/username` };
            }
        }
        catch (e) {
            const error = e;
            console.error(error);
            return { ok: false, status: 500, statusText: `Something went wrong :(` };
        }
    });
};
exports.comparePassword = function (candidatePassword, hash) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(candidatePassword, hash);
    });
};

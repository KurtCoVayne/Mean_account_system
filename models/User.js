"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
});
exports.User = mongoose_1.model('User', UserSchema);
exports.getUserById = function (id, callback) {
    exports.User.findById(id, callback);
};
exports.getUserByUsername = function (username, callback) {
    const query = { username };
    exports.User.findOne(query, callback);
};
exports.addUser = function (newUser, callback) {
    bcryptjs_1.default.genSalt(10, (err, salt) => {
        if (err)
            throw err;
        bcryptjs_1.default.hash(newUser.password, salt, (err, hash) => {
            if (err)
                throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};
exports.comparePassword = function (candidatePassword, hash, callback) {
    bcryptjs_1.default.compare(candidatePassword, hash, (err, isMatch) => {
        if (err)
            throw err;
        callback(null, isMatch);
    });
};

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const User_1 = require("../models/User");
const opts = {
    secretOrKey: 'lost-on-you',
    // jwtFromRequest: ExtractJwt.fromAuthHeader()
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderWithScheme('jwt')
};
exports.passportConfig = function (passport) {
    passport.use(new passport_jwt_1.Strategy(opts, (jwt_payload, done) => __awaiter(this, void 0, void 0, function* () {
        const check = yield User_1.getUserById(jwt_payload._id);
        if (check) {
            return done(null, check);
        }
        else if (check instanceof Error) {
            return done(check, false);
        }
        else {
            return done(null, false);
        }
    })));
};
exports.default = exports.passportConfig;

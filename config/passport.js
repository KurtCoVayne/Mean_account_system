"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const User_1 = require("../models/User");
const opts = {
    secretOrKey: 'lost-on-you',
    // jwtFromRequest: ExtractJwt.fromAuthHeader()
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderWithScheme('jwt')
};
exports.passportConfig = function (passport) {
    passport.use(new passport_jwt_1.Strategy(opts, (jwt_payload, done) => {
        User_1.getUserById(jwt_payload._id, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));
};
exports.default = exports.passportConfig;

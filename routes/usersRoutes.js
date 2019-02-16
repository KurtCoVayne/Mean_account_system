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
        // passportConfig(passport)
        passport_1.default(passport);
        //Ruta de registro, ruta de mirar perfil y configurarlo, ruta de eliminar perfil ruta de inicio de seccion
        this.router.get('/', usersController_1.default.list);
        this.router.get('/profile', passport.authenticate('jwt', { session: false }), usersController_1.default.profile);
        this.router.post('/register', usersController_1.default.logup);
        this.router.post('/login', usersController_1.default.login);
        // this.router.put('/:id', usersController.update)
        // this.router.delete('/:id', usersController.delete);
    }
}
const usersRoutes = new UsersRoutes();
exports.default = usersRoutes.router;

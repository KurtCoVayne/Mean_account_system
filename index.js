"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport = require("passport");
const passport_1 = __importDefault(require("./config/passport"));
const path_1 = __importDefault(require("path"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        const MONGO_URI = 'mongodb://test0:dVxdMyx1HmhxM1sH@cluster0-shard-00-00-ojqdw.mongodb.net:27017,cluster0-shard-00-01-ojqdw.mongodb.net:27017,cluster0-shard-00-02-ojqdw.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
        mongoose_1.default.set('useFindAndModify', true);
        mongoose_1.default.connect(MONGO_URI, {
            useCreateIndex: true,
            useNewUrlParser: true,
        })
            .then(() => console.log('DB is connected'));
        this.app.set('port', process.env.PORT || 3000);
        // this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
    }
    routes() {
        this.app.use('/users', usersRoutes_1.default);
        this.app.use('/', indexRoutes_1.default);
    }
    passport() {
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        passport_1.default(passport);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Listening on ', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();

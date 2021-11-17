"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
const serialport_1 = __importDefault(require("serialport"));
const controller_1 = __importDefault(require("../sockets/controller"));
const connection_1 = require("../db/connection");
const routers_1 = require("../routers");
class ServerApp {
    constructor() {
        this.port = process.env.PORT || '4000';
        this.app = (0, express_1.default)();
        this.server = (0, http_1.createServer)(this.app);
        this.socketio = new socket_io_1.Server(this.server, {
            cors: {
                origin: ['http://localhost:8080'],
            }
        });
        this.paths = {
            records: '/api/records',
            users: '/api/users',
            roles: '/api/roles',
            auth: '/api/auth',
        };
        this.readLine = serialport_1.default.parsers.Readline;
        this.portSerial = new serialport_1.default('COM2', { baudRate: 9600 });
        this.parser = this.portSerial.pipe(new this.readLine({ delimiter: '\r\n' }));
        this.middlewares();
        this.routers();
        this.init();
        this.sockets();
    }
    init() {
        this.portSerial.on('error', (error) => {
            console.log(error);
        });
        (0, connection_1.connection)();
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.static('public/'));
        this.app.use(express_1.default.json());
    }
    routers() {
        this.app.use(this.paths.records, routers_1.records);
        this.app.use(this.paths.users, routers_1.users);
        this.app.use(this.paths.roles, routers_1.roles);
        this.app.use(this.paths.auth, routers_1.auth);
    }
    sockets() {
        this.socketio.on('connect', (sockets) => (0, controller_1.default)(sockets, this.parser));
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log(`Running on port ${this.port}`);
        });
    }
}
exports.default = ServerApp;
//# sourceMappingURL=server-app.js.map
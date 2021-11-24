import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';
import SerialPort from 'serialport';

import { connection } from '../db/connection';
import { auth, records, roles, users } from '../routers';
import dbAddRecord from '../helpers/db-add-record';
export default class ServerApp {

    // Server App
    private port: string = process.env.PORT || '4000';
    private app: express.Application = express();
    private server = createServer(this.app);
    private io: Server = new Server(this.server, {
        cors: {
            origin: ['http://localhost:8080'],
        }
    });
    private paths = {
        records: '/api/records',
        users: '/api/users',
        roles: '/api/roles',
        auth: '/api/auth',
    }

    // PORT Serial
    private readLine = SerialPort.parsers.Readline;
    private portSerial = new SerialPort('COM2', { baudRate: 9600 });
    private parser = this.portSerial.pipe(new this.readLine({ delimiter: '\r\n' }));

    constructor() {
        
        this.middlewares();
        
        this.routers();

        this.init();

        this.sockets();
    }

    private init(): void {
        this.portSerial.on('error', (error) => {
            console.log(error);
        });

        connection();
    }

    private middlewares(): void {
        this.app.use(cors());
        this.app.use(express.static('public/'));
        this.app.use(express.json());
    }

    private routers(): void {
        this.app.use(this.paths.records, records);
        this.app.use(this.paths.users, users);
        this.app.use(this.paths.roles, roles);
        this.app.use(this.paths.auth, auth);
    }

    private sockets(): void {
        
        this.parser.on('data', async (data) => {
            const record = await dbAddRecord(data);

            this.io.emit('/socket/sendTemp', record);
        });
    }

    public listen(): void {
        this.server.listen(this.port, () => {
            console.log(`Running on port ${this.port}`);
        });
    }

}
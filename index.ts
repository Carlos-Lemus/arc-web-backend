import dotenv from 'dotenv';

dotenv.config();

import ServerApp from "./models/server-app";

const server: ServerApp = new ServerApp();

server.listen();
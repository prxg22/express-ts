import { Application, Router, Request, Response, NextFunction } from 'express';
import { Connection } from 'mongoose';
import * as http from 'http';
import * as express from 'express';
import * as bodyParser from 'body-parser';

import { App } from './app'
import { ErrorHandler, Error, ErrorCode } from './error';

const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const MONGODB_CONNECTION: string = "mongodb://localhost:27017/planilha_financeira";

export class Server {
	private expressApp: Application;
	private connection: Connection;
	private router: Router;
	private server: http.Server;
	private app: App;
	private errorHandler: ErrorHandler;
	private readonly port: number|string|boolean;

	constructor() {
		this.port = Server.normalizePort(port);
		this.expressApp = express();
		this.errorHandler = new ErrorHandler();

		this.config();

		this.server.listen(this.port);
	}

	private config() {
		this.expressApp.use(bodyParser.json());
		this.expressApp.use(bodyParser.urlencoded({
			extended: true
		}));
		
		global.Promise = require("q").Promise;
		mongoose.Promise = global.Promise;

		this.connection = mongoose.createConnection(MONGODB_CONNECTION);
		this.connection.on('connected', () => {
			console.log('> mongoose connected!');
		});
		this.connection.on('error', (err) => {
			console.log('> mongoose didn\'t connect due: \n' + err);
		});

		this.router = Router();
		this.app = new App(this.connection, this.router);

		this.router.get('/teste', function(req, res) {
			res.send('teste ok');
		});
		this.expressApp.use(this.router);
		this.expressApp.use(this.errorHandler.error);
		this.server = http.createServer(this.expressApp);
		this.registerEvents();
	}

	private registerEvents() {
		this.server.on('error', this.onError);
		this.server.on('listening', this.onListening);
		this.server.on('abort', this.onAbort);
		this.server.on('aborted', this.onAbort);
		this.server.on('close', this.onAbort);
	}

	private static normalizePort(val: number|string): number|string|boolean {
		let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
		if (isNaN(port)) return val;
		else if (port >= 0) return port;
		else return false;
	}


	public onError = (error: NodeJS.ErrnoException): void => {
		if (error.syscall !== 'listen') throw error;
		let bind = (typeof this.port === 'string') ? 'Pipe ' + this.port : 'Port ' + this.port;
		switch(error.code) {
			case 'EACCES':
				console.error(`${bind} requires elevated privileges`);
				process.exit(1);
				break;
			case 'EADDRINUSE':
				console.error(`${bind} is already in use`);
				process.exit(1);
				break;
			default:
				throw error;
		}
	}

	public onListening = (): void => {
		let addr = this.server.address();
		let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
		console.log(`> Listening on ${bind}`);
	};

	public onAbort = (): void => {
		console.log('closing connection');
		this.server.close();
	}
}
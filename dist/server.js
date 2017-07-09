"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var http = require("http");
var express = require("express");
var bodyParser = require("body-parser");
var app_1 = require("./app");
var error_1 = require("./error");
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var MONGODB_CONNECTION = "mongodb://localhost:27017/planilha_financeira";
var Server = (function () {
    function Server() {
        var _this = this;
        this.onError = function (error) {
            if (error.syscall !== 'listen')
                throw error;
            var bind = (typeof _this.port === 'string') ? 'Pipe ' + _this.port : 'Port ' + _this.port;
            switch (error.code) {
                case 'EACCES':
                    console.error(bind + " requires elevated privileges");
                    process.exit(1);
                    break;
                case 'EADDRINUSE':
                    console.error(bind + " is already in use");
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        };
        this.onListening = function () {
            var addr = _this.server.address();
            var bind = (typeof addr === 'string') ? "pipe " + addr : "port " + addr.port;
            console.log("> Listening on " + bind);
        };
        this.onAbort = function () {
            console.log('closing connection');
            _this.server.close();
        };
        this.port = Server.normalizePort(port);
        this.expressApp = express();
        this.errorHandler = new error_1.ErrorHandler();
        this.config();
        this.server.listen(this.port);
    }
    Server.prototype.config = function () {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({
            extended: true
        }));
        global.Promise = require("q").Promise;
        mongoose.Promise = global.Promise;
        this.connection = mongoose.createConnection(MONGODB_CONNECTION);
        this.connection.on('connected', function () {
            console.log('> mongoose connected!');
        });
        this.connection.on('error', function (err) {
            console.log('> mongoose didn\'t connect due: \n' + err);
        });
        this.router = express_1.Router();
        this.app = new app_1.App(this.connection, this.router);
        this.router.get('/teste', function (req, res) {
            res.send('teste ok');
        });
        this.expressApp.use(this.router);
        this.expressApp.use(this.errorHandler.error);
        this.server = http.createServer(this.expressApp);
        this.registerEvents();
    };
    Server.prototype.registerEvents = function () {
        this.server.on('error', this.onError);
        this.server.on('listening', this.onListening);
        this.server.on('abort', this.onAbort);
        this.server.on('aborted', this.onAbort);
        this.server.on('close', this.onAbort);
    };
    Server.normalizePort = function (val) {
        var port = (typeof val === 'string') ? parseInt(val, 10) : val;
        if (isNaN(port))
            return val;
        else if (port >= 0)
            return port;
        else
            return false;
    };
    return Server;
}());
exports.Server = Server;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var error_1 = require("./error");
var Route = (function () {
    function Route(path, method, action, params) {
        this.path = path;
        this.method = method;
        this.action = action;
        this.params = params;
    }
    ;
    Route.prototype.useParams = function () {
        var regex = /:\w+/g;
        if (!this.path) {
            return false;
        }
        var params = this.path.match(regex);
        if (!params || params.length < 1) {
            return false;
        }
        return true;
    };
    return Route;
}());
exports.Route = Route;
var Controller = (function () {
    function Controller(path, router, connection) {
        this.path = path;
        this.router = router;
        this.connection = connection;
        this.post = function (req, res, next) {
            next(new error_1.Error());
        };
        this.delete = function (req, res, next) {
            next(new error_1.Error());
        };
        this.put = function (req, res, next) {
            next(new error_1.Error());
        };
        this.routes = [];
        this.registerRoutes();
        this.registerMiddleware();
    }
    Controller.prototype.registerMiddleware = function () {
        var _this = this;
        this.routes.map(function (route) {
            var path = _this.path + route.path;
            console.log("> Registrando rota (" + route.method + "): " + path);
            _this.router[route.method](path, _this[route.method](route));
        });
    };
    Controller.prototype.registerRoutes = function () { };
    ;
    Controller.prototype.get = function (route) {
        return function (req, res, next) {
            var params = route.useParams();
            var promise;
            if (params) {
                promise = route.action(req.params, req.query);
            }
            else {
                promise = route.action(req.query);
            }
            return promise.then(function (results) { return results ? res.send(results) : new error_1.Error(error_1.ErrorCode.NOT_FOUND); }, function (err) { return next(err); });
        };
    };
    ;
    return Controller;
}());
exports.Controller = Controller;

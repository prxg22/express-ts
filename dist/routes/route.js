"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Route = (function () {
    function Route(path, method, action) {
        this.path = path;
        this.method = method;
        this.action = action;
    }
    return Route;
}());
exports.Route = Route;
var BaseRoute = (function () {
    function BaseRoute(path, router) {
        this.router = router;
        this.path = path;
        this.registerRoutes();
        this.createRoutes();
    }
    BaseRoute.prototype.createRoutes = function () {
        var _this = this;
        this.routes.map(function (route, index) {
            console.log('> Criando rota: (' + route.method + ')' + _this.path + route.path);
            _this.router[route.method](_this.path + route.path, route.action);
        });
    };
    BaseRoute.prototype.registerRoutes = function () { };
    ;
    return BaseRoute;
}());
exports.BaseRoute = BaseRoute;

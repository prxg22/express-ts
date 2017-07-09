"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var errorHandler_1 = require("../utils/errorHandler");
var route_1 = require("./route");
var app_1 = require("../app");
var TypeRoute = (function (_super) {
    __extends(TypeRoute, _super);
    function TypeRoute(path, router) {
        return _super.call(this, path, router) || this;
    }
    TypeRoute.prototype.getTypes = function (req, res, next) {
        return app_1.models.type.find().then(function (types) { return res.json(types); }, function (err) { return errorHandler_1.errorHandler(500, err, res); });
    };
    TypeRoute.prototype.create = function (req, res, next) {
        var type = app_1.models.type(req.body);
        type.save().then(function (type) { return res.send(type); }, function (err) { return errorHandler_1.errorHandler(500, err, res); });
    };
    TypeRoute.prototype.edit = function (req, res, next) {
        return app_1.models.type.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }).then(function (type) { return res.send(type); }, function (err) { return errorHandler_1.errorHandler(500, err, res); });
    };
    TypeRoute.prototype.delete = function (req, res, next) {
        return app_1.models.type.findOneAndRemove({ _id: req.params.id }).then(function () { return res.sendStatus(200); }, function (err) { return errorHandler_1.errorHandler(500, err, res); });
    };
    TypeRoute.prototype.get = function (req, res, next) {
        return app_1.models.type.findOne({ _id: req.params.id }).then(function (type) { return res.send(type); }, function (err) { return errorHandler_1.errorHandler(500, err, res); });
    };
    TypeRoute.prototype.registerRoutes = function () {
        this.routes = [
            new route_1.Route('', 'get', this.getTypes),
            new route_1.Route('', 'post', this.create),
            new route_1.Route('/:id', 'get', this.get),
            new route_1.Route('/:id', 'put', this.edit),
            new route_1.Route('/:id', 'delete', this.delete),
        ];
    };
    return TypeRoute;
}(route_1.BaseRoute));
exports.TypeRoute = TypeRoute;

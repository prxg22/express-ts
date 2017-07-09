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
var IncomeRoute = (function (_super) {
    __extends(IncomeRoute, _super);
    function IncomeRoute(path, router) {
        return _super.call(this, path, router) || this;
    }
    IncomeRoute.prototype.create = function (req, res, next) {
        var income = new app_1.models.income(req.body);
        income.save().then(function (income) { return res.send(income); }, function (err) { return errorHandler_1.errorHandler(500, err, res); });
    };
    IncomeRoute.prototype.get = function (req, res, next) {
        app_1.models.income.find().then(function (incomes) { return res.send(incomes); }, function (err) { return errorHandler_1.errorHandler(500, err, res); });
    };
    IncomeRoute.prototype.edit = function (req, res, next) {
        return app_1.models.income.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }).then(function (income) { return res.send(income); }, function (err) { return errorHandler_1.errorHandler(500, err, res); });
    };
    IncomeRoute.prototype.getById = function (req, res, next) {
        return app_1.models.income.findById(req.params.id).then(function (income) {
            res.send(income);
        }, function (err) { return errorHandler_1.errorHandler(500, err, res); });
    };
    IncomeRoute.prototype.registerRoutes = function () {
        this.routes = [
            new route_1.Route('', 'post', this.create),
            new route_1.Route('', 'get', this.get),
            new route_1.Route('/:id', 'get', this.getById),
            new route_1.Route('/:id', 'put', this.edit)
        ];
    };
    return IncomeRoute;
}(route_1.BaseRoute));
exports.IncomeRoute = IncomeRoute;

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
var ExpenseRoute = (function (_super) {
    __extends(ExpenseRoute, _super);
    function ExpenseRoute(path, router) {
        return _super.call(this, path, router) || this;
    }
    ExpenseRoute.prototype.create = function (req, res, next) {
        var expense = new app_1.models.expense(req.body);
        expense.save().then(function (expenseNoType) { return expenseNoType.populate('type').execPopulate().then(function (expense) { return res.send(expense); }); }, function (err) { return errorHandler_1.errorHandler(500, err, res); });
    };
    ExpenseRoute.prototype.get = function (req, res, next) {
        app_1.models.expense.find().then(function (expenses) { return res.send(expenses); }, function (err) { return errorHandler_1.errorHandler(500, err, res); });
    };
    ExpenseRoute.prototype.edit = function (req, res, next) {
        return app_1.models.expense.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }).then(function (expense) { return res.send(expense); }, function (err) { return errorHandler_1.errorHandler(500, err, res); });
    };
    ExpenseRoute.prototype.getById = function (req, res, next) {
        return app_1.models.expense.findById(req.params.id).then(function (expense) {
            res.send(expense);
        }, function (err) { return errorHandler_1.errorHandler(500, err, res); });
    };
    ExpenseRoute.prototype.registerRoutes = function () {
        this.routes = [
            new route_1.Route('', 'post', this.create),
            new route_1.Route('', 'get', this.get),
            new route_1.Route('/:id', 'get', this.getById),
            new route_1.Route('/:id', 'put', this.edit),
        ];
    };
    return ExpenseRoute;
}(route_1.BaseRoute));
exports.ExpenseRoute = ExpenseRoute;

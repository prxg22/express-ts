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
var route_1 = require("./route");
var app_1 = require("../app");
var BalanceRoute = (function (_super) {
    __extends(BalanceRoute, _super);
    function BalanceRoute(path, router) {
        return _super.call(this, path, router) || this;
    }
    BalanceRoute.prototype.get = function (req, res, next) {
        var query = {};
        var init = req.query.init ? new Date(req.query.init) : null;
        var end = req.query.end ? new Date(req.query.end) : null;
        if (init) {
            query.date = { $gte: init };
        }
        if (end) {
            query.date = { $lte: end };
        }
        console.log(query);
        app_1.models.income.find(query).sort('date').then(function (incomes) { return res.send(incomes); });
    };
    BalanceRoute.prototype.registerRoutes = function () {
        this.routes = [
            new route_1.Route('', 'get', this.get),
        ];
    };
    return BalanceRoute;
}(route_1.BaseRoute));
exports.BalanceRoute = BalanceRoute;

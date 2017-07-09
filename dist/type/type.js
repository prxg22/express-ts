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
var route_1 = require("../route");
var type_schema_1 = require("./type.schema");
var TypeController = (function (_super) {
    __extends(TypeController, _super);
    function TypeController(router, connection) {
        return _super.call(this, '/type', router, connection) || this;
    }
    TypeController.prototype.getAll = function (query) {
        console.log('entrei sem parametros');
        var model = this.connection.model('type', type_schema_1.TypeSchema);
        console.log(model);
        return model.find();
    };
    TypeController.prototype.getOne = function () {
        var _this = this;
        return function (params, query) {
            console.log(params);
            var model = _this.connection.model('type', type_schema_1.TypeSchema);
            return model.find({ _id: params.id });
        };
    };
    TypeController.prototype.registerRoutes = function () {
        this.routes.push(new route_1.Route('/', 'get', this.getAll));
        this.routes.push(new route_1.Route('/:id', 'get', this.getOne()));
    };
    return TypeController;
}(route_1.Controller));
exports.TypeController = TypeController;

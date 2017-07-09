"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var type_1 = require("./type/type");
var App = (function () {
    function App(connection, router) {
        this.connection = connection;
        this.router = router;
        this.createRoutes();
    }
    App.prototype.createRoutes = function () {
        new type_1.TypeController(this.router, this.connection);
    };
    return App;
}());
exports.App = App;

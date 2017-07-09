"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var type_model_1 = require("./type.model");
var income_model_1 = require("./income.model");
var expense_model_1 = require("./expense.model");
var balance_model_1 = require("./balance.model");
var Model = (function () {
    function Model(connection) {
        this.models = {
            type: connection.model('type', type_model_1.typeSchema),
            income: connection.model('income', income_model_1.incomeSchema),
            expense: connection.model('expense', expense_model_1.expenseSchema),
            balance: balance_model_1.BalanceModel
        };
    }
    return Model;
}());
exports.Model = Model;

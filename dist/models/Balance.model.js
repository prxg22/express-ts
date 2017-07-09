"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BalanceModel = (function () {
    function BalanceModel(expenses, incomes) {
        this.expenses = expenses;
        this.incomes = incomes;
        var entries = expenses.concat(incomes);
        var dates = entries.sort(function (entrie1, entrie2) { return entrie2.date.getUTCDate() - entrie1.date.getUTCDate(); }).map(function (entrie) { return entrie.date; });
        this.init = dates[0];
        this.end = dates[dates.length - 1];
    }
    return BalanceModel;
}());
exports.BalanceModel = BalanceModel;

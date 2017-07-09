"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = function (code, err, res) {
    console.log(err.message + '\n');
    return res.status(code).send(err);
};

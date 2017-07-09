"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    ErrorCode[ErrorCode["SERVER_ERR"] = 500] = "SERVER_ERR";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
var Error = (function () {
    function Error(code, message) {
        if (code === void 0) { code = ErrorCode.SERVER_ERR; }
        if (message === void 0) { message = ''; }
        this.code = code;
        this.message = message;
        if (this.code === ErrorCode.NOT_FOUND && !this.message) {
            this.message = 'Página não encontrada';
        }
        else if (!this.message) {
            this.message = 'Erro no servidor!';
        }
    }
    return Error;
}());
exports.Error = Error;
var ErrorHandler = (function () {
    function ErrorHandler() {
    }
    ErrorHandler.prototype.error = function (err, req, res, next) {
        console.log(err);
        res.send(err);
    };
    return ErrorHandler;
}());
exports.ErrorHandler = ErrorHandler;

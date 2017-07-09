"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
exports.incomeSchema = new Schema({
    value: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    desc: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    modifiedAt: {
        type: Date,
        default: Date.now()
    },
    isSalary: {
        type: Boolean,
        default: false
    }
});
exports.incomeSchema.pre('findOneAndUpdate', function (next) {
    var modifiedAt = Date.now();
    this.update({}, { $set: { modifiedAt: modifiedAt } });
    next();
});

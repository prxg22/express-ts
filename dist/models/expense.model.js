"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
exports.expenseSchema = new Schema({
    value: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'type',
        required: true
    },
    desc: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    modifiedAt: {
        type: Date,
        default: Date.now()
    }
});
exports.expenseSchema.pre('findOneAndUpdate', function (next) {
    var modifiedAt = Date.now();
    this.update({}, { $set: { modifiedAt: modifiedAt } });
    next();
});

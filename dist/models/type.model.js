"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
exports.typeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
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
exports.typeSchema.pre('findOneAndUpdate', function (next) {
    var modifiedAt = Date.now();
    this.update({}, { $set: { modifiedAt: modifiedAt } });
    next();
});

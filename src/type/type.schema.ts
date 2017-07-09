import * as mongoose from 'mongoose';
import { Type } from './type';

let Schema = mongoose.Schema;

export interface TypeModel extends mongoose.Document, Type {
}

export const TypeSchema = new Schema({
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

TypeSchema.pre('findOneAndUpdate', function (next) {
	let modifiedAt = Date.now();
	this.update({}, { $set: { modifiedAt: modifiedAt } });
	next();
});
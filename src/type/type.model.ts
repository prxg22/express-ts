import * as mongoose from 'mongoose';
import { Entity } from '../entity';

let Schema = mongoose.Schema;

export class Type extends Entity{
	name: string;
	desc?: string;
	createdAt?: Date;
	modifiedAt?: Date;
}

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
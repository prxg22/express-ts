import * as mongoose from 'mongoose';
import { Entity } from '../entity';

let Schema = mongoose.Schema;

export class Income extends Entity{
	value: number;
	date: Date;
	desc?: string;
	isSalary: boolean;
	createdAt?: Date;
	modifiedAt?: Date;
}

export interface IncomeModel extends mongoose.Document, Income {
}

export const IncomeSchema = new Schema({
	value: {
		type: Number,
		required: true,
	},
	date: {
		type: Date,
		required: true,
		default: Date.now()
	},
	desc: String,
	isSalary: {
		type: Boolean,
		default: false
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	modifiedAt: {
		type: Date,
		default: Date.now()
	}
});

IncomeSchema.pre('findOneAndUpdate', function (next) {
	let modifiedAt = Date.now();
	this.update({}, { $set: { modifiedAt: modifiedAt } });
	next();
});
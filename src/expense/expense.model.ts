import * as mongoose from 'mongoose';
import { Entity } from '../entity';
import { Type } from '../type/type.model';
import { Income } from '../income/income.model';

let Schema = mongoose.Schema;

export class Expense extends Entity{
	value: number;
	date: Date;
	desc?: string;
	type: Type | string;
	createdAt?: Date;
	modifiedAt?: Date;

	constructor (obj?) {
		super(obj);

		if (this.type && typeof this.type === 'object') {
			this.type = new Type(this.type);
		}
	}
}

export interface ExpenseModel extends mongoose.Document, Expense {
}

export const ExpenseSchema = new Schema({
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
	type: {
		type: Schema.Types.ObjectId,
		ref: 'type',
		required: true
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

ExpenseSchema.pre('findOneAndUpdate', function (next) {
	let modifiedAt = Date.now();
	this.update({}, { $set: { modifiedAt: modifiedAt } });
	next();
});
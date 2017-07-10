import { Router } from 'express';
import { Connection, Model } from 'mongoose';
import { Route, RouteRegistration, Param, ParamSource } from '../route';
import { ExpenseModel, Expense, ExpenseSchema} from './expense.model';

export class ExpenseRoute extends Route<Expense>{
	private model: Model<ExpenseModel>;

	constructor(router: Router, connection: Connection) {
		super('/expense', router, connection);
		this.model = this.connection.model<ExpenseModel>('expense', ExpenseSchema);
		this.populates = ['type'];
	}

	public getAll(query: any): Promise<Expense[]>{
		if (!query) {
			query = {};
		}
		return this.model.find({}, {}, query);
	}

	public getOne(id: string, query: any) {
		if (!query) {
			query = {};
		}
		return this.model.findOne({ _id: id }, {}, query);
	}

	public create(expense: Expense): Promise<Expense> {
		return this.model.create(expense);
	}

	public edit(id: string, expense: Expense): Promise<Expense> {
		return this.model.findOneAndUpdate(
			{ _id: id },
			{ $set: expense },
			{ new: true }
		);
	}

	public delete(id: string): Promise<Expense> {
		return this.model.findOneAndRemove({ _id: id });
	}

	protected registerRoutes() {
		this.routes.push(new RouteRegistration('/', 'get','getAll', [
			new Param('', ParamSource.query)
		]));
		this.routes.push(new RouteRegistration('/', 'post', 'create', [
			new Param('', ParamSource.body, Expense)
		]));
		this.routes.push(new RouteRegistration('/:id', 'get', 'getOne', [
			new Param('id', ParamSource.params),
			new Param('', ParamSource.query)
		]));
		this.routes.push(new RouteRegistration('/:id', 'put', 'edit', [
			new Param('id', ParamSource.params),
			new Param('', ParamSource.body, Expense)
		]));
		this.routes.push(new RouteRegistration('/:id', 'delete', 'delete', [
			new Param('id', ParamSource.params)
		]));
	}
}
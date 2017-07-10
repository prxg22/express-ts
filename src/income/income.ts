import { Router } from 'express';
import { Connection, Model } from 'mongoose';
import { Route, RouteRegistration, Param, ParamSource } from '../route';
import { IncomeModel, Income, IncomeSchema} from './income.model';

export class IncomeRoute extends Route<Income>{
	private model: Model<IncomeModel>;

	constructor(router: Router, connection: Connection) {
		super('/income', router, connection);
		this.model = this.connection.model<IncomeModel>('income', IncomeSchema);
	}

	public getAll(query: any): Promise<Income[]>{
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

	public create(income: Income): Promise<Income> {
		return this.model.create(income);
	}

	public edit(id: string, income: Income): Promise<Income> {
		return this.model.findOneAndUpdate(
			{ _id: id },
			{ $set: income },
			{ new: true }
		);
	}

	public delete(id: string): Promise<Income> {
		return this.model.findOneAndRemove({ _id: id });
	}

	protected registerRoutes() {
		this.routes.push(new RouteRegistration('/', 'get','getAll', [
			new Param('', ParamSource.query)
		]));
		this.routes.push(new RouteRegistration('/', 'post', 'create', [
			new Param('', ParamSource.body, Income)
		]));
		this.routes.push(new RouteRegistration('/:id', 'get', 'getOne', [
			new Param('id', ParamSource.params),
			new Param('', ParamSource.query)
		]));
		this.routes.push(new RouteRegistration('/:id', 'put', 'edit', [
			new Param('id', ParamSource.params),
			new Param('', ParamSource.body, Income)
		]));
		this.routes.push(new RouteRegistration('/:id', 'delete', 'delete', [
			new Param('id', ParamSource.params)
		]));
	}
}
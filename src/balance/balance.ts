import { Router } from 'express'
import { Route, RouteRegistration, Param, ParamSource } from '../route';

import { Balance } from './balance.model'
import { IncomeRoute } from '../income/income';
import { ExpenseRoute } from '../expense/expense';

export class BalanceRoute extends Route<Balance> {
	constructor(router: Router, private income: IncomeRoute, expense: ExpenseRoute) {
		super('/balance', router);
	}

	public getPeriod(init: Date, end: Date): Promise<Balance> {
		console.log(init);
		console.log(end);
		return global.Promise((resolve, reject) => {
			resolve(new Balance({init: init, end: end}));
		});
	}

	protected registerRoutes() {
		this.routes.push(new RouteRegistration('/', 'get', 'getPeriod', [
			new Param('init', ParamSource.query, Date),
			new Param('end', ParamSource.query, Date),
		]));
	}
}
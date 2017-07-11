import { Router } from 'express';
import { Connection } from 'mongoose';
import { TypeRoute } from './type/type';
import { IncomeRoute } from './income/income';
import { ExpenseRoute } from './expense/expense';
import { BalanceRoute } from './balance/balance'

export class App {
	constructor(private connection: Connection, public router: Router) {
		this.createRoutes();
	}

	protected createRoutes() {
		new TypeRoute(this.router, this.connection);
		let income = new IncomeRoute(this.router, this.connection);
		let expense = new ExpenseRoute(this.router, this.connection);
		new BalanceRoute(this.router, income, expense);
	}
}
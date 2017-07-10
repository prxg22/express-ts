import { Router } from 'express';
import { Connection } from 'mongoose';
import { TypeRoute } from './type/type';
import { IncomeRoute } from './income/income';
import { ExpenseRoute } from './expense/expense';

export class App {
	constructor(private connection: Connection, public router: Router) {
		this.createRoutes();
	}

	protected createRoutes() {
		new TypeRoute(this.router, this.connection);
		new IncomeRoute(this.router, this.connection);
		new ExpenseRoute(this.router, this.connection);
	}
}
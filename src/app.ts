import { Router } from 'express';
import { Connection } from 'mongoose';
import { TypeController } from './type/type';

export class App {
	constructor(private connection: Connection, public router: Router) {
		this.createRoutes();
	}

	protected createRoutes() {
		new TypeController(this.router, this.connection);
	}
}
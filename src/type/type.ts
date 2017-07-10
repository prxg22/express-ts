import { Router } from 'express';
import { Connection, Model } from 'mongoose';

import { RouteRegistration, Route, Param, ParamSource } from '../route';
import { TypeSchema, TypeModel } from './type.schema';

export interface Type {
	name: string;
	desc?: string;
	createdAt?: Date,
	modifiedAt?: Date
}


export class TypeController extends Route<Type> {
	constructor(router: Router, connection: Connection) {
		super('/type', router, connection);
	}

	public getAll(query: any): Promise<Type[]> {
		let model = this.connection.model<TypeModel>('type', TypeSchema);
		console.log(query);
		return model.find();

	}

	public getOne(id: string, query: any): Promise<Type> {
		let model = this.connection.model<TypeModel>('type', TypeSchema);
		return model.findOne({_id: id});
	}

	protected registerRoutes() {
		this.routes.push(new RouteRegistration('/', 'get', 'getAll', [
			new Param('modifiedAt', ParamSource.query, Date);
		]));

		this.routes.push(new RouteRegistration('/:id', 'get', 'getOne', [
			new Param('id', ParamSource.params),
			new Param('', ParamSource.query)
		]));
	}
}
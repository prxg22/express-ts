import { Router } from 'express';
import { Connection, Model } from 'mongoose';

import { Route, Controller } from '../route';
import { TypeSchema, TypeModel } from './type.schema';

export interface Type {
	name: string;
	desc?: string;
	createdAt?: Date,
	modifiedAt?: Date
}


export class TypeController extends Controller<Type> {
	constructor(router: Router, connection: Connection) {
		super('/type', router, connection);
	}

	public getAll(query: any): Promise<Type[]> {
		console.log('entrei sem parametros');
		let model = this.connection.model<TypeModel>('type', TypeSchema);
		return model.find();

	}

	public getOne(params: any, query: any): Promise<Type[]> {
		console.log(params);
		let model = this.connection.model<TypeModel>('type', TypeSchema);
		return model.find({_id: params.id});
	}

	protected registerRoutes() {
		this.routes.push(new Route('/', 'get', 'getAll'));
		this.routes.push(new Route('/:id', 'get', 'getOne'));
	}
}
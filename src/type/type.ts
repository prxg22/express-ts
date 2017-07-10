import { Router } from 'express';
import { Connection, Model } from 'mongoose';

import { RouteRegistration, Route, Param, ParamSource } from '../route';
import { Type, TypeSchema, TypeModel } from './type.model';


export class TypeRoute extends Route<Type> {
	constructor(router: Router, connection: Connection) {
		super('/type', router, connection);
	}

	public getAll(query: any): Promise<Type[]> {
		let model = this.connection.model<TypeModel>('type', TypeSchema);
		return model.find();

	}

	public getOne(id: string, query: any): Promise<Type> {
		let model = this.connection.model<TypeModel>('type', TypeSchema);
		return model.findOne({ _id: id });
	}

	public create(type: Type): Promise<Type> {
		let model = this.connection.model<TypeModel>('type', TypeSchema);
		return model.create(type);
	}
	
	public delete(id: string): Promise<Type> {
		let model = this.connection.model<TypeModel>('type', TypeSchema);
		return model.findOneAndRemove({_id: id});
	}

	public edit(id: string, type: Type): Promise<Type> {
		let model = this.connection.model<TypeModel>('type', TypeSchema);
		return model.findOneAndUpdate({ _id: id }, { $set: type }, { new: true });
	}

	protected registerRoutes() {
		this.routes.push(new RouteRegistration('/', 'get', 'getAll', [
			new Param('', ParamSource.query),
		]));

		this.routes.push(new RouteRegistration('/:id', 'get', 'getOne', [
			new Param('id', ParamSource.params),
			new Param('', ParamSource.query),
		]));

		this.routes.push(new RouteRegistration('/', 'post', 'create', [
			new Param('', ParamSource.body, Type)
		]));

		this.routes.push(new RouteRegistration('/:id', 'delete', 'delete', [
			new Param('id', ParamSource.params)
		]));

		this.routes.push(new RouteRegistration('/:id', 'put', 'edit', [
			new Param('id', ParamSource.params),
			new Param('', ParamSource.body, Type)
		]));
	}
}
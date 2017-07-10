import { Router, Request, Response, NextFunction } from 'express';
import { Connection, Model, Document } from 'mongoose';
import { Error, ErrorCode } from './error';

export enum ParamSource {
	query = 0,
	body,
	params
}
export class Param {
	constructor(public name?: string, public source?: ParamSource, private type?: any) {
		if (this.source < 0) {
			this.source = ParamSource.body;
		}
	};
	
	public get(req: Request): any {
		let source: string = ParamSource[this.source];
		let res: any = req[source];

		if (this.name) {
			res = res[this.name];
		}
		
		if(this.type) {
			res = new this.type(res);
		}

		return res;
	}
}

export class RouteRegistration {
	constructor(
		public path: string, 
		public method: string, 
		public action: any,
		public params?: Param[]
	) {};

	public getParams(req: Request) {
		return this.params ? this.params.map((param: Param) => param.get(req)) : [];
	}
}

export class Route<T> {
	public routes: RouteRegistration[];
	public populates: string[];

	constructor(private path: string, private router: Router, protected readonly connection?: Connection) {
		this.routes = [];
		this.registerRoutes();
		this.registerMiddleware();
	}

	private registerMiddleware() {
		this.routes.map(route => {
			let path = this.path + route.path;
			console.log(`> Registrando rota (${route.method}): ${path}`);
			this.router[route.method](path, this.route(route));
		});
	}


	protected registerRoutes(){};

	private route(route: RouteRegistration) {
		return (req: Request, res: Response, next: NextFunction) => {
			let params = route.getParams(req);
			let promise;
			promise = this[route.action](...params);

			if (this.populates) {
				this.populates.map(populate => {
					if (route.method !== 'post'){
						promise.populate(populate);
					}
				});
			}

			return promise.then(
				(results: T | T[] | void) => {
					return results ? res.status(200).send(results) : next(new Error({code: ErrorCode.NOT_FOUND}));
				},
				err => next(err)
			);
		}
	};
}
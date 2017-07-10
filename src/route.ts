import { Router, Request, Response, NextFunction } from 'express';
import { Connection } from 'mongoose';
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
		return this.params.map((param: Param) => param.get(req));
	}
}

export class Route<T> {
	public routes: RouteRegistration[];

	constructor(private path: string, private router: Router, protected connection?: Connection) {
		this.routes = [];
		this.registerRoutes();
		this.registerMiddleware();
	}

	private registerMiddleware() {
		this.routes.map(route => {
			let path = this.path + route.path;
			console.log(`> Registrando rota (${route.method}): ${path}`);
			this.router[route.method](path, this[route.method](route));
		});
	}

	protected registerRoutes(){};

	private get(route: RouteRegistration) {
		return (req: Request, res: Response, next: NextFunction) => {
			let params = route.getParams(req);
			let action = this[route.action];

			let promise: Promise<T|T[]>;
			promise = this[route.action](...params);

			return promise.then(
				(results: T|T[]) => results ? res.send(results) : new Error(ErrorCode.NOT_FOUND),
				err => next(err)
			);
		}
	};


	private post = (req: Request, res: Response, next: NextFunction) => {
		next(new Error());
	};


	private delete = (req: Request, res: Response, next: NextFunction) => {
		next(new Error());
	};

	private put = (req: Request, res: Response, next: NextFunction) => {
		next(new Error());
	}

}
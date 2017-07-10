import { Router, Request, Response, NextFunction } from 'express';
import { Connection } from 'mongoose';
import { Error, ErrorCode } from './error';

export class Route {
	constructor(
		public path: string, 
		public method: string, 
		public action: any,
		public params?: string[]
	) {};

	public useParams(): boolean {
		let regex: RegExp = /:\w+/g;

		if (!this.path) {
			return false;
		}

		let params = this.path.match(regex);
		if (!params || params.length < 1) {
			return false;
		}

		return true;
	}
}

export class Controller<T> {
	public routes: Route[];

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

	private get(route: Route) {
		return (req: Request, res: Response, next: NextFunction) => {
			let params = route.useParams();
			let promise: Promise<T|T[]>;
			if (params) {
				promise = this[route.action](req.params, req.query);
			} else {
				promise = this[route.action](req.query);
			}

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
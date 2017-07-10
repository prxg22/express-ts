import { Request, Response, NextFunction } from 'express';
import { Entity } from './entity';

export enum ErrorCode {
	NOT_FOUND = 404,
	SERVER_ERR = 500
}

export class Error{
	public code: ErrorCode;
	public message;
	public id?: any;

	constructor (obj?) {
		if(obj && (obj.message || obj.code)) {
			this.message = obj.message ? obj.message : undefined;

			if (obj.code){
				this.code = obj.code in ErrorCode ? obj.code : undefined;
				if (!this.code) {
					this.id = obj.code;
				}
			}
		}

		if (this.code === ErrorCode.NOT_FOUND && !this.message) {
			this.message = 'Objeto não encontrado'
		} 

		if (!this.message) {
			this.message = 'Erro no servidor!';
		} 

		if (!this.code) {
			this.code = ErrorCode.SERVER_ERR;
		}
	}
}

export class ErrorHandler {
	public error(err: any, req: Request, res: Response, next: NextFunction) {
		err = new Error(err);
		res.status(err.code).send(<Error> err);
	}
}
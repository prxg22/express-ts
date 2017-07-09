import { Request, Response, NextFunction } from 'express';

export enum ErrorCode {
	NOT_FOUND = 404,
	SERVER_ERR = 500
}

export class Error {
	constructor (public code: ErrorCode = ErrorCode.SERVER_ERR, public message: string = '') {
		if (this.code === ErrorCode.NOT_FOUND && !this.message) {
			this.message = 'Página não encontrada'
		} else if (!this.message) {
			this.message = 'Erro no servidor!';
		}
	}
}

export class ErrorHandler {
	public error(err: any, req: Request, res: Response, next: NextFunction) {
		console.log(err);
		res.send(err);
	}
}
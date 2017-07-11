export class Entity {
	public __id: string;

	constructor(objeto?) {
		if (objeto._id) {
			this.__id = objeto._id;
		}

		if (typeof objeto === 'object'){
			(<any>Object).assign(this, objeto);
		}
	}
}

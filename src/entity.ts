export class Entity {
	constructor(objeto?) {
		if (typeof objeto === 'object'){
			(<any>Object).assign(this, objeto);
		}
	}
}

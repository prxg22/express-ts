export class Entity {
  constructor(objeto?) {
    (<any>Object).assign(this, objeto);
  }
}

import { AbstractModel } from './Abstract.model';

export class ArchivoTipoModel extends AbstractModel {
    public codigo: string = "";
    public nombre: string = "";

    constructor() { super() }
}

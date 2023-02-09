import { AbstractModel } from './Abstract.model';
import { CampoModel } from './Campo.model';

export class CategoriaModel extends AbstractModel {
    public codigo: string = "";
    public nombre: string = "";
    public campos: CampoModel[] = [];

    constructor() { super() }
}

import { AbstractModel } from './Abstract.model';
import { CampoModel } from './Campo.model';

export class InformacionModel extends AbstractModel {
    public valor: string = "";
    public campo: CampoModel;

    constructor() { super() }
}

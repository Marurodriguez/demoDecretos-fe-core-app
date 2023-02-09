import { AbstractModel } from './Abstract.model';
import { CampoTipoModel } from './CampoTipo.model';

export class CampoModel extends AbstractModel {
    public codigo: string = "";
    public nombre: string = "";
    public buscable: boolean = true;
    public visible_tabla: boolean = true;
    public campo_tipo: CampoTipoModel;

constructor() { super() }
}

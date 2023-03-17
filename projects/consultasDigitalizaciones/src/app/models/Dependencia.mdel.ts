import { AbstractModel } from "./Abstract.model";

/**
 * Guarda la información de la dependencia iniciadora del expediente o documento
 */
export class DependenciaModel extends AbstractModel {
    public id: number = 0;
    public nombre: string = "";
    public codigo: string = "";

    constructor() {
        super();
    }
}

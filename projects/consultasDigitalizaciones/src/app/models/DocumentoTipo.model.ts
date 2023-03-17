import { AbstractModel } from "./Abstract.model";

/**
 * Guarda la información del tipo de documento
 */
export class DocumentoTipoModel extends AbstractModel {
    public id: number = 0;
    public nombre: string = "";
    public codigo: string = "";

    constructor() {
        super();
    }
}

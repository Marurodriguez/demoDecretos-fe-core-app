import { SafeUrl } from '@angular/platform-browser';
import { AbstractModel } from './Abstract.model';
import { ArchivoTipoModel } from './ArchivoTipo.model';
import { OcrtextoModel } from './Ocrtexto.model';

export class ArchivoModel extends AbstractModel {
    public uuid: string = "";
    public orden: number = 0;
    /* 
        Enlace al uuid de la imagen grande o si es una imagen grande enlaza a la imagen preview
    */
    public uuidAlternativo: string = "";
    public extension: string = "";

    constructor() { super() }
}

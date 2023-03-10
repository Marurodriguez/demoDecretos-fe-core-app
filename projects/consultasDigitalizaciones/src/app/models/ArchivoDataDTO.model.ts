import { SafeUrl } from '@angular/platform-browser';
import { AbstractModel } from './Abstract.model';
import { ArchivoTipoModel } from './ArchivoTipo.model';
import { OcrtextoModel } from './Ocrtexto.model';

export class ArchivoDataDTOModel extends AbstractModel {

    public data: String = "";
    public fileSize: number = 0;

    constructor() { super() }
}

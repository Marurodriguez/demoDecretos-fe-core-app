import { SafeUrl } from '@angular/platform-browser';
import { AbstractModel } from './Abstract.model';
import { ArchivoTipoModel } from './ArchivoTipo.model';
import { OcrtextoModel } from './Ocrtexto.model';

export class ArchivoModel extends AbstractModel {
    public uuid: string = "";
    public id_archivo_tipo: number = 0;
    public extension: string = "";
    public peso_kb: number = 0;
    public archivo_desc: string;
    public preview_desc: string;
    public archivo_tipo: ArchivoTipoModel;
    public ocrtexto: OcrtextoModel;
    public santizeUrl;

    constructor() { super() }
}

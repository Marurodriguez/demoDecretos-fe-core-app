import { DependenciaModel } from "./Dependencia.mdel";
import { DocumentoTipoModel } from "./DocumentoTipo.model";

export class DocumentosPaginateFiltrosModel {
    public documentoTipos: DocumentoTipoModel[];
    public dependencias: DependenciaModel[];
}

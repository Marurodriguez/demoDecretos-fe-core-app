import { AbstractModel } from './Abstract.model';
import { ArchivoModel } from './Archivo.model';
import { ArchivoDataDTOModel } from './ArchivoDataDTO.model';
import { DependenciaModel } from './Dependencia.mdel';
import { DocumentoTipoModel } from './DocumentoTipo.model';

export class ArchivoDTOModel extends AbstractModel {

  public archivo: ArchivoModel = new ArchivoModel();
  public archivoDataDTO: ArchivoDataDTOModel = new ArchivoDataDTOModel();

  constructor() { super() }
}

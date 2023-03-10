import { AbstractModel } from './Abstract.model';
import { DependenciaModel } from './Dependencia.mdel';
import { DocumentoTipoModel } from './DocumentoTipo.model';

export class DocumentoModel extends AbstractModel {
  public prefijo: Number = 0;
  public numeroExpediente: Number = 0;
  public anio: Number = 0;
  public caratula: String = "";
  public dependencia: DependenciaModel = new DependenciaModel();
  public documentoTipo: DocumentoTipoModel = new DocumentoTipoModel();
  public matricula: number = 0;
  public cantImagenes: number = 0;
  
  

 

  constructor() { super() }
}

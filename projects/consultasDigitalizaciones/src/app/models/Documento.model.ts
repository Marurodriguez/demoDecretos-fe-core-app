import { AbstractModel } from './Abstract.model';
import { CategoriaModel } from './Categoria.model';
import { InformacionModel } from './Informacion.model';
import { ArchivoModel } from './Archivo.model';
import { DependenciaModel } from './Dependencia.mdel';

export class DocumentoModel extends AbstractModel {
  public prefijo: Number = 0;
  public numeroExpediente: Number = 0;
  public anio: Number = 0;
  public caratula: String = "";
  public dependencia: DependenciaModel = new DependenciaModel();
  public matricula: number = 0;
  public cantImagenes: number = 0;
  
 

  constructor() { super() }
}

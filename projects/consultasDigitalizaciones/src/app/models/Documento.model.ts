import { AbstractModel } from './Abstract.model';
import { CategoriaModel } from './Categoria.model';
import { InformacionModel } from './Informacion.model';
import { ArchivoModel } from './Archivo.model';

export class DocumentoModel extends AbstractModel {
  public prefijo: Number = 0;
  public numero_expediente: Number = 0;
  public anio: Number = 0;
  public caratula: String = "";
  public dependencia_iniciadora: String = "";
  public ocr_texto_desc: String;
  public imagenes_page: Number = 0;
  public imagenes_page_ant: Number = 0;

  public categoria: CategoriaModel;
  public informacion: InformacionModel[] = [];
  public archivos: ArchivoModel[] = [];
  public pdf: ArchivoModel;

  constructor() { super() }
}

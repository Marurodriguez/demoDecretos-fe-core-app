import { ColumnModel } from "./Column.model";

/**
 * Es un modelo para el Paginate del Spring boot.
 * Los datos se encuentran en Content.
 */
export class ManagerListadoDataModel{
  public pageNumber: number = 0;
  public pageSize: number = 10;
  public isLoading: boolean = false;  //True => Si ya fue hecha una petición y se está esperando respuesta.
  public loaded: boolean = false; //TRUE-> SI FUERON CARGADOS DATOS ALGUNA VEZ.
  public data: any;
  public rows: any[] = [];
  public cols: ColumnModel[] = [];
}

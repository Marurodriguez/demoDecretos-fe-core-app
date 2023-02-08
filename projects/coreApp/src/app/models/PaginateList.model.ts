import { forEach } from 'core-js/core/array';
import { PaginateOrderModel } from './PaginateOrder.model';
import { PaginateParametersModel } from './PaginateParameters.model';
/**
 * Es un modelo para enviar a un recurso con paginate
 *
 */
export class PaginateListModel {
  public page: number = 0;
  public size: number = 10;

  public paginateParametersList: PaginateParametersModel[] = [];
  public orderFieldsList: PaginateOrderModel[] = [];

  constructor(parPage: number, parSize: number){
    this.page = parPage;
    this.size = parSize;
  }

  /**
   * Elimina todos los parametros
   */
  public clearParameters():boolean {
    try {
      this.paginateParametersList = [];
      return true;
    }catch(ex){
      return false;
    }
  }
  /**
   * Elimina todos los orderFields
   */
   public clearOrderFields():boolean {
    try {
      this.orderFieldsList = [];
      return true;
    }catch(ex){
      return false;
    }
  }

  public addParameter(parFieldName: string, parValue: string, parOperation: string = '=', parFieldType?: string){
    const parameter: PaginateParametersModel = new PaginateParametersModel(parFieldName,parValue,parOperation, parFieldType);
    //Busca el parametro, si es igual, lo reemplaza
    for(let par of this.paginateParametersList){
      if(par.name === parFieldName){
        par.operation = parOperation;
        par.value = parValue;
        return; //Existe
      }
    }

    //No existe: Agregar
    this.paginateParametersList.push(parameter);
  }
  public addOrderField(parFieldName: string, parOrderType: string = 'asc'){
    const orderField: PaginateOrderModel = new PaginateOrderModel(parFieldName,parOrderType);
    this.orderFieldsList.push(orderField);
  }
}

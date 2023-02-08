
import { ApplicationRef, ChangeDetectorRef, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { DataService } from './data.services';
import { PaginateListModel } from '../models/PaginateList.model';
import { PaginateDataModel } from '../models/PaginateData.model';
import { ColumnModel } from '../models/Column.model';
import { FunctionService } from './function.services';
import { ManagerListadoDataModel } from '../models/ManagerListadoData.model';
import { SmListadoComponent } from '../shared/components/sm-listado/listado-component/sm-listado.component';
// import { RowDetailInterface } from '../shared/components/sm-listado/listado-component/row-DetailParent.component';

export declare interface ListadoComponentInterface {

  // Operaciones ABM
  delete(row: any): boolean;
  create(): boolean;
  view(row: any): boolean;

  // Validaciones
  askDelete(row: any): boolean;
  canDelete(row: any): boolean;
  canView(row: any): boolean;
  canCreate(): boolean;

  // Operaciones del listado
  refresh(): boolean;
  getTotalRows(data: any): number;
  setPage(pageNumber: number);

  ngOnInit(): void;
  initCols(): boolean;
  getValueFromCol(col: ColumnModel, row: any): any;

  refreshComponent(): void //Refresca la pantalla
}


export class ManagerListadoOptions {

  public delegateDelete       : boolean = false;
  public delegateCreate       : boolean = false;
  public delegateView         : boolean = false;
  public delegateAskDelete    : boolean = false;
  public delegateCanDelete    : boolean = false;
  public delegateCanView      : boolean = false;
  public delegateCanCreate    : boolean = false;
  public delegateRefresh      : boolean = false;
  public delegateGetTotalRows : boolean = false;
  public delegateSetPage      : boolean = false;
  public delegateResponseError: boolean = false;
  public delegateResponseOk   : boolean = false;
  public delegateNgOnInit     : boolean = false;
  public allowRefreshComponent: boolean = true;
  public objDelegate: any;

  public wsUrlDelete: any;
  public wsUrlPaginate: number;
  public wsParameterName: string = 'uuid';
  public wsPaginate: PaginateListModel = new PaginateListModel(0,10);

  //Para que el usuario pueda cambiarla
  public wsPaginateOptions: PaginateListModel = new PaginateListModel(0,10);

  public urlResource: string = "entidad"
  public urlCreate: string = "%entidad%/create"; //Se concatena urlResource + '/' + urlCreate
  public urlView: string = "%urlResource%/%operation%/%parameterName%";
  public urlParameterName: string = "uuid";

  public allowCreate: boolean = true;
  public allowDelete: boolean = true;
  public allowView  : boolean = true;

  public showTotal: boolean = true; //Muestra el total de elementos en la parte inferior
  public showPaginate: boolean = true;  // Muestra el control de paginado



  public sortBy: any;


  public allowLogError: boolean = true;
  public allowLogInfo: boolean = false;
}


@Injectable()
export class ManagerListadoService implements ListadoComponentInterface{
  public listadoComponent     : SmListadoComponent;

  public options: ManagerListadoOptions = new ManagerListadoOptions();
  public data: ManagerListadoDataModel;

  constructor(public router: Router, public dataService: DataService,
    public cd: ApplicationRef, public functionService: FunctionService) {

  }

/**************************************************************************************************
*
*                                 OPERACIONES PRINCIPALES
*
*                            DELETE, CREATE, VIEW, REFRESH, SETPAGE, NgOnInit
*
**************************************************************************************************/

  /**
   * Inicializa el objeto
   */
  ngOnInit(): void {
    this.printInfo("ngOnInit", "Comienzo"); //Log
    if (this.options.delegateNgOnInit && this.options.objDelegate != undefined) {
      this.printInfo("ngOnInit", "DelegatenNOnInit"); //Log
      return this.options.objDelegate.ngOnInit();
    }
  }

  /**
   * Obtiene el control, para enviarle parametros directamente al componente
   */
  public updateListadoComponent(lst: SmListadoComponent){
    this.listadoComponent = lst;
    this.printInfo("updateListadoComponent","Se agrego el SMListadoComponent",lst);
  }

  /**
   * Actualiza el control que se va a ver en el ROWDETAIL
   */
  public addRowDetailComponent(rowDetailComponent: any){
    if(this.listadoComponent == undefined || this.listadoComponent == null) {
      return false;
    }
    this.listadoComponent.addRowDetailComponent(rowDetailComponent);
    this.printInfo("addRowDetailComponent","Se agrego el rowDetailComponent",rowDetailComponent);
  }

  /**
   * Resetea la información.
   */
  public reset(): void {
    this.options = new ManagerListadoOptions();
    this.data = new ManagerListadoDataModel();
  }

  /**
  * Elimina el registro
  * @param row
  */
  public delete(row): boolean {
    this.printInfo("delete","Comienzo", row); //Log
    if (this.canDelete(row) != true) {
      this.printInfo("delete", "canDelete = false", row); //Log
      return false;
    }
    //Delegate!
    if (this.options.delegateDelete && this.options.objDelegate != undefined) {
      this.printInfo("delete", "DelegateDelete", row); //Log
      return this.options.objDelegate.delete(row);
    }
    try {

      let parameters = { "%name%": "%value%" };
      parameters = JSON.parse(parameters.toString().replace("%name%", this.options.wsParameterName).replace("%value%", row[this.options.wsParameterName]));
      this.printInfo("delete", "parameters", row, parameters); //Log

      this.dataService.httpFunction(this.options.wsUrlDelete, this, {}, parameters);
      return true;

    }catch(ex) {
      this.printError("delete",undefined,row,ex);
      return false;
    }


  }

  /**
  * Va a la url del CREATE
  */
  public create(): boolean {
    this.printInfo("create", "Comienzo"); //Log
    if (this.canCreate() != true) {
      this.printInfo("create", "canCreate == false"); //Log
      return false;
    }
    //Delegate!
    if (this.options.delegateCreate && this.options.objDelegate != undefined) {
      this.printInfo("create", "delegateCreate"); //Log
      return this.options.objDelegate.create();
    }
    try {

      const url = this.resolveUrl("create",undefined);
      this.printInfo("create", "url", url); //Log
      this.router.navigate([url]);


    } catch (ex) {
      this.printError("create",undefined,ex);
      return false;
    }

    return true;
  }

  /**
  * Va a la url del view
  */
  public view(row: any): boolean {
    this.printInfo("view", "Comienzo", row); //Log
    if (this.canView(row) != true) {
      this.printInfo("view", "canView() == false", row); //Log
      return false;
    }
    //Delegate!
    if (this.options.delegateView && this.options.objDelegate != undefined) {
      this.printInfo("view", "delegateView", row); //Log
      return this.options.objDelegate.view(row);
    }
    try {

      const url = this.resolveUrl("view", row);
      this.printInfo("view", "url", row, url); //Log
      this.router.navigate([url]);

    } catch (ex) {
      this.printError("view", undefined, ex);
      return false;
    }

    return true;
  }


  /**
* Va a la url del view
*/
  public refresh(): boolean {
    this.printInfo("refresh", "Comienzo"); //Log
    if (this.data.isLoading == true) {  //Ya hay una petición de refresh y se está esperando
      this.printInfo("refresh", "isLoading == true"); //Log
      return false;
    }
    //Delegate!
    if (this.options.delegateRefresh && this.options.objDelegate != undefined) {
      this.printInfo("refresh", "delegateRefresh == true"); //Log
      return this.options.objDelegate.refresh();
    }
    try {
      // Hacer una copia del paginate
      this.options.wsPaginate = JSON.parse(JSON.stringify(this.options.wsPaginateOptions));

      if( this.options.wsPaginate.page == -1) {
        this.options.wsPaginate.page =  this.data.pageNumber;
      }else {
        this.options.wsPaginate.page = this.data.pageNumber-1;
      }
      if(this.options.wsPaginate.page < 0 ) {
        this.options.wsPaginate.page = 0;
      }
      this.options.wsPaginate.size = this.data.pageSize;
      //Agregar los filtros! --->

      // <----
      if(this.options.wsPaginate.page < 0) {
        this.options.wsPaginate.page = 0;
      }
      this.printInfo("refresh", "httpFunction", this.options.wsUrlPaginate, this.options.wsPaginate); //Log
      this.dataService.httpFunction(this.options.wsUrlPaginate, this, this.options.wsPaginate, '');
      this.data.isLoading = true;

    } catch (ex) {
      this.printError("refresh", undefined, ex);
      this.data.isLoading = false;
      return false;
    }

    return true;
  }

  /**
   * Setea la página seleccionada por el usuario y actualiza
   * @param page
   */
  setPage(page) {
    this.printInfo("setPage", "Comienzo", page); //Log
    this.data.pageNumber = page;
    this.refresh();
  }

  /**
   * Get Page Number
   */
  public getPageNumber(): number {
    try {
      return this.data.pageNumber;
    }catch(ex){
      return 0;
    }
  }

/**************************************************************************************************
*
*                                     VALIDACIONES
*
*                        ASKDELETE, CANVIEW, CANCREATE, CANDELETE
*
**************************************************************************************************/



  /**
  * Pregunta si se va a realizar el eliminado del registro
  * @param row
  */
  askDelete(row): boolean {
    if(this.options.delegateAskDelete && this.options.objDelegate != undefined) {
      return this.options.objDelegate.askDelete(row);
    }

    try {

      swal.fire({
        title: 'Se va a eliminar el registro',
        text: '¿Está usted seguro que desea realizar la operación?. Esta Operación no podrá deshacerse.',
        icon: "question",
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.value == true) {
          this.delete(row);
        } else {
          return false;
        }
      });

    } catch (ex) {
      this.printError("askDelete", undefined, ex);
      return false;
    }

    return false;
  }


  /**
   * Las reglas de control deben estar en capas inferiores. Valida si puede dirigirse a la
   * subpagina de create.
   */
  public canCreate(): boolean {
    if (this.options.delegateCanCreate && this.options.objDelegate != undefined) {
      return this.options.objDelegate.canCreate();
    }
    if (this.options.allowCreate == true) {
      return true;
    }else{
      return false;
    }
  }

  /**
   * Las reglas de control deben estar en capas inferiores. Valida si puede dirigirse a la
   * subpagina de view.
   */
  public canView(row: any): boolean {
    if (this.options.delegateCanView && this.options.objDelegate != undefined) {
      return this.options.objDelegate.canView(row);
    }
    if (this.options.allowView == true) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Permite saber si puede expandirse
   */
  public canExpand(row): boolean {
    return false; // TODO!!!
  }
  /**
   * Las reglas de control deben estar en capas inferiores. Valida si el registro puede eliminarse.
   * @param row
   */
  public canDelete(row): boolean {
    if (this.options.delegateCanDelete && this.options.objDelegate != undefined) {
      return this.options.objDelegate.canDelete(row);
    }
    if(row!=undefined){
      if(this.options.allowDelete == true) {
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }



/**************************************************************************************************
*
*                                     WS RESPONSE
*
*
**************************************************************************************************/

  responseOk(httpOperation: string, http: string, data: PaginateDataModel, ws: any) {
    //Procesar-Data
    this.printInfo("responseOk", "Comienzo", httpOperation, data); //Log
    if (this.options.delegateResponseOk && this.options.objDelegate != undefined) {
      this.data.isLoading = false;
      this.refreshComponent();
      return this.options.objDelegate.responseOk(httpOperation,http, data, ws);
    }

    switch (ws.enumUrl) {
      case this.options.wsUrlPaginate:
        this.data.data = data;
        this.data.rows = [];
        //para actualizarlo
        this.data.rows = data.content;


        //this.data.rows = data.content;
        this.data.loaded = true;
        this.refreshComponent();
      break;
      case this.options.wsUrlDelete:
        this.refresh();
        const titleMsg = "Se ha eliminado correctamente el registro";
        swal.fire({
          title: titleMsg,
          icon: "success",
          customClass: {
            confirmButton: 'btn btn-danger'
          },
          buttonsStyling: false,
        });
      break;
    }
    this.data.isLoading = false;
    this.data.loaded = true;
    this.refreshComponent();
  }

  responseError(urlResource: string, httpOperation: string, data: any, ws?: any) {
    this.data.isLoading = false;
    this.refreshComponent();
    this.printError("responseError", urlResource + '-' + httpOperation, data,ws);
    this.data.loaded = true;

    if (this.options.delegateResponseError && this.options.objDelegate != undefined) {
      return this.options.objDelegate.responseError(urlResource, httpOperation, data, ws);
    }

    swal.fire({
      title: 'Error',
      text: 'Ha ocurrido un error al intentar realizar la operación',
      icon: "warning",
      customClass: {
        confirmButton: 'btn btn-primary'
      },
      buttonsStyling: false,
    });

  }









/**************************************************************************************************
*
*                                     OTRAS FUNCIONES
*
*
*
**************************************************************************************************/

  /**
   * Devuelve el total de elementos para el paginador
   */
  public getTotalElements(): number {

    if( this.data.data == undefined || this.data.data.totalElements == undefined ) {
      return 0;
    }

    try {
      return this.data.data.totalElements;
    }catch( ex ) {
      return 0;
    }
  }

  /**
   * Devuelve el pageSize de elementos para el paginador
   */
  public getPageSize(): number {

    if (this.data.data == undefined || this.data.data.size == undefined) {
      return 0;
    }

    try {
      return this.data.data.size;
    } catch (ex) {
      return 0;
    }
  }

  /**
   * Le envía una señal para que refresque el componente
   */
  public refreshComponent():void {
    try {
      if (this.options.objDelegate == undefined || this.options.allowRefreshComponent == false) {
        return;
      }

      this.options.objDelegate.refreshComponent();

    }catch(ex) {
      return;
    }

  }


  /**
  * Evento que se ejecuta cuando cambia el orden de las columnas a ordenar
  */
  sortChange(event: any) {

  }




  /**
   * Permite obtener valores genericos de las columnas, según su tipo.
   */
  getValueFromCol(col: ColumnModel, row: any) {
    if(col == undefined || row == undefined ) {
      return "";
    }

    try {

      let value = this.functionService.getValueFromObject(row,col.prop);

      switch(col.type) {
        case "string":
          return value;
        case "number":
          return this.functionService.formatNumber(value);
        case "money":
          return this.functionService.formatMoney(value);
        default:
          this.printError("getValueFromCol","No existe el tipo: " + col.type, col, row);
          return "";
      }
    }catch(ex) {
      this.printError("getValueFromCol",col.prop,row,ex);
      return "";
    }
  }
  /**
   * Obtiene el valor total de la lista de carta documento
   */
  public getTotalRows(): number {
    try {

      if (this.data.data == undefined || this.data.data.totalElements == undefined) {
        return 0;
      } else {
        return this.data.data.totalElements;
      }

    } catch (ex) {
      this.printError("getTotalRows",undefined,ex);
      return 0;
    }
  }


  resolveUrl(operation: string, row: any) {
    try {
      let url: string = "";
      switch (operation.toLowerCase()) {
        case "view":
          url = this.options.urlView;
          break;
        case "create":
          url = this.options.urlCreate;
          break;
      }
      //"%urlResource%/%operation%/%parameterName%"
      url = url.replace("%urlResource%", this.options.urlResource);
      url = url.replace("%operation%", operation);
      if(row) {
        url = url.replace("%parameterName%", row[this.options.urlParameterName]);
      }
      return url;
    } catch (ex) {
      this.printError("resolveUrl",undefined, ex);
      return "";
    }

  }


  /**
   * Inicializa las columnas que se van a mostrar
   */
  initCols(): boolean {
    this.printInfo("initCols", "Comienzo");
    this.data.cols = [];
    return true;
  }


  /**
   * Permite agregar una columna a la lista
   */
  addCol(col: ColumnModel): number {
    try {

      this.data.cols.push(col);
      this.printInfo("addCol", undefined,col,this.data.cols);
      return 1;
    } catch (ex) {
      this.printError("addCol", undefined, ex);
      return 0;
    }
  }


  /**
   * Muestra un console Print con el error de las funciones.
   * @param functionName
   * @param obs
   * @param value1
   * @param value2
   */
  printError(functionName: string, obs?: string, value1?: any, value2?: any){
    if(this.options.allowLogError == false) {
      return false;
    }
    const title: string = "manager-listado-" + functionName;
    console.error(title,obs, value1,value2);
  }

  printInfo(functionName: string, obs?: string, value1?: any, value2?: any) {
    if (this.options.allowLogInfo == false) {
      return false;
    }
    const title: string = "manager-listado-" + functionName;
    console.log(title, obs, value1, value2);
  }
}


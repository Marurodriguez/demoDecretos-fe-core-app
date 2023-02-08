
import { ApplicationRef, ChangeDetectorRef, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { DataService } from './data.services';
import { PaginateListModel } from '../models/PaginateList.model';
import { PaginateDataModel } from '../models/PaginateData.model';
import { ColumnModel } from '../models/Column.model';
import { FunctionService } from './function.services';


export enum AbmOperation {
  Create = 'create',
  Edit = 'edit',
  View = 'view',
}

export enum typeObjectManager {
  Input = 'input',
  SmSelect = 'sm-select'
}


export class OptionsAbm {
  public operation: AbmOperation = AbmOperation.Create;
  public id: any = ''; // Es el id del objeto. Puede ser númerico si es un id o string si es un uuid
  public entidad: any; // Guarda la información de la entidad.
  public loaded: boolean = false; // Si loaded = false->Aún no cargo los datos de la entidad.
  public titulo: string = '';

  public wsUrlCreate: any;  //URL enumWS.[] para crear el objeto (operation == create)
  public wsUrlUpdate: any; //URL enumWS.[] para editar el objeto (operation == edit)
  public wsUrlLoad: any;   //URL enumWS.[] para cargar el objeto (operation == view o edit)
  public wsParameterName: string = "uuid"; //Reemplaza en el urlLoad el parametro.

  public urlBack: string = "/listado/" //URL DEL LISTADO this.router.navigate([URLBACK]);
  public urlSaveOk: string = "listado" //URL CUANDO GUARDE CORRECTAMENTE.

  public objDelegate: any;
  public allowLogError: boolean = true;
  public allowLogInfo: boolean = false;


  //delegates:
  public delegateNgOnInit: boolean = false;
  public delegateNgAfterViewInit: boolean = false;
}


export class AbmObject {
  public row: number = 0;
  public name: string  = '';
  public label: string = '';
  public type: typeObjectManager = typeObjectManager.Input;

  public entityField: string = '';
  public htmlClass: string = '';
  public htmlStyle: string = '';
  public colHtmlClass: string = 'col-12';
  public disabled: boolean = false;

  public optSmSelect: any;  //Para el objeto sm-select;
}

export class DataAbm {
  public rows: any[][] = [[]]; //rows de AbmObject
  public rowMax: number = 0;
}

export declare interface ABMCmponentInterface {


  setOperation(operation: AbmOperation): void; //Define los cambios de estado

  validate(): boolean;              //Retorna true si todos los controles están validados.
  save(): boolean;                 // Guarda la entidad
  load(): boolean;                // Carga la entidad
  getParametrosInit(data: any): boolean  // Obtiene los parametros de inicio
  back(): boolean;              // Retorna a la pantalla anterior
  getTitle(): string;           // Obtiene el titulo de la descripción.
  responseOk(httpOperation: string, http: string, data: any, ws: any);
  responseError(urlResource: string, httpOperation: string, data: any, ws?: any);
  reload(): boolean // Fuerza la recarga de la página

  refreshComponent(): void //Refresca la pantalla
}


@Injectable()
export class ManagerABMService{
  public options: OptionsAbm = new OptionsAbm();
  public data: DataAbm = new DataAbm();



  constructor(public router: Router,public route: ActivatedRoute, public dataService: DataService,
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
   * Obtiene los parametros de carga de la página
   * @param data
   */
  getParametrosInit(data: any): boolean {
    this.printInfo("getParametrosInit", "Comienzo",data); //Log
    if (!data || !data.operation) {
      return false;
    }

    let operation: AbmOperation = AbmOperation.Create;
    let id: string = '';

    this.options.operation = data.operation;
    switch (data.operation.toLowerCase()) {
      case 'create':
        operation = AbmOperation.Create;
        id = '';
        break;
      case 'edit':
        operation = AbmOperation.Edit;
        id = this.route.snapshot.paramMap.get('id');
        break;
      case 'view':
        operation = AbmOperation.View;
        id  = this.route.snapshot.paramMap.get('id');
        break;
    }
    this.setOperation(operation,id);
  }


  /**
   * Setea la operación que se va a realizar en el abm.
   * @param operation Operación asignada
   * @param id o uuid
   */
  setOperation(operation: AbmOperation, id: any): void {
    this.printInfo("setOperation", "operation",operation,id); //Log
    this.options.operation = operation;
    this.options.id = id;
  }

  /**
   * Inicializa el control
   */
  public init(): void {
    this.printInfo("init", "Comienzo"); //Log
    this.options = new OptionsAbm();
    this.data = new DataAbm();
  }


  /**
   * Agrega un componente al form
   * @param component Objeto
   */
  addObject(component: AbmObject) {
    this.printInfo("addObject", "component",component); //Log

    for(let x = 0; x<=component.row; x++) {
      if(this.data.rows[x] == undefined) {
        this.data.rows[x] = [];
        this.printInfo("addObject", "creando data.rows[" + x + "]",this.data.rows[x]); //Log
      }
    }
    this.data.rows[component.row].push(component);



    if(this.data.rowMax < component.row) {
      this.data.rowMax = component.row;
    }
  }

  /**
   * Inicializa el objeto
   */
  ngAfterViewInit(): void {
    this.printInfo("ngAfterViewInit", "Comienzo"); //Log
    if (this.options.delegateNgAfterViewInit && this.options.objDelegate != undefined) {
      this.printInfo("ngAfterViewInit", "DelegatenNOnInit"); //Log
      return this.options.objDelegate.ngAfterViewInit();
    }

  }

  getRowsMax(): number {
    return this.data.rowMax;
  }
  getRows(): any {
    return this.data.rows;
  }

/**************************************************************************************************
*
*                                           OTRAS FUNCIONES
*
*
**************************************************************************************************/
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
    const title: string = "manager-abm-" + functionName;
    console.log(title, obs, value1, value2);
  }
}


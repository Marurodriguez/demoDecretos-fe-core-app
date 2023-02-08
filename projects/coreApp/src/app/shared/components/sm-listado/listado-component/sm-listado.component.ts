import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, Output, ViewEncapsulation, ViewChild, AfterContentChecked, AfterContentInit, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';
import swal from 'sweetalert2';
import {
  ColumnMode,
  DatatableComponent,
  SelectionType
} from '@swimlane/ngx-datatable';

import { ListadoComponentInterface, ManagerListadoService } from '../../../../services/manager-listado.service';
import { ColumnModel } from '../../../../models/Column.model';
import { PaginateDataModel } from '../../../../models/PaginateData.model';
import { RowDetailDirective } from './row-detail.directive';
import { RowDetailParentComponent } from './row-DetailParent.component';


@Component({
  selector: 'sm-listado',
  templateUrl: './sm-listado.component.html',
  styleUrls: ['./sm-listado.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class SmListadoComponent implements ListadoComponentInterface  {
  @ViewChild('datatable') table: any;
  //@ViewChild(RowDetailDirective, {static: true}) rowDetail!: RowDetailDirective;
  @ViewChild('rowDetail') rowDetail: RowDetailDirective;

  rowDetailComponent: any;


  /************************************************************************************************************************
   * Inputs && Outputs && Properties
   *
   ************************************************************************************************************************/
  @Input() mls: ManagerListadoService;

  /************************************************************************************************************************
   * Variables
   *
   ************************************************************************************************************************/
  @ViewChild('tableResponsive') tableResponsive: any;

  /************************************************************************************************************************
   * Constructor && Implements
   *
   ************************************************************************************************************************/
  constructor(private cd: ChangeDetectorRef,
              public router: Router, public route: ActivatedRoute,
              ){

   }
  ngOnInit(): void {
    this.mls.ngOnInit();
    this.mls.initCols();
    this.mls.refresh();
  }

  initCols(): boolean {
    return this.mls.initCols();
  }

  public addRowDetailComponent(rowDetailComponent: RowDetailParentComponent){
    this.rowDetailComponent = rowDetailComponent;
  }


  /************************************************************************************************************************
   *
   * EVENTS NGX-DATATABLE
   *
   ************************************************************************************************************************/


  refreshComponent(): void {
    this.cd.markForCheck();
  }

   /**
    * Se ejecuta cuando se cambia la forma de ordenar columna
    * @param $event
    */
  sortChange(column){
    // console.error("sortChange: ", column);
    // this.columnSortBy = column;
    // this.sortBy = column.sorts;
  }


  create(): boolean {
    return this.mls.create();
  }


  canCreate(): boolean {
    return this.mls.canCreate();
  }


  canDelete(row: any): boolean {
    return this.mls.canDelete(row);
  }
  canExpand(row:any): boolean {
    return this.mls.canExpand(row);
  }

  canView(row: any): boolean {
    return this.mls.canView(row);
  }

  showPaginate(): boolean {
    try{
      return this.mls.options.showPaginate;
    }catch(ex){
      return false;
    }
  }
  showTotal(): boolean {
    try{
      return this.mls.options.showTotal;
    }catch(ex){
      return false;
    }
  }


  /**
     * Devuelve el valor según la columna
     * @param col
     * @param row
     */
  getValueFromCol(col: ColumnModel, row: any): any {
    return this.mls.getValueFromCol(col,row);
  }

  ngAfterViewChecked() {
    if(this.rowDetail == undefined) {

    }
  }
  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
    //Cargar el componente
    const viewContainerRef = this.rowDetail.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<RowDetailParentComponent>(this.rowDetailComponent.component);
    componentRef.instance.data = this.rowDetailComponent.data;
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }
  /************************************************************************************************************************
   * FUNCTIONS
   *
   ************************************************************************************************************************/

  setPage(page){
    this.mls.setPage(page);
  }

  /**
   * Se encarga de actualizar la página enviando la información de los datos al dataservice.
   */
  refresh(): boolean{
    return this.mls.refresh();
  }

  /**
   * Pregunta si se puede eliminar la Carta Documento
   * @param row
   */
  askDelete(row){
    return this.mls.askDelete(row);
  }


  /**
   * Elimina la Carta Documento
   * @param row
   */
  delete(row): boolean{
    if(row.estado != 0){
      return false;
    }
    return this.mls.delete(row);
  }

  view(row): boolean{
    return this.mls.view(row);
  }


  /**
   * Obtiene el valor total de la lista de carta documento
   */
  public getTotalRows(): number {
    return this.mls.getTotalRows();
  }


 /************************************************************************************************************************
  *
  * RESPONSE OK/ERROR
  *
  ************************************************************************************************************************/


  responseOk(httpOperation:string, http: string, data:PaginateDataModel, ws:any ){

  }

  responseError(urlResource: string,httpOperation: string, data: any, ws?: any){
    this.refreshComponent();
  }

}

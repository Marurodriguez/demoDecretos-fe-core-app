import { Observable, of } from "rxjs";
import { Component, forwardRef,   Input,   ElementRef,  ViewChild,  Output,  OnInit,  ChangeDetectorRef,  EventEmitter} from "@angular/core";
import { Router, Route, ActivatedRoute, ParamMap } from "@angular/router";
import { catchError, debounceTime, map, switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { NgSelectConfig } from "@ng-select/ng-select";
import { PaginateListModel } from '../../../models/PaginateList.model';
import { DataService } from '../../../services/data.services';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SmSelectComponent),
  multi: true
};

const noop = () => {
};

export class SmSelectOptions {
    public url: any = "";
    public paginateListModel: PaginateListModel = new PaginateListModel(0,25);
    public resultSizeMin: number = 10; //defecto 10
    public resultSizeMax: number = 25; //defecto 25
    public minTermLength: number = 2; //defecto 2
    public maxTermLength: number = 5; //defecto 5
    public letterPorc: number = 20; //defecto 20% (con 5 letras ya llega al maximo)
    public debounceTime: number = 200; //defecto 200
    public name: string = "sm-select"; //default sm-select
    public debug: boolean = false; //defecto false
    public searchable: boolean = false; //defecto false -> Si es true tiene que haber items
    public items: any[] = []; // defecto [] Searchable debe ser false para sear leaido
    public bindLabel: string = "nombre";
    public bindValue: string = "id";
    public objectParent: any = undefined; //ES EL OBJETO PADRE, PARA ENLAZAR POR SI NO SE QUIERE UTILIZAR EVENTOS.

    public itemsTop:any=undefined;
}


@Component({
  selector: "sm-select",
  templateUrl: "./sm-select.component.html",
  styleUrls: ["./sm-select.component.scss"],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})

export class SmSelectComponent implements OnInit, ControlValueAccessor {
  @Input() options: SmSelectOptions;
  @Input() disabled: boolean = false;
  @Input() initValue: any;
  @Output() changeEvent: EventEmitter<any> = new EventEmitter;

  public idSelected: any;
  public objectSelected: any;
  public items = [];
  public typeahead = new EventEmitter<string>();

  public termAnt: string = "";
  public termActual: string = "";

  public debounceTime: number = 200;
  public name: string = 'sm-select';
  public debug: boolean = false;
  public url: any = '';
  public paginateListModel: PaginateListModel;
  public bindLabel: string = 'nombre';
  public bindValue: string = 'id';
  public searchable: boolean = false;
  public clearable: boolean = false;
  public letterPorc: number = 20; //defecto 20% (con 5 letras ya llega al maximo) DEPRECTAED
  public minTermLength: number = 2;
  public maxTermLength: number = 5;
  public resultSizeMin: number = 10;
  public resultSizeMax: number = 25;
  public objectParent: any = undefined; //ES EL OBJETO PADRE, PARA ENLAZAR POR SI NO SE QUIERE UTILIZAR EVENTOS.

  /* Estructura de Option:
  {
    "url": <string>,
    "paginateListModel": <PaginateListModel> **Remplaza el termino "{{term}}" por el valor buscado,
    "resultSizeMin": <number>, //defecto 10
    "resultSizeMax": <number>, //defecto 25
    "minTermLength": <number>, //defecto 2
    "maxTermLength": <number>, //defecto 5
    "letterPorc": <number>, //defecto 20% (con 5 letras ya llega al maximo)
    "debounceTime": <number>, //defecto 200
    "name": <string>, //default sm-select
    "debug": <boolean> //defecto false
    "searchable": <boolean> //defecto false -> Si es true tiene que haber items
    "items": [any] // defecto [] Searchable debe ser false para sear leaido
  }
  */


  /************************************************************************************************************************
   *
   * COMPONENT
   *
   ************************************************************************************************************************/

  constructor(
    public dataService: DataService, private cd: ChangeDetectorRef, private config: NgSelectConfig) {
    this.config.notFoundText = "Sin items";
    this.config.loadingText = "Buscando...";
    this.config.typeToSearchText = "Ingrese valores para buscar";

  }

  ngOnInit() {
    if(this.options) {
      if (this.options.debug && this.options.debug == true) {
        this.debug = this.options.debug;
      }
      if (this.debug) { console.log(this.name + " - ngOnInit", this.options); }

      if (this.options.debounceTime) {
        this.debounceTime = this.options.debounceTime;
      }
      if (this.options.name) {
        this.name = this.options.name;
      }
      if (this.options.url) {
        this.url = this.options.url;
      }
      if (this.options.paginateListModel) {
        this.paginateListModel = this.options.paginateListModel;
      }
      if (this.options.minTermLength) {
        this.minTermLength = this.options.minTermLength;
      }
      if (this.options.bindLabel) {
        this.bindLabel = this.options.bindLabel;
      }
      if (this.options.bindValue) {
        this.bindValue = this.options.bindValue;
      }

      this.searchable = this.options.searchable;
      if(this.searchable == false ) {
        this.clearable = false;
      }

      if (this.options.items) {
        this.items = this.options.items;
      }
      if (this.options.letterPorc) {
        this.letterPorc = this.options.letterPorc;
      }
      if (this.options.resultSizeMin) {
        this.resultSizeMin = this.options.resultSizeMin;
      }
      if (this.options.resultSizeMax) {
        this.resultSizeMax = this.options.resultSizeMax;
      }
      if (this.options.maxTermLength) {
        this.maxTermLength = this.options.maxTermLength;
      }
      if (this.options.objectParent) {
        this.objectParent = this.options.objectParent;
      }

    }else{
      console.error("sm-select -> No Options loaded!");
      return;
    }
    if (this.initValue) {
      this.objectSelected = this.initValue;
      if(this.searchable == true) {
        this.items.push(this.objectSelected);
      }
      this.idSelected = this.objectSelected[this.bindValue];

      //Fix: 18.06.22 -> El initValue lo setea como un chage inicial
      this.changeEventEmit(this.objectSelected);
    }
    if(this.searchable == true ) {

      this.typeahead
        .pipe(
          debounceTime(this.debounceTime),
          switchMap((term) => this.loadData(term))
        )
        .subscribe(
          (items) => {
            if (this.debug) {
              console.log(this.name + " - load:", items);
            }
            this.responseOk("","",items,undefined); //ITEMS.content
            //this.items = [].concat(items);
            this.cd.markForCheck();
          },
          (err) => {
            console.error(this.name + " - error:", err);
            this.items = [];
            this.cd.markForCheck();
          }
        );
    }else {   //searchable ==> False, carga los items una sola vez
      if (this.options.items == undefined || this.options.items?.length == 0) {
        this.loadItems();
      }
    }
  }


  /************************************************************************************************************************
   *
   * FUNCTIONS & PROPERTIES
   *
   ************************************************************************************************************************/
  public clear() {
    this.idSelected = undefined;
    this.objectSelected = undefined;
    this.items = [];
  }

  /**
   * Permite encapsular el evento para poder llamar también al objecto parent
   * @param value
   */
  public changeEventEmit(value:any){
    try {
      this.changeEvent.emit(this.objectSelected);
    }catch(ex){
      if(this.debug == true){
        console.error("changeEventEmit-debug",ex);
      }
    }
    if(this.objectParent){
      try {
        this.objectParent.selectChangeEvent(this.name,"changeEventEmit",value);
      }catch(ex){
        console.error("changeEventEmit-debug-objectParent",ex);
      }
    }

  }

   public setPaginateListModel(paginateListModel) {
    this.paginateListModel = paginateListModel;
  }

  public loadData(term: string): Observable<any[]> {
    this.termActual = term;
    let paginateListModel: PaginateListModel = new PaginateListModel(0,10);
    try {
      let resultSize: number = this.resultSizeMin;
      if( this.searchable == true ) {
        if (!(term == null || term == undefined)) {
          if (term.length >= this.maxTermLength) {
            resultSize = this.resultSizeMax;
          }else {
            if(term.length <= this.minTermLength ) {
              resultSize = this.resultSizeMin;
            }else{
              //Regla de 3 simple
              // Si 5 --> resultSizeMax
              // entonces (3 * resultSizemax / 5) =
              let resultSize2: number = this.resultSizeMax;
              try {
                resultSize2 = Math.trunc(term.length * this.resultSizeMax / this.maxTermLength);
                if(resultSize2 < this.resultSizeMin) {
                  resultSize2 = this.resultSizeMin;
                }

                if(resultSize2 > this.resultSizeMax) {
                  resultSize2 = this.resultSizeMax;
                }
              }catch(ex) {
                resultSize2 = this.resultSizeMax;
              }
              resultSize = resultSize2;
            }
          }
        }
      } else {
        resultSize = this.resultSizeMax;
      }

      if(term != null ) {
        this.paginateListModel.size = resultSize;
        paginateListModel = JSON.parse(JSON.stringify(this.paginateListModel));
        for (let par of paginateListModel.paginateParametersList) {
          par.value = par.value.replace("{{term}}",term);
        }
      }
    }catch(ex){
      console.error(this.name + '- loadData', ex);

    }
    if(this.paginateListModel.paginateParametersList.length > 0) {
      let obs = this.dataService.httpFunction(this.url, this, paginateListModel, {}, true);
      if (this.debug) { console.log(this.name + " - loadData", term,paginateListModel); }
      return obs.pipe(
        catchError(() => of({ items: [] })),
        map((rsp) => rsp.content)
      );
    }
  }


  public change(objeto){
    try {
      this.objectSelected = objeto;
      if(this.debug == true) { console.log ("sm-select-change", this.objectSelected);}
      this.changeEventEmit(objeto);
      this.cd.markForCheck();
    }catch(ex){
      if(this.debug == true) { console.log ("sm-select-change-error", ex);}
    }
  }

  public loadItems() {
    if (this.debug == true) { console.log("loadItems", this.url); }
    // if(this.paginateListModel.paginateParametersList.length == 0 ){
    //   return;
    // }
    try {
      this.dataService.httpFunction(this.url, this, this.paginateListModel, {}, false);
    }catch(ex){
      if(this.debug == true) { console.log ("loadItems", ex);}
    }

  }

  responseOk(httpOperation: string, http: string, data: any, ws: any) {
    if (this.debug == true) { console.log("loadItems", data); }
    if (data) {
      if(data?.content){
        this.items = data.content;
      }else{
        this.items = data;
      }
    }
    if(this.options.itemsTop){
      this.items.unshift(this.options.itemsTop);
    }
    if(this.items.length > 0) {
      //if (this.initValue != undefined && (this.initValue[this.bindValue] == '' || this.initValue[this.bindValue] == 0) ) {

        if(this.termActual != this.termAnt && this.termActual != null){
          this.change(this.items[0]);
        }

        if(this.initValue == undefined){
          this.initValue = this.items[0];
          this.idSelected = this.initValue[this.bindValue];
          this.change(this.initValue);
        }
        //this.idSelected = this.items[0][this.bindValue];
      //}
    }else{
      //this.change(undefined);
    }
    this.termAnt = this.termActual;
    this.cd.markForCheck();
  }
  responseError(urlResource: string, httpOperation: string, data: any, ws?: any) {
    if (this.debug == false) { console.log("responseError", data); }
  }





  /******CONTROL VALUE ACCESOR */


  //Placeholders for the callbacks which are later provided
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  //get accessor
  get value(): any {
    return this.idSelected;
  };

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.idSelected) {
      this.idSelected = v;
      this.onChangeCallback(v);
    }
  }

  //Set touched on blur
  onBlur() {
    this.onTouchedCallback();
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.idSelected) {
      this.idSelected = value;
    }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

}

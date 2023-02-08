import { Component, Input, HostListener, ChangeDetectorRef  } from '@angular/core';
import { DataService } from '../../../../services/data.services';
import { Router, Route, ActivatedRoute, ParamMap } from '@angular/router';
// import { AuthService } from '../../../services/auth.services';
import { FunctionService } from '../../../../services/function.services';
// import { MainService } from '../../../services/main.service';
import swal from 'sweetalert2';

declare var require: any;
@Component({
  selector: 'sm-table',
  templateUrl: './sm-table.component.html',
  styleUrls: ['./sm-table.component.scss']
})


export class SmTableComponent {
  @Input() list: any;
  public loaded: boolean = false;
  public data: any[][];

  public screenWidth: number = 0;
  public screenHeight: number = 0;

  // Ejemplo de List
  // this.list = {
  //   "options": {
  //     "buttonsWidth": "10%",
  //     "buttonsLabel": "-",
  //     "clickRow": false,
  //     "iconCell": "fal fa-file-invoice-dollar"
  //   },

  //   "url": this.dataService.URL_CUENTA_CORRIENTE_LIST,

  //   "buttons": [
  //     { "name": "edit", "type": "button", "urlClick": "/cc/view/%id%", "icon": "fa fa-edit primary", "class": "btn btn-large" }
  //   ],

  //   "cols": [
  //     { "name": "cliente.identificador", "label": "Identificador","width": "35%", "type": "string" },
  //     { "name": "servicioMensual", "label": "Servicio Mensual", "width": "20%", "type": "money" },
  //     { "name": "pagaServicioMensual", "label": "Paga Servicio", "width": "15%", "type": "yesNo" },
  //     { "name": "saldo", "label": "Saldo", "width": "20%","type": "money" },
  //   ],
  //   "data": []
  // }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  // Pagination
  public pageNumber: number = 1;
  public pageSize: number = 10;
  public collectionSize: number = 0;
  public previousPage: number = -1;


  constructor(public dataService: DataService, public cd: ChangeDetectorRef, public router: Router, public route: ActivatedRoute,
    public functionService: FunctionService) {
  }


  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;

    if(this.list.pageSize != undefined){
      this.pageSize = this.list.pageSize;
    }

    this.reload();
  }
  isColVisible(col: any): boolean {
    if(col.responsive && col.responsive.minWidth && col.responsive.minWidth >= this.screenWidth) {
      return false;
    }
    return true;
  }
  public getClass(clase: string): string {
    let claseResult: string = "";
    try {
      claseResult = this.list.options?.style;
      if(claseResult == undefined) {
        claseResult = "";
      }else{
        claseResult = claseResult + " " + clase.toString();
      }  
    }catch(ex) {
      return clase;
    }

    return claseResult;
  }
  clickButton(row: any, button: any){

    return; //harcodeee!! 24.08

    if(this.list.buttons.length > 0){
      if(this.list.options.clickRow == true){
        button = this.list.buttons[0];
      }
    }
    let url: string = "";
    if(button.urlClick != undefined){
      url = button.urlClick;
    }


    url = url.replace("%id%",row.id);
    this.router.navigate([url]);
  }

  getValueRowCombined(value: string, row): string{
    //Las variables estan puestas con %%

    try{
      let result: string = value;
      let pos: number = 0;
      let posFin: number = 0;
      let tok: string = "";
      pos = value.indexOf("%", 0);
      posFin = value.indexOf("%", pos+1);

      while(pos >= 0 && posFin > pos ){

        tok = value.substring(pos+1,posFin);
        if(tok!=""){
          let data = this.functionService.getValueFromObject(row, tok);
          result = result.replace("%" + tok + "%",data);
        }

        pos = value.indexOf("%", posFin+1);
        posFin = value.indexOf("%", pos+1);
      }
      return result;
    }catch(ex){
      return "";
    }
  }
  getSelected(value: any, col: any){
    let selectedDefault: string = "";
    try{
      if(col.dataDefault == undefined){
        if(col.data == undefined){
          return "";
        }else{
          selectedDefault = col.data[0].value;
        }
      }

      for(let item of col.data){
        if(item.id == value){
          return item.value;
        }
      }
      return selectedDefault;
    }catch(ex){
      return "";
    }
  }


  // LIST!!
  getValueRow(colIndex: number, rowIndex: number, row: any, col: any, object: any) {
    let value = this.functionService.getValueFromObject(row, col.name);
    let colType: string = "string";
    if (col != undefined && col.type != undefined) {
      colType = col.type;
    }
    if(col.delegated !=undefined && col.delegated == true){
      if(col.component != undefined && col.component.getValueRow != undefined){
        return col.component.getValueRow(colIndex, rowIndex, row, col, object);
      }
    }


    switch (colType) {
      case 'selected':
        return this.getSelected(value, col);
      case 'especial':
        return this.getValueRowCombined(col.name, row);
      case 'money':
        return this.functionService.formatMoney(value);
      case 'number':
        return this.functionService.formatNumber(value);
      case 'string':
        return value;
      case 'yesNo':
        return this.functionService.yesNo(value);
    }


    return value;
  }

  getClassRow(colIndex: number, rowIndex: number, row: any, col: any, type: any): string {
    let clase: string = "";
    if(col.delegated !=undefined && col.delegated == true){
      if(col.component != undefined && col.component.getClassRow != undefined){
        return col.component.getClassRow(colIndex, rowIndex, row, col, type);
      }
    }

    switch (type) {
      case 'col-button':
        clase += " " + this.list.options.buttonsClass;
        break;
      case 'col-row':
        if (col != undefined && col.class != undefined) {
          clase += " " + col.class;
        }
        break;
      case "especial":
      case "selected":
      case 'text':
        clase += " ";
        if (col.type != undefined) {
          clase += " " + col.type;
          let value:any = "";
          if (row != undefined) {
            value = this.functionService.getValueFromObject(row, col.name);
          }
            switch (col.type) {
              case 'yesNo':
                if (value == "1") {
                  clase += " " +col.type + '-Yes';
                } else {
                  clase += " " + col.type + '-No';
                }
                break;
              case 'money':
              case 'number':
                if(value > 0){
                  clase +=  " " +col.type + '-Mayor';
                }else if(value == 0){
                  clase += " " + col.type + '-Cero';
                }else{
                  clase +=  " " +col.type + '-Menor';
                }
                break;
            }
        }
        break;
      case 'header':
        clase += col.class + ' col-header ';

    }

    return this.getClass(clase);
  }


  getStyleCellValue(colIndex: number, rowIndex: number, row: any, col: any, type: any) {
    if(col.delegated !=undefined && col.delegated == true){
      if(col.component != undefined && col.component.getStyleCellValue != undefined){
        return col.component.getStyleCellValue(colIndex, rowIndex, row, col, type);
      }
    }
    if(col.style != undefined){
      return col.style;
    }
    return {};
  }



  changePage() {
    console.warn("Pagination-(changePage) pageNumber: " + this.pageNumber + " pageSize: " + this.pageSize + " collectionSize: " + this.collectionSize )
    console.warn("this.pageNumber=" + this.pageNumber,"this.previousPage=" + this.previousPage );
    if(this.pageNumber == this.previousPage){
      console.warn("this.pageNumber == this.previousPage " );
      return ;
    }
    console.log("siguiendo...");
    if(this.pageNumber < 1){
      this.pageNumber = 1;
    }


    this.loaded = false;

    let body: any = {};
    if(this.list.parameters != undefined){
      body = JSON.parse(JSON.stringify(this.list.parameters));
    }
    body.page = this.pageNumber-1;
    body.size = this.pageSize;

    this.previousPage = this.pageNumber;
    this.dataService.httpFunction(this.list.url, this, body, "");

  }

  reload() {
    this.pageNumber = 0;
    this.previousPage = -1;
    this.changePage();
  }




  procesarData(content: any){
    let rowIndex: number = -1;
    let colIndex: number = -1;
    this.data = [];

    for(let row of content){
      rowIndex++;
      colIndex=-1;
      this.data[rowIndex]= [];
      for(let col of this.list.cols){
        colIndex++;
        let value = this.getValueRow(colIndex, rowIndex, row, col, "data");
        let clase = this.getClassRow(colIndex,rowIndex,row,col,"text");
        let style = this.getStyleCellValue(colIndex,rowIndex,row,col,col.type);

        this.data[rowIndex][colIndex] = {"value":value, "clase": clase, "style": style};
      }
    }
    console.error("DATA", this.data);
  }

  getDataClassRow(colIndex: number, rowIndex: number, row: any, col: any, object: any):string{
    let clase: string = "";
    try {
      clase = this.data[rowIndex][colIndex].clase;
    }catch(ex){
      clase = "";
    }
    
    
    try{
      return this.getClass( clase ) + " cell ";
    }catch(ex){
      return "";
    }
  }

  getDataStyleCellValue(colIndex: number, rowIndex: number, row: any, col: any, object: any):string{
    try{
      return this.getClass(this.data[rowIndex][colIndex].style);
    }catch(ex){
      return "";
    }
  }

  getDataValueRow(colIndex: number, rowIndex: number, row: any, col: any, object: any): string {
    try{
      return this.data[rowIndex][colIndex].value;
    }catch(ex){
      return "";
    }
  }

  // CONECTION
  responseOk(httpOperation:string, http: string, data:any, ws:any ){
    switch (ws.enumUrl) {
      case this.list.url:
        if(data.number == 0){
          this.pageNumber = 0;
        }else{
          this.pageNumber = data.number+1;
        }
        this.pageSize = data.size;
        this.collectionSize = data.totalElements;

        this.procesarData(data.content);

        this.list.data = data.content;
        this.loaded = true;
        break;
    }
    this.cd.markForCheck();
  }

  responseError(urlResource: string, httpOperation: string, data: any, ws: any) {
    this.loaded = true;
    console.error("data", data);
    swal.fire("Ha ocurrido un error", data.error.message, "error").then(function (json_data) {
    });
  }
}

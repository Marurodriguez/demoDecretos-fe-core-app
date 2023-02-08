import { DataService } from './../../services/data.services';
import { MainService } from './../../services/main.service';
import { FunctionService } from './../../services/function.services';
import { Component, Input, Output, EventEmitter,ViewChild,ElementRef, SimpleChanges } from '@angular/core';
import { Router, Route, ActivatedRoute, ParamMap } from '@angular/router';
// import * as jsPDF from 'jspdf';
// import 'jspdf-autotable';
import { NgIfContext } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

declare var require: any;
@Component({
  selector: 'listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})


export class ListadoComponent {
  @Input() list: any;
  @Output('pageNumberChange') pageNumberChangeEmitter: EventEmitter<Number> = new EventEmitter();
  @Input('pageNumber') set setPageNumberValue(value) {
    this.pageNumber =  value;
    this.reload();
  }
  @ViewChild('pdfTable') pdfTable: ElementRef;
  @Output('reload') reloadEvent: EventEmitter<boolean> = new EventEmitter();
  @Input('reload') set setReload(value) {
    if(value == true){
      this.reload();
    }
  }


  ngOnChanges(changes: SimpleChanges) {
    if(changes['list']){
      if(changes['list'].firstChange == false){
        this.reload();
      }
    }
  }


  public cantChangePage: number = 0; //Por un error conocido en el ngb que siempre actualiza con la pagina 1
  public bAllowEvents:boolean = false;
  public loaded: boolean = false;
  public data: any[][];

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



  // Pagination
  public pageNumber: number = 1;
  public pageSize: number = 100;
  public collectionSize: number = 0;
  public previousPage: number = -1;
  public allowExport: boolean = false;

  public colExport: any = [];

  constructor(public _sanitizer: DomSanitizer, public router: Router, public route: ActivatedRoute,
    public functionService: FunctionService, public mainService: MainService, public dataService: DataService) {
  }

  getExportTitle():string{
    if(this.list.export !=undefined && this.list.export.title !=undefined && this.list.export.title != ""){
      return this.list.export.title;
    }else{
      return "";
    }
  }

  public exportPdf(){


  //   if(this.allowExport == false){
  //     return;
  //   }

  //   var doc = new jsPDF('l', 'pt', 'a4');

  //   if(this.list.export && this.list.export.subs){
  //     for(let sub of this.list.export.subs){
  //       switch(sub.type){
  //         case "text":
  //           if(sub.size && sub.size > 0){
  //             doc.setFontSize(sub.size);
  //           }else{
  //             doc.setFontSize(14);
  //           }
  //           if(sub.style && sub.style != ""){
  //             doc.setFontStyle(sub.style);
  //           }else{
  //             doc.setFontStyle("normal");
  //           }
  //           if(sub.font && sub.font != ""){
  //             doc.setFont(sub.font);
  //           }else{
  //             doc.setFont("times");
  //           }
  //           if(sub.color){
  //             doc.setTextColor(sub.color.r,sub.color.g, sub.color.b);
  //           }else{
  //             doc.setTextColor(0);
  //           }
  //           doc.text(sub.text, sub.x, sub.y);
  //         break;
  //         case "image":
  //           var img = new Image();
  //           img.src = sub.src;
  //           doc.addImage(img, "JPG",sub.x,sub.y, sub.w, sub.h);
  //         break;
  //       }
  //     }
  //   }

  //   var elem = this.pdfTable.nativeElement // document.getElementById('pdfTable');
  //   var data = doc.autoTableHtmlToJson(elem);

  //   let columnStyles = [];let index: number = 0;
  //   for(let col of this.colExport){
  //       if (col.fontStyle === undefined || col.fontStyle == null){
  //         col.fontStyle = '';
  //       }
  //       if (!col.width) {
  //         col.width = 100 / this.colExport.length;
  //       }
  //       if (!col.align) {
  //         col.align = 'center';
  //       }

  //       columnStyles.push({cellWidth: col.width, fontStyle: col.fontStyle, halign: col.align })
  //       index++;
  //   }
  //   if (!(this.list.export && this.list.export.table && this.list.export.font)) {
  //     this.list.export = {};
  //     this.list.export.table = {};
  //     this.list.export.table.font = 'arial';
  //     this.list.export.table.fontSize = 14;
  //   }


  //   doc.autoTable(data.columns, data.rows, {
  //             tableLineColor: [189, 195, 199],
  //     tableLineWidth: 0.75,
  //     styles: {
  //         font: this.list.export.table.font,
  //         lineColor: [44, 62, 80],
  //         lineWidth: 0.55,
  //         overflow: 'linebreak',
  //         columnWidth: 'wrap'
  //     },
  //     headerStyles: {
  //         fillColor: [52, 73, 94],
  //         fontSize: this.list.export.table.fontSize,
  //         textColor: [255,255,255],
  //         halign: "center",
  //         valign: "middle"
  //     },
  //     bodyStyles: {
  //         fillColor: [255, 255, 255],
  //         textColor: 0,
  //         halign: "center",
  //         valign: "middle"
  //     },
  //     alternateRowStyles: {
  //         fillColor: [242, 242, 242]
  //     },
  //     startY: this.list.export.table.y,
  //     columnStyles: columnStyles,

  //     drawRow: function (row, data) {
  //         // Colspan
  //         // doc.setFontStyle('bold');
  //         doc.setFontSize(10);
  //         if ($(row.raw[0]).hasClass("col-header")) {
  //             doc.setTextColor(200, 0, 0);
  //             doc.setFillColor(110,214,84);
  //             doc.rect(data.settings.margin.left, row.y, data.table.width, 20, 'F');
  //             doc.autoTableText("", data.settings.margin.left + data.table.width / 2, row.y + row.height / 2, {
  //                 halign: 'center',
  //                 valign: 'middle'
  //             });
  //            /*  data.cursor.y += 20; */
  //         };

  //        if (row.index % 50 === 0) {
  //             var posY = row.y + row.height * 6 + data.settings.margin.bottom;
  //             if (posY > doc.internal.pageSize.height) {
  //                 data.addPage();
  //             }
  //        }
  //     },
  //     drawCell: function (cell, data) {
  //         // Rowspan
  //         console.log(cell);
  //         if ($(cell.raw).hasClass("col-header")) {
  //         doc.setTextColor(200, 0, 0);
  //                 doc.autoTableText(cell.text + '', data.settings.margin.left + data.table.width / 2, data.row.y + data.row.height / 2, {
  //                 halign: 'right',
  //                 valign: 'middle'
  //             });

  //             return false;
  //         }
  //     }
  // });
  // if(this.getExportTitle() === undefined || this.getExportTitle() === '' ){
  //   this.list.export.title = 'download';
  // }
  // let fileName: string = this.getExportTitle().replace(" ","_") + ".pdf";
  // if(fileName == ""){
  //   fileName = "Export.pdf";
  // }
  // doc.save(fileName);





  }

  ngOnInit() {

    if(this.list.pageSize != undefined){
      this.pageSize = this.list.pageSize;
    }
    if(this.list.pageNumber != undefined){
      this.pageNumber = this.list.pageNumber;
    }


    this.createExportData();

    this.loadPage();

  }

  public createExportData(){
    //Cols:
    this.colExport = [];
    for(let col of this.list.cols){
      if((col.export === undefined) || (col.export === true && col.export.visible === true)){
        let colExp;
        if(col.export) {
          colExp = col.export;
        }else{
          colExp = col;
        }

        colExp.name = col.name;
        if(colExp.label === undefined || colExp.label == ""){
          colExp.label = col.label;
        }
        if(colExp.width === undefined || colExp.width == ""){
          colExp.width = col.width;
        }
        this.colExport.push(colExp);
      }
    }
    if(this.colExport.length > 0){
      this.allowExport = true;
    }else{
      this.allowExport = false;
    }

  }


  clickButton(row: any, button: any, event: any){
    if(event != undefined && event.clientX != undefined && event.clientX <= 0 && event.clientY != undefined && event.clientY <= 0){
      //Es el enter o una tecla
      return;
    }

    if(this.list.buttons.length > 0){
      if(this.list.options.clickRow != undefined && this.list.options.clickRow == true){
        button = this.list.buttons[0];
      }
    }

    if(button == undefined || button == ""){
      return;
    }

    let url: string = "";
    if(button.urlClick != undefined){
      url = button.urlClick;
      url = this.getValueRowCombined(url,row);
      this.router.navigate([url]);
    }else{
      if(button.delegated != undefined){
        button.delegated.ListadoClickButton(row,button);
      }
    }

  }

  isListadoButtonVisible(row, button){
    if(button != undefined && button.isVisibleDelegated != undefined && button.isVisibleDelegated.isListadoButtonVisible != undefined ){
      return button.isVisibleDelegated.isListadoButtonVisible(row,button);
    }else{
      return true;
    }

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

  getClassRow(colIndex: number, rowIndex: number, row: any, col: any, type: any) {
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

    return clase;
  }

  getObjectCellValue(colIndex: number, rowIndex: number, row: any, col: any, type: any) {
    if(col.type !=undefined && col.type == "object"){
      if(col.object != undefined){
        return col.object;
      }
    }
    return {};
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
    // console.warn("Pagination-(changePage) pageNumber: " + this.pageNumber + " pageSize: " + this.pageSize + " collectionSize: " + this.collectionSize )
    if(!this.bAllowEvents){
      return;
    }

    if(this.pageNumber == this.previousPage){
      return ;
    }
    if(this.pageNumber < 1){
      this.pageNumber = 1;
    }

    this.loadPage();

  }
  private loadPage(){
   if(this.list.url == undefined || this.list.url === ""){

    return ;
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
    //Event!
    this.pageNumberChangeEmitter.emit(this.pageNumber);
  }

  public reload() {
    this.pageNumber = 0;
    this.previousPage = -1;

    if(this.list.url == undefined || this.list.url === ""){
      this.data = this.list.data;
      this.procesarData(this.list.data);
      return;
    }


    this.changePage();
    this.reloadEvent.emit();
  }




  procesarData(content: any){
    let rowIndex: number = -1;
    let colIndex: number = -1;
    this.data = [];

    if(this.list.options.delegatedProcesarDataPre != undefined){
      content = this.list.options.delegatedProcesarDataPre.listadoProcesarData(content);
    }
    if(content == undefined){
      return;
    }
    for(let row of content){
      rowIndex++;
      colIndex=-1;
      this.data[rowIndex]= [];
      for(let col of this.list.cols){
        colIndex++;
        let value = this.getValueRow(colIndex, rowIndex, row, col, "data");
        let clase = this.getClassRow(colIndex,rowIndex,row,col,"text");
        let style = this.getStyleCellValue(colIndex,rowIndex,row,col,col.type);
        let object = this.getObjectCellValue(colIndex,rowIndex,row,col,col.type);
        this.data[rowIndex][colIndex] = {"value":value, "clase": clase, "style": style, "object": object};
      }
    }
    if(this.list.options.delegatedProcesarDataPost != undefined){
      this.data = this.list.options.delegatedProcesarDataPre.listadoProcesarData(this.data);
    }
    if(this.list.url == undefined || this.list.url === ""){
      if(this.list.data != undefined && this.list.data.length != undefined){
        this.collectionSize = this.list.data.length;
      }
    }
    //console.error("DATA", this.data);
  }

  getDataObjectCellValue(colIndex: number, rowIndex: number, row: any, col: any, object: any){
    try{
      return this.data[rowIndex][colIndex].object;
    }catch(ex){
      return undefined;
    }
  }


  getDataClassRow(colIndex: number, rowIndex: number, row: any, col: any, object: any){
    try{
      return this.data[rowIndex][colIndex].clase;
    }catch(ex){
      return "";
    }
  }

  getDataStyleCellValue(colIndex: number, rowIndex: number, row: any, col: any, object: any){
    try{
      return this.data[rowIndex][colIndex].style;
    }catch(ex){
      return {};
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
  responseOk(httpOperation: string, http: string, data: any, ws: any) {
    switch (ws.name) {
      case this.list.url:
        if(data.number == 0){
          this.pageNumber = 0;
        }else{
          this.pageNumber = data.number+1;
        }
        this.pageSize = data.size;
        this.collectionSize = data.totalElements;


        this.list.data = data.content;
        this.procesarData(data.content);


        this.loaded = true;
        this.bAllowEvents = true;
        break;
    }

  }

  responseError(urlResource: string, httpOperation: string, data: any, ws: any) {
    this.loaded = true;
    console.error("data", data);
  }
}

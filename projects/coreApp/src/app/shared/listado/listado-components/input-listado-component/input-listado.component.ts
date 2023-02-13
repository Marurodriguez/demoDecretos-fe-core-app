import { Component, Input, Output, EventEmitter,ViewChild,ElementRef } from '@angular/core';

declare var require: any;
@Component({
  selector: 'input-listado',
  templateUrl: './input-listado.component.html',
  styleUrls: ['./input-listado.component.scss']
})


export class InputListadoComponent {
  @Input() row: any; 
  @Input() colName: string;
  @Input() componentEvent: any;
  @Input() extra:any;


  readOnly(){
    if(this.extra !=undefined && this.extra.readOnly && this.extra.readOnly == true){
      return true;
    }else{
      return false; 
    }
  }
  validateValue(){
    if(this.extra !=undefined && this.extra.min != undefined ){
      if(this.row[this.colName] < this.extra.min){
        this.row[this.colName] = this.extra.min;
      }
    }
    if(this.extra !=undefined && this.extra.max != undefined ){
      if(this.row[this.colName] > this.extra.max){
        this.row[this.colName] = this.extra.max;
      }
    }    
  }
  
  getClassInput(){
    let clase: string = "clase-" + this.colName;
    if(this.extra && this.extra.mode){
      return clase + " class-" + this.extra.mode; 
    }
    return clase;
  }

  isAdded():boolean{
    if(this.row.vAdd !=undefined && this.row.vAdd == true){
      return true;
    }else{
      return false; 
    }
  }
  click(){
    try{
      this.validateValue();
      this.componentEvent.ListadoComponentEvent('input', this.row, this.colName, 'click',this.extra);
    }catch(ex){
      return;
    }
  }
  changeValue(){
    try{

      this.validateValue();
      this.componentEvent.ListadoComponentEvent('input', this.row, this.colName, 'changeValue',this.extra);
    }catch(ex){
      return;
    }
  }
  KeyPressEnter(){
    try{
      this.validateValue();
      this.componentEvent.ListadoComponentEvent('input', this.row, this.colName, 'keyPressEnter', this.extra);
    }catch(ex){
      return;
    }
  }
}
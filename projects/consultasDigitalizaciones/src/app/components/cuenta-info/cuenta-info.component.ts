import { Component, Input } from '@angular/core';
import { DataService } from '../../../../../coreApp/src/app/services/data.services';
import { CuentaContableModel } from '../../models/CuentaContable.model';


@Component({
  selector: 'cuenta-info',
  templateUrl: './cuenta-info.component.html',
  styleUrls: ['./cuenta-info.component.scss']
})

export class CuentaInfoComponent {
  /************************************************************************************************************************
   * Inputs && Outputs && Properties
   *
   ************************************************************************************************************************/
   @Input() cuenta: CuentaContableModel = new CuentaContableModel("activo");

  /************************************************************************************************************************
   * Variables
   *
   ************************************************************************************************************************/
   /************************************************************************************************************************
    * Constructor && Implements
    *
    ************************************************************************************************************************/
   constructor(public dataService: DataService){
      
   }

  /************************************************************************************************************************
   * FUNCTIONS
   *
  ************************************************************************************************************************/
   getField(name: string): string {
    try{
      switch(name){
        case "nombre":
          return this.cuenta.nombre;
        break;
        case "rutaCompleta":
          return this.cuenta.rutaCompleta;
        break;
      }
      
      return "";
    }catch(ex){
      return "";
    }
   }

  /************************************************************************************************************************
   *
   * RESPONSE OK/ERROR
   *
   ************************************************************************************************************************/


   
}

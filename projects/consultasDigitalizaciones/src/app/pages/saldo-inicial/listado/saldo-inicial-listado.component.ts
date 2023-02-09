import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, UrlSerializer } from '@angular/router';
import { format } from 'core-js/core/date';
import { AppConfig } from '../../../../../../coreApp/src/app/app.config';
import { PaginateDataModel } from '../../../../../../coreApp/src/app/models/PaginateData.model';
import { PaginateListModel } from '../../../../../../coreApp/src/app/models/PaginateList.model';
import { PaginateParametersModel } from '../../../../../../coreApp/src/app/models/PaginateParameters.model';
import { DataService } from '../../../../../../coreApp/src/app/services/data.services';
import { FunctionService } from '../../../../../../coreApp/src/app/services/function.services';
import { AuthUserService } from '../../../../../../coreApp/src/app/shared/auth/auth-user.service';
import { SmSelectOptions } from '../../../../../../coreApp/src/app/shared/components/sm-select/sm-select.component';
import { AsientoModel } from '../../../models/Asiento.model';
import { BancoModel } from '../../../models/Banco.model';
import { CuentaContableModel } from '../../../models/CuentaContable.model';
import { enumWS } from '../../../navigation/ws/ws-routes.config';
import { UserService } from '../../../services/User.service';


export class GrupoCuentas{
  nombre: string="";
  saldo: number = 0;
  descripcion: string = "";
  children:any[] = [];
  descripcionSuma: string = "";
}

@Component({
  selector: 'saldo-inicial-listado',
  templateUrl: './saldo-inicial-listado.component.html',
  styleUrls: ['./saldo-inicial-listado.component.scss']
})

export class SaldoInicialListadoComponent {
  
  
  
  
  
  
  
  
  
  /************************************************************************************************************************
   * Inputs && Outputs && Properties
   *
   ************************************************************************************************************************/

  /************************************************************************************************************************
   * Variables
   *
   ************************************************************************************************************************/

    public negocioOptions: SmSelectOptions = new SmSelectOptions();
    public loaded: boolean = false;
    public isCollapsed:boolean = false;
    public grupos:GrupoCuentas[] = [];
    public asiento: AsientoModel = new AsientoModel(); //Asiento Inicial
    public initValue: any; 

    public utilidadBruta: number = 0;
   /************************************************************************************************************************
    * Constructor && Implements
    *
    ************************************************************************************************************************/
   constructor(public dataService: DataService,
               public appConfig: AppConfig, private cd: ChangeDetectorRef,
               public router: Router, public route: ActivatedRoute,
               public authUserService: AuthUserService, public serializer: UrlSerializer,
               public functionService: FunctionService, private userService: UserService){
      
      
      let negocios = this.userService.getEmpresaSelected().negocioList;
      // this.initValue = negocios[0];
      this.negocioOptions.bindLabel = "nombre";
      this.negocioOptions.items = negocios;
      
      let grupo1: GrupoCuentas = new GrupoCuentas();
      grupo1.nombre  ="Ingresos y Costos de las Ventas";
      grupo1.descripcionSuma = "Utilidad Bruta";
      grupo1.children = [
        {
          "nombre": "Ingresos Ordinarios",
          "neg": 1,
          "saldoInicial":0,
          "children": [
            {
              "nombre":"Ventas",
              "saldoInicial":0,
              "ope": "+"
            },
            {
              "nombre": "Devoluciones en Ventas",
              "saldoInicial":0,
              "ope": "+"
            }
          ]
        },
        {
          "nombre": "Costo de Ventas",
          "neg": 1,
          "saldoInicial":0,
          "children": [
            {
              "nombre":"Costo de la Mercadería",
              "saldoInicial":0,
              "ope": "-"
            },
            {
              "nombre": "Ajustes a la Mercadería",
              "saldoInicial":0,
              "ope": "-"
            },
            {
              "nombre": "Costo de los Servicios Vendidos",
              "saldoInicial": 0,
              "ope": "-"
            }
          ]
        }
      ];

      let grupo2: GrupoCuentas = new GrupoCuentas();
      grupo2.nombre  ="Gastos Operativos";
      grupo2.descripcionSuma = "Utilidad Operacional";
      grupo2.children = [
        {
          "nombre": "Gastos Extraordinarios",
          "saldoInicial":0,
          "children":[
            {
              "nombre": "Deudores Incobrables",
              "saldoInicial": 0,
              "ope": "-"
            },
            {
              "nombre":"Gastos en Ajustes",
              "saldoInicial": 0,
              "ope": "-"
            }
          ]
        },
        {
          "nombre": "Gastos Ordinarios",
          "saldoInicial":0,
          "children":[
            {
              "nombre": "Gastos administrativos",
              "saldoInicial": 0,
              "ope": "-"
            },
            {
              "nombre":"Gastos en Remuneraciones y Cargas Sociales ",
              "saldoInicial": 0,
              "ope": "-"
            },
            {
              "nombre": "Gastos Generales",
              "saldoInicial": 0,
              "ope": "-"
            },
            {
              "nombre":"Honorarios en Administración",
              "saldoInicial": 0,
              "ope": "-"
            },
            {
              "nombre": "Alquileres",
              "saldoInicial": 0,
              "ope": "-"
            },
            {
              "nombre":"Gastos de Servicios",
              "saldoInicial": 0,
              "ope": "-"
            },
            {
              "nombre": "Seguros",
              "saldoInicial": 0,
              "ope": "-"
            },
            {
              "nombre":"Despreciaciones en Bienes de Uso",
              "saldoInicial": 0,
              "ope": "-"
            }
          ]
        },
        {
          "nombre": "Gastos Financieros",
          "saldoInicial":0,
          "children":[
            {
              "nombre": "Intereses y Gastos Bancarios",
              "saldoInicial": 0,
              "ope": "-"
            },
            {
              "nombre":"Diferencia de Cambio",
              "saldoInicial": 0,
              "ope": "-"
            },
            {
              "nombre":"Devoluciones en compras de Inventario",
              "saldoInicial": 0,
              "ope": "-"
            }
          ]
        },
        {
          "nombre": "Impuestos",
          "saldoInicial":0,
          "children":[
            {
              "nombre": "Impuesto a las Ganancias",
              "saldoInicial": 0,
              "ope": "-"
            },
            {
              "nombre":"Gastos por impuestos no acreditables",
              "saldoInicial": 0,
              "ope": "-"
            }
          ]
        },
        {
          "nombre": "Ingresos",
          "saldoInicial":0,
          "children":[
            {
              "nombre": "Ingresos extraordinarios",
              "saldoInicial": 0,
              "ope": "+"
            }
          ]
        },
      ];


      let grupo3: GrupoCuentas = new GrupoCuentas();
      grupo3.nombre  ="Activos";
      grupo3.descripcionSuma = "Total Activos";
      grupo3.children = [
        {
          "nombre":"Activo Corriente",
          "saldoInicial":0,
          "ope": "+",
          "children": [
            {
              "nombre": "Banco Santander Rio",
              "saldoInicial": 0,
              "ope":"+"
            },
            {
              "nombre": "Banco Galicia",
              "saldoInicial": 0,
              "ope":"+"
            },
            {
              "nombre": "Banco de la Republica",
              "saldoInicial": 0,
              "ope":"+"
            },
            {
              "nombre": "Caja General",
              "saldoInicial": 0,
              "ope":"+"
            },
            {
              "nombre": "Caja General",
              "saldoInicial": 0,
              "ope":"+"
            },
            {
              "nombre": "Impuesto Crédito Fiscal",
              "saldoInicial": 0,
              "ope":"+"
            },
            {
              "nombre": "Percepciones y Retenciones Corrientes",
              "saldoInicial": 0,
              "ope":"+"
            },
            {
              "nombre": "Créditos diversos Corrienets",
              "saldoInicial": 0,
              "ope":"+"
            },
            {
              "nombre": "Retención Ganancias Sufridas",
              "saldoInicial": 0,
              "ope":"+"
            },
            {
              "nombre": "Otras Retenciones Sufridas",
              "saldoInicial": 0,
              "ope":"+"
            },
            {
              "nombre": "Depósitos a Plazo Fijo",
              "saldoInicial": 0,
              "ope":"+"
            },
            {
              "nombre": "Otros",
              "saldoInicial": 0,
              "ope":"+"
            },
            {
              "nombre": "Créditos diversos Corrienets",
              "saldoInicial": 0,
              "ope":"+"
            },
            {
              "nombre": "Retención Ganancias Sufridas",
              "saldoInicial": 0,
              "ope":"+"
            },
            {
              "nombre": "Otras Retenciones Sufridas",
              "saldoInicial": 0,
              "ope":"+"
            },
            {
              "nombre": "Bienes de Cambio",
              "saldoInicial": 0,
              "ope":"+"
            },
          ]
        },
        {
          "nombre":"Activos No Corrientes",
          "saldoInicial":0,
          "ope": "+",
          "children": [
            {
              "nombre": "Bienes de Uso",
              "saldoInicial": 0,
              "ope":"+"
            },
            {
              "nombre": "Otros Activos no Corrientes",
              "saldoInicial": 0,
              "ope":"+"
            },
            {
              "nombre": "Inversiones Permanentes",
              "saldoInicial": 0,
              "ope":"+"
            }
          ]
        },

      ];


      let grupo4: GrupoCuentas = new GrupoCuentas();
      grupo4.nombre  ="Pasivos";
      grupo4.descripcionSuma = "Total Pasivos";
      grupo4.children = [
        {
          "nombre":"Pasivo Corriente",
          "saldoInicial":0,
          "ope": "+",
          "children": [
            {
              "nombre":"Deudas Comerciales",
              "saldoInicial":0,
              "ope":"+"
            },
            {
              "nombre": "Deudas Remuneraciones y Cargas Sociales",
              "saldoInicial":0,
              "ope":"+"
            },
            {
              "nombre": "Deudas Financieras",
              "saldoInicial":0,
              "ope":"+"
            },
            {
              "nombre": "Cargas Fiscales",
              "saldoInicial":0,
              "ope":"+"
            },
            {
              "nombre": "Percepciones y retenciones efectuadas",
              "saldoInicial":0,
              "ope":"+"
            },
            {
              "nombre": "Otras deudas corrientes",
              "saldoInicial":0,
              "ope":"+"
            }
          ]
        },
        {
          "nombre":"Pasivo No Corriente",
          "saldoInicial":0,
          "ope": "+",
          "children": [
            {
              "nombre": "Deudas Financieras no corrientes",
              "saldoInicial":0,
              "ope":"+"
            },
            {
              "nombre": "Otras Deudas no Corrientes",
              "saldoInicial":0,
              "ope":"+"
            }
          ]
        }
      ];

      let grupo5: GrupoCuentas = new GrupoCuentas();
      grupo5.nombre  ="Patrimono";
      grupo5.descripcionSuma = "Total Patrimonio";
      grupo5.children = [
        {
          "nombre":"",
          "saldoInicial":0,
          "ope": "+",
          "children": [
            {
              "nombre":"Capital Social",
              "saldoInicial":0,
              "ope":"+"
            },
            {
              "nombre": "Resultados Acumulados",
              "saldoInicial":0,
              "ope":"+"
            },
            {
              "nombre": "Ajustes por Saldos Iniciales",
              "saldoInicial":0,
              "ope":"+"
            },
            {
              "nombre": "Reservas",
              "saldoInicial":0,
              "ope":"+"
            }
          ]
        }
      ];



      this.grupos.push(grupo1);
      this.grupos.push(grupo2);
      this.grupos.push(grupo3);
      this.grupos.push(grupo4);
      this.grupos.push(grupo5);

   }

   


   /************************************************************************************************************************
    *
    * Eventos
    *
    ************************************************************************************************************************/
    ngOnInit() {
      const paginate: PaginateListModel = new PaginateListModel(0,100);
      //paginate.addParameter("idEmpresa",)
      this.loaded = false;
      // this.dataService.httpFunction(enumWS.CUENTA_CONTABLE_PAGINATE,this,paginate)
    }


   /************************************************************************************************************************
    * FUNCTIONS
    *
    ************************************************************************************************************************/
   public formatNumber(nro: number):string {
    return this.functionService.formatMoney(nro);
   }
   
   public recalcular(){
      for(let grupos of this.grupos){
        grupos.saldo = 0;
        for(let cuenta of grupos.children){
          for(let reg of cuenta.children){
            let monto: number =this.functionService.getNumber(reg.saldoInicial,0)
            if(reg.ope == "+"){
              grupos.saldo += monto;            
            }else{
              grupos.saldo -= monto;
            }
          }
        }
      }

    }
    /*
    public sumaGrupos(grupo:any): number{
      let suma: number = 0;
      try {
        for(let row of grupo.children){
          let nro: number = Number(row?.saldoInicial);
          if(isNaN(nro)){
            nro = 0;
          }
          suma = suma + nro;
        }
        if(isNaN(suma)){
          return 0;
        }
        return suma;
      }catch(ex){
        return 0;
      }
    }
*/


  /************************************************************************************************************************
   *
   * RESPONSE OK/ERROR
   *
   ************************************************************************************************************************/


   responseOk(httpOperation:any, http: string, data:PaginateDataModel, ws:any ){
    //this.refreshComponent();
    // switch(ws.enumUrl) {
    //   case enumWS.CUENTA_CONTABLE_PAGINATE:
    //     this.rows = data.content;
    //     this.loaded = true;
    //     this.cd.markForCheck();
    //   break;
    // }
   }

   responseError(urlResource: string,httpOperation: string, data: any, ws?: any){
    this.loaded = true;
    // this.rows = [];
    this.cd.markForCheck();
   }
}

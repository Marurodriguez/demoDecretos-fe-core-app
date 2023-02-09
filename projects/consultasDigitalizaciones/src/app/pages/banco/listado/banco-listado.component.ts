import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, UrlSerializer } from '@angular/router';
import { AppConfig } from '../../../../../../coreApp/src/app/app.config';
import { PaginateDataModel } from '../../../../../../coreApp/src/app/models/PaginateData.model';
import { PaginateListModel } from '../../../../../../coreApp/src/app/models/PaginateList.model';
import { PaginateParametersModel } from '../../../../../../coreApp/src/app/models/PaginateParameters.model';
import { DataService } from '../../../../../../coreApp/src/app/services/data.services';
import { AuthUserService } from '../../../../../../coreApp/src/app/shared/auth/auth-user.service';
import { BancoModel } from '../../../models/Banco.model';
import { CuentaContableModel } from '../../../models/CuentaContable.model';
import { enumWS } from '../../../navigation/ws/ws-routes.config';


@Component({
  selector: 'banco-listado',
  templateUrl: './banco-listado.component.html',
  styleUrls: ['./banco-listado.component.scss']
})

export class BancoListadoComponent {
  /************************************************************************************************************************
   * Inputs && Outputs && Properties
   *
   ************************************************************************************************************************/

  /************************************************************************************************************************
   * Variables
   *
   ************************************************************************************************************************/
    
    public bancos: BancoModel[] = [];
    public loaded: boolean = false;
    public isCollapsed:boolean = false;
    public rows:CuentaContableModel[] = [];
   /************************************************************************************************************************
    * Constructor && Implements
    *
    ************************************************************************************************************************/
   constructor(public dataService: DataService,
               public appConfig: AppConfig, private cd: ChangeDetectorRef,
               public router: Router, public route: ActivatedRoute,
               public authUserService: AuthUserService, public serializer: UrlSerializer){
      let banco1: BancoModel = new BancoModel();
      banco1.saldo = 195672.50;
      banco1.nombre = "Banco Santander Río"
      banco1.descripcion = "Banco para los gastos corrientes";
      banco1.numeroCuenta = "034732852721824274611";
      banco1.tipoCuenta = "CAJA DE AHORRO / CAJA EN DÓLARES"
      banco1.id = 1;
      let banco2: BancoModel = new BancoModel();
      banco2.saldo = 2587.50;
      banco2.nombre = "Banco de la Republica"
      banco2.descripcion = "Banco para proveedores";
      banco2.numeroCuenta = "92577218244714698";
      banco2.tipoCuenta = "CAJA EN DÓLARES"
      banco2.id = 2;
      let banco3: BancoModel = new BancoModel();
      banco3.saldo = 2587.50;
      banco3.nombre = "Banco Galicia"
      banco3.descripcion = "Banco para uso de las Tarjetas";
      banco3.numeroCuenta = "5488771566952177125";
      banco3.tipoCuenta = "CUENTA CORRIENTE"
      banco3.id = 3;

      this.bancos.push(banco1);this.bancos.push(banco2);this.bancos.push(banco3);

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
      this.rows = [];
      this.dataService.httpFunction(enumWS.CUENTA_CONTABLE_PAGINATE,this,paginate)
    }


   /************************************************************************************************************************
    * FUNCTIONS
    *
    ************************************************************************************************************************/
    getClassRow(cuenta: CuentaContableModel): string{
      switch(cuenta.tipo.trim().toUpperCase()){
        case "ACTIVO":
          return "cuenta-activo";
        case "PASIVO":
          return "cuenta-pasivo";
        case "PATRIMONIO":
          return "cuenta-patrimonio";
        case "INGRESO":
          return "cuenta-ingreso";
        case "EGRESO":
          return "cuenta-egreso";
        case "TRANSFERENCIAS":
            return "cuenta-transferencias";
        default:
          return "";
      }
      return "";
    }



  /************************************************************************************************************************
   *
   * RESPONSE OK/ERROR
   *
   ************************************************************************************************************************/


   responseOk(httpOperation:any, http: string, data:PaginateDataModel, ws:any ){
    //this.refreshComponent();
    switch(ws.enumUrl) {
      case enumWS.CUENTA_CONTABLE_PAGINATE:
        this.rows = data.content;
        this.loaded = true;
        this.cd.markForCheck();
      break;
    }
   }

   responseError(urlResource: string,httpOperation: string, data: any, ws?: any){
    this.loaded = true;
    this.rows = [];
    this.cd.markForCheck();
   }
}

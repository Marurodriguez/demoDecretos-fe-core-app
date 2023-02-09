import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, UrlSerializer } from '@angular/router';
import { AppConfig } from '../../../../../../coreApp/src/app/app.config';
import { PaginateDataModel } from '../../../../../../coreApp/src/app/models/PaginateData.model';
import { PaginateListModel } from '../../../../../../coreApp/src/app/models/PaginateList.model';
import { PaginateParametersModel } from '../../../../../../coreApp/src/app/models/PaginateParameters.model';
import { DataService } from '../../../../../../coreApp/src/app/services/data.services';
import { AuthUserService } from '../../../../../../coreApp/src/app/shared/auth/auth-user.service';
import { CuentaContableModel } from '../../../models/CuentaContable.model';
import { enumWS } from '../../../navigation/ws/ws-routes.config';
import { UserService } from '../../../services/User.service';


@Component({
  selector: 'cuentas-contables',
  templateUrl: './cuentacontable-listado.component.html',
  styleUrls: ['./cuentacontable-listado.component.scss']
})

export class CuentaContableListadoComponent {
  /************************************************************************************************************************
   * Inputs && Outputs && Properties
   *
   ************************************************************************************************************************/

  /************************************************************************************************************************
   * Variables
   *
   ************************************************************************************************************************/
    public parent: CuentaContableModel = new CuentaContableModel("")
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
               public authUserService: AuthUserService, 
               public serializer: UrlSerializer, public userService: UserService){

   }



   /************************************************************************************************************************
    *
    * Eventos
    *
    ************************************************************************************************************************/
    ngOnInit() {
      const paginate: PaginateListModel = new PaginateListModel(0,100);
      paginate.addParameter("empresa",this.userService.getIdEmpresaSelected().toString());
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

import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ActivatedRoute, Router, UrlSerializer } from '@angular/router';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AppConfig } from '../../../../../../../coreApp/src/app/app.config';
import { PaginateDataModel } from '../../../../../../../coreApp/src/app/models/PaginateData.model';
import { PaginateListModel } from '../../../../../../../coreApp/src/app/models/PaginateList.model';
import { UserModel } from '../../../../../../../coreApp/src/app/models/user.model';
import { DataService } from '../../../../../../../coreApp/src/app/services/data.services';
import { AuthUserService } from '../../../../../../../coreApp/src/app/shared/auth/auth-user.service';
import { SmSelectOptions } from '../../../../../../../coreApp/src/app/shared/components/sm-select/sm-select.component';
import { AsientoModel } from '../../../../models/Asiento.model';
import { AsientoRegistroModel } from '../../../../models/AsientoRegistro.model';
import { CuentaContableModel } from '../../../../models/CuentaContable.model';
import { EmpresaModel } from '../../../../models/Empresa.model';
import { enumWS } from '../../../../navigation/ws/ws-routes.config';


@Component({
  selector: 'asiento-registro-abm',
  templateUrl: './asiento-registro-abm.component.html',
  styleUrls: ['./asiento-registro-abm.component.scss']
})

export class AsientoRegistroAbmComponent {
  /************************************************************************************************************************
   * Inputs && Outputs && Properties
   *
   ************************************************************************************************************************/
   @Input() registro: AsientoRegistroModel = new AsientoRegistroModel();
  /************************************************************************************************************************
   * Variables
   *
   ************************************************************************************************************************/

   /************************************************************************************************************************
    * Constructor && Implements
    *
    ************************************************************************************************************************/
   constructor(public dataService: DataService,
               public appConfig: AppConfig, private cd: ChangeDetectorRef,
               public router: Router, public route: ActivatedRoute,
               public authUserService: AuthUserService, public serializer: UrlSerializer,
               private calendar: NgbCalendar){
   }



   /************************************************************************************************************************
    *
    * Eventos
    *
    ************************************************************************************************************************/
    ngOnInit() {

    }


   /************************************************************************************************************************
    * FUNCTIONS
    *
    ************************************************************************************************************************/
    deleteRegistro() {
      this.registro.status = -1;
      this.cd.markForCheck();
    }

    selectCuenta(cuenta:CuentaContableModel){
      this.registro.cuenta = cuenta;
      this.registro.idCuenta = cuenta.id;
    }


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
    // this.loaded = true;
    // this.rows = [];
    // this.cd.markForCheck();
   }
}

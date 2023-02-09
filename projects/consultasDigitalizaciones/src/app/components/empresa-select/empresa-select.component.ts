import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router, UrlSerializer } from '@angular/router';
import { AppConfig } from '../../../../../coreApp/src/app/app.config';
import { PaginateDataModel } from '../../../../../coreApp/src/app/models/PaginateData.model';
import { PaginateListModel } from '../../../../../coreApp/src/app/models/PaginateList.model';
import { DataService } from '../../../../../coreApp/src/app/services/data.services';
import { AuthUserService } from '../../../../../coreApp/src/app/shared/auth/auth-user.service';
import { SmSelectOptions } from '../../../../../coreApp/src/app/shared/components/sm-select/sm-select.component';
import { CuentaContableModel } from '../../models/CuentaContable.model';
import { EmpresaModel } from '../../models/Empresa.model';
import { enumWS } from '../../navigation/ws/ws-routes.config';
import { UserService } from '../../services/User.service';


@Component({
  selector: 'empresa-select',
  templateUrl: './empresa-select.component.html',
  styleUrls: ['./empresa-select.component.scss']
})

export class EmpresaSelectComponent {
  /************************************************************************************************************************
   * Inputs && Outputs && Properties
   *
   ************************************************************************************************************************/
   @Output() changeEvent: EventEmitter<any> = new EventEmitter;

  /************************************************************************************************************************
   * Variables
   *
   ************************************************************************************************************************/
   public selectEmpresaConfig: SmSelectOptions = new SmSelectOptions();
   public initValue: EmpresaModel = new EmpresaModel();
   /************************************************************************************************************************
    * Constructor && Implements
    *
    ************************************************************************************************************************/
   constructor(public dataService: DataService,
               public appConfig: AppConfig, private cd: ChangeDetectorRef,
               public router: Router, public route: ActivatedRoute,
               public authUserService: AuthUserService, public userService: UserService, public serializer: UrlSerializer){
      
      let empresas = this.userService.getEmpresas();
      this.initValue = this.userService.getEmpresaSelected();
      this.selectEmpresaConfig.bindLabel = "nombre";
      this.selectEmpresaConfig.items = empresas;

   }

  /************************************************************************************************************************
   * FUNCTIONS
   *
  ************************************************************************************************************************/
   EmitChangeEvent(value: any){
    this.userService.setEmpresaSelected(value);
   }

  /************************************************************************************************************************
   *
   * RESPONSE OK/ERROR
   *
   ************************************************************************************************************************/
}

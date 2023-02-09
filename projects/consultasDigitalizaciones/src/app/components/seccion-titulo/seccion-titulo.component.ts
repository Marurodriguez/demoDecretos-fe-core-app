import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router, UrlSerializer } from '@angular/router';
import { AppConfig } from '../../../../../coreApp/src/app/app.config';
import { PaginateDataModel } from '../../../../../coreApp/src/app/models/PaginateData.model';
import { PaginateListModel } from '../../../../../coreApp/src/app/models/PaginateList.model';
import { DataService } from '../../../../../coreApp/src/app/services/data.services';
import { AuthUserService } from '../../../../../coreApp/src/app/shared/auth/auth-user.service';
import { SmSelectOptions } from '../../../../../coreApp/src/app/shared/components/sm-select/sm-select.component';
import { CuentaContableModel } from '../../models/CuentaContable.model';
import { enumWS } from '../../navigation/ws/ws-routes.config';
import { TitleBarService } from '../../services/TitleBar.service';
import { UserService } from '../../services/User.service';


@Component({
  selector: 'seccion-titulo',
  templateUrl: './seccion-titulo.component.html',
  styleUrls: ['./seccion-titulo.component.scss'],
})

export class SeccionTituloComponent {
  /************************************************************************************************************************
   * Inputs && Outputs && Properties
   *
   ************************************************************************************************************************/

  /************************************************************************************************************************
   * Variables
   *
   ************************************************************************************************************************/
   /************************************************************************************************************************
    * Constructor && Implements
    *
    ************************************************************************************************************************/
   constructor(public titleBarService: TitleBarService){
      
   }

  /************************************************************************************************************************
   * FUNCTIONS
   *
  ************************************************************************************************************************/
   getTitle(): string {
    return this.titleBarService.title;
   }
   getIcon(): string {
    return this.titleBarService.icon;
   }
   getSubTitle(): string { 
    return this.titleBarService.subTitle;
   }
  /************************************************************************************************************************
   *
   * RESPONSE OK/ERROR
   *
   ************************************************************************************************************************/


   responseOk(httpOperation:any, http: string, data:PaginateDataModel, ws:any ){
  
   }

   responseError(urlResource: string,httpOperation: string, data: any, ws?: any){
  
   }
}

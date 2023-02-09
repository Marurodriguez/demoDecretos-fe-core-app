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
import { UserService } from '../../services/User.service';


@Component({
  selector: 'cuenta-select',
  templateUrl: './cuenta-select.component.html',
  styleUrls: ['./cuenta-select.component.scss']
})

export class CuentaSelectComponent {
  /************************************************************************************************************************
   * Inputs && Outputs && Properties
   *
   ************************************************************************************************************************/
   @Output() changeEvent: EventEmitter<any> = new EventEmitter;

  /************************************************************************************************************************
   * Variables
   *
   ************************************************************************************************************************/
   public selectCuentaConfig: SmSelectOptions = new SmSelectOptions();
   public paginateFind: PaginateListModel= new PaginateListModel(0,20);
   /************************************************************************************************************************
    * Constructor && Implements
    *
    ************************************************************************************************************************/
   constructor(public dataService: DataService,
               public appConfig: AppConfig, private cd: ChangeDetectorRef,
               public router: Router, public route: ActivatedRoute,
               public authUserService: AuthUserService, public serializer: UrlSerializer,
               public userService: UserService){
      
      this.paginateFind.addParameter("nombre","%{{term}}%");
      this.paginateFind.addParameter("hasChildParameter","0"); // Solo busca hijos finales
      this.paginateFind.addOrderField("nombre");
      this.paginateFind.addParameter("empresa",this.userService.getEmpresaSelected().id.toString());
      
      this.selectCuentaConfig.bindLabel = "nombre";
      this.selectCuentaConfig.bindValue = "id";
      this.selectCuentaConfig.url = enumWS.CUENTA_CONTABLE_PAGINATE;
      this.selectCuentaConfig.searchable =true;
      this.selectCuentaConfig.name = "cuenta";
      this.selectCuentaConfig.paginateListModel = this.paginateFind;

   }

  /************************************************************************************************************************
   * FUNCTIONS
   *
  ************************************************************************************************************************/
   EmitChangeEvent(value: any){
    this.changeEvent.emit(value);
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
    //     this.children = data.content;
    //     this.childrenLoaded  = true;
    //     this.isCollapsed = false;
    //     this.cd.markForCheck();
    //   break;
    // }
   }

   responseError(urlResource: string,httpOperation: string, data: any, ws?: any){
    // this.isCollapsed = true;
    // this.childrenLoaded = true;
    // this.children = [];
    // this.cd.markForCheck();
   }
}

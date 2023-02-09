import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router, UrlSerializer } from '@angular/router';
import { AppConfig } from '../../../../../coreApp/src/app/app.config';
import { PaginateDataModel } from '../../../../../coreApp/src/app/models/PaginateData.model';
import { PaginateListModel } from '../../../../../coreApp/src/app/models/PaginateList.model';
import { DataService } from '../../../../../coreApp/src/app/services/data.services';
import { AuthUserService } from '../../../../../coreApp/src/app/shared/auth/auth-user.service';
import { SmSelectOptions } from '../../../../../coreApp/src/app/shared/components/sm-select/sm-select.component';
import { TipoEntidadEnum } from '../../Enums/TipoEntidadEnum';
import { CuentaContableModel } from '../../models/CuentaContable.model';
import { enumWS } from '../../navigation/ws/ws-routes.config';
import { UserService } from '../../services/User.service';


@Component({
  selector: 'entidad-select',
  templateUrl: './entidad-select.component.html',
  styleUrls: ['./entidad-select.component.scss']
})

export class EntidadSelectComponent {
  /************************************************************************************************************************
   * Inputs && Outputs && Properties
   *
   ************************************************************************************************************************/
  @Input() tipoEntidad: TipoEntidadEnum = TipoEntidadEnum.vTODOS; 
  @Output() changeEvent: EventEmitter<any> = new EventEmitter;

  /************************************************************************************************************************
   * Variables
   *
   ************************************************************************************************************************/
   public entidadConfig: SmSelectOptions = new SmSelectOptions();
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
      this.paginateFind.addOrderField("nombre");
      this.paginateFind.addParameter("empresa",this.userService.getEmpresaSelected().id.toString());
      
      this.entidadConfig.bindLabel = "nombre";
      this.entidadConfig.bindValue = "id";
      this.entidadConfig.url = enumWS.ENTIDAD_PAGINATE;
      this.entidadConfig.searchable =true;
      this.entidadConfig.name = "entidad";
      this.entidadConfig.paginateListModel = this.paginateFind;

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

import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, UrlSerializer } from '@angular/router';
import { AppConfig } from '../../../../../../coreApp/src/app/app.config';
import { PaginateDataModel } from '../../../../../../coreApp/src/app/models/PaginateData.model';
import { PaginateListModel } from '../../../../../../coreApp/src/app/models/PaginateList.model';
import { DataService } from '../../../../../../coreApp/src/app/services/data.services';
import { AuthUserService } from '../../../../../../coreApp/src/app/shared/auth/auth-user.service';
import { CuentaContableModel } from '../../../models/CuentaContable.model';
import { enumWS } from '../../../navigation/ws/ws-routes.config';
import { UserService } from '../../../services/User.service';


@Component({
  selector: 'cuenta-registro',
  templateUrl: './cuenta-registro.component.html',
  styleUrls: ['./cuenta-registro.component.scss']
})

export class CuentaRegistroComponent {
  /************************************************************************************************************************
   * Inputs && Outputs && Properties
   *
   ************************************************************************************************************************/
   @Input() cuenta: CuentaContableModel;
   @Input() parent: CuentaContableModel;
  /************************************************************************************************************************
   * Variables
   *
   ************************************************************************************************************************/
    public children: CuentaContableModel[] = [];
    public isCollapsed:boolean = true;
    public childrenLoaded: boolean = false;
    public loading: boolean = false; 

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
    * FUNCTIONS
    *
    ************************************************************************************************************************/
   toggle() {
    //Cargar las filas!
    if( this.isCollapsed == true ){
      if(this.childrenLoaded == false){
        //Cargar!!!
        this.loadChildren();
      }else{
        this.isCollapsed = false;
      }
    }else{
      this.isCollapsed = true;
    }
   }

   mostrarBoton(): boolean {
    if(this.cuenta.tieneSubCuentas == 0){
      return false;
    }else{
      return true; 
    }
   }

   permiteEditar(): boolean {
    try {
      if(this.cuenta.esp == 1) {
        return false;
      }else{
        return true;
      }
    }catch(ex){
      return false; 
    }
   }

   isModeEdit():boolean{
    try{
      if(this.cuenta.modeEdit == true && this.cuenta.esp == 0){
        return true;
      }else{
        return false;
      }
    }catch(ex){
      return false;
    }
   }

   clickEditButton(){
    this.cuenta.modeEdit =true;
    this.cd.markForCheck();
   }

   clickCreateButton(){
    let cuenta: CuentaContableModel = new CuentaContableModel("Nueva Cuenta");
    cuenta.esp = 0;cuenta.id = -1; cuenta.modeEdit =true; cuenta.idParent = this.cuenta.id;


    this.isCollapsed =false;
    this.children.push(cuenta);
    this.cd.markForCheck();
   }

   clickCancelButton(){
    this.cuenta.modeEdit =false;
    this.cd.markForCheck();
   }

   clickSaveButton(){
    if(this.loading == true) {
      return;
    }
    this.cuenta.idEmpresa = this.userService.getEmpresaSelected().id;
    
    this.dataService.httpFunction(enumWS.CUENTA_CONTABLE_SAVE,this,this.cuenta,{});
    this.loading = true; 
   }

   
   saveOk(): void {
    this.cuenta.modeEdit = false;
    this.cd.markForCheck();
    this.loading = false;
   }

   saveError(data:any): void {
    alert("error"); 
    this.loading = false;
   }

   permiteCrearSub(): boolean {
    if(this.isModeEdit() == true){
      return false; 
    }else{
      if(this.childrenLoaded == true){
        return true;
      }else{
        return false; 
      }
    }
   }

   /**
    * Permite cargar a los hijos!
    */
   public loadChildren() {
    const paginateListModel: PaginateListModel = new PaginateListModel(0,100);
    paginateListModel.addParameter("parent",this.cuenta.id.toString());
    paginateListModel.addParameter("empresa", this.userService.getEmpresaSelected().id.toString());
    //Cargar empresa!!
    this.dataService.httpFunction(enumWS.CUENTA_CONTABLE_PAGINATE,this,paginateListModel);
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
        this.children = data.content;
        this.childrenLoaded  = true;
        this.isCollapsed = false;
        this.cd.markForCheck();
      break;
      case enumWS.CUENTA_CONTABLE_SAVE:
        this.saveOk();
      break;
    }
   }

   responseError(urlResource: string,httpOperation: string, data: any, ws?: any){
    
    switch(ws.enumUrl) {
      case enumWS.CUENTA_CONTABLE_PAGINATE:    
        this.isCollapsed = true;
        this.childrenLoaded = true;
        this.children = [];
        this.cd.markForCheck();
        break;
        case enumWS.CUENTA_CONTABLE_SAVE:
          this.saveError(data);
        break;
   }
  }
}

import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, UrlSerializer } from '@angular/router';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { AppConfig } from '../../../../../../coreApp/src/app/app.config';
import { PaginateDataModel } from '../../../../../../coreApp/src/app/models/PaginateData.model';
import { PaginateListModel } from '../../../../../../coreApp/src/app/models/PaginateList.model';
import { PaginateParametersModel } from '../../../../../../coreApp/src/app/models/PaginateParameters.model';
import { DataService } from '../../../../../../coreApp/src/app/services/data.services';
import { FunctionService } from '../../../../../../coreApp/src/app/services/function.services';
import { AuthUserService } from '../../../../../../coreApp/src/app/shared/auth/auth-user.service';
import { AsientoModel } from '../../../models/Asiento.model';
import { AsientoRegistroModel } from '../../../models/AsientoRegistro.model';
import { CuentaContableModel } from '../../../models/CuentaContable.model';
import { enumWS } from '../../../navigation/ws/ws-routes.config';
import { TitleBarService } from '../../../services/TitleBar.service';
import { UserService } from '../../../services/User.service';

@Component({
  selector: 'libro-mayor',
  templateUrl: './libro-mayor.component.html',
  styleUrls: ['./libro-mayor.component.scss']
})

// export class vista{
//   public fecha: string = "";
//   public referencia: string = "";
//   public tercero: string = "";
//   public cuentaContable: string = "";
//   public debito: string = "";
//   public credito: string = "";
//   public debito
// }

export class LibroMayorComponent {
  /************************************************************************************************************************
   * Inputs && Outputs && Properties
   *
   ************************************************************************************************************************/

  /************************************************************************************************************************
   * Variables
   *
   ************************************************************************************************************************/
    public loaded: boolean = false;
    public isCollapsed:boolean = false;
    public registros:AsientoRegistroModel[] = [];
    public posAsiento: number = 0;
    public fechaInicio: NgbDate = new NgbDate(2022,9,26);
    public fechaFin: NgbDate = new NgbDate(2022,1,1);
    public cuentaListado: CuentaContableModel = new CuentaContableModel(""); //Es la cuenta con la que se genero el listado
    public paginateData: PaginateDataModel = new PaginateDataModel();
    public page: number = 0;
    public cuentaSelected: CuentaContableModel = new CuentaContableModel("");
    public cuentasCount: number = 0;
    public size: number = 10; 

    /************************************************************************************************************************
    * Constructor && Implements
    *
    ************************************************************************************************************************/
   constructor(public dataService: DataService,
               public appConfig: AppConfig, private cd: ChangeDetectorRef,
               public router: Router, public route: ActivatedRoute,
               public authUserService: AuthUserService, 
               public serializer: UrlSerializer, public functionService: FunctionService, public userService: UserService,
               public calendar: NgbCalendar, public titleBarService: TitleBarService){
      
      this.titleBarService.title = "Libro Mayor";
      this.titleBarService.subTitle = "Desde esta pantalla se podrán mostrar los libros mayores";
    }
  
   /************************************************************************************************************************
    *
    * Eventos
    *
    ************************************************************************************************************************/
    ngOnInit() {
      this.fechaInicio= new NgbDate(2000,1,1);
      this.fechaFin = this.calendar.getToday();
      this.cuentaSelected.id = 71; //HARDCODE
      
    }


   /************************************************************************************************************************
    * FUNCTIONS
    *
    ************************************************************************************************************************/
    
   
   public selectCuenta(cuenta: CuentaContableModel) {
      this.cuentaSelected = cuenta; 
    }

    getField(row, name: string){
      try {
        switch(name){
          case "cuenta-nombre":
            return this.cuentaListado.nombre;
            break;
          case "fecha":
            let fecha:Date = this.functionService.getDateFromString(row.asiento.fecha,"-",0,true);
            if(fecha==undefined){
              return "";
            }
            return this.functionService.formatDate(fecha);
          default:
            return this.functionService.getValueFromObject(row,name);
        }
      }catch(ex){
        return "";
      }
    }

    refresh(){
      const paginateListModel:PaginateListModel=new PaginateListModel(this.page,this.size);
      paginateListModel.addParameter("empresa", this.userService.getIdEmpresaSelected().toString());
      paginateListModel.addParameter("fechaInicio",this.fechaInicio.year + "-" + this.fechaInicio.month + "-" + this.fechaInicio.day + " 00:00:01")
      paginateListModel.addParameter("fechaFin",this.fechaFin.year + "-" + this.fechaFin.month + "-" + this.fechaFin.day + " 23:59:59")
      paginateListModel.addParameter("cuenta",this.cuentaSelected.id.toString());
      this.dataService.httpFunction(enumWS.ASIENTO_CUENTA_RESUMEN,this,paginateListModel,{})
      this.cuentaListado = JSON.parse(JSON.stringify(this.cuentaSelected));
   } 

  

   
   getClass(reg):string{
      try{
        if(reg.debito > 0){
          return "reg-debe";
        }else{
          return "reg-haber";
        }
      }catch(ex){
        return "";
      }

    }


    SetPage(paginateList: PaginateListModel){
      this.page = paginateList.page;
      this.size = paginateList.size; 
      this.refresh();
    }

  /************************************************************************************************************************
   *
   * RESPONSE OK/ERROR
   *
   ************************************************************************************************************************/


   responseOk(httpOperation:any, http: string, data:any, ws:any ){
    switch(ws.enumUrl) {
      case enumWS.ASIENTO_CUENTA_RESUMEN:
        this.registros = data.asientoRegistroDTOPage.content;
        this.paginateData = data.asientoRegistroDTOPage;
        this.loaded = true;
        this.cd.markForCheck();
      break;
  }
   }

   responseError(urlResource: string,httpOperation: string, data: any, ws?: any){
   }
}

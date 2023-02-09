import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, UrlSerializer } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AppConfig } from '../../../../../../coreApp/src/app/app.config';
import { PaginateDataModel } from '../../../../../../coreApp/src/app/models/PaginateData.model';
import { PaginateListModel } from '../../../../../../coreApp/src/app/models/PaginateList.model';
import { PaginateParametersModel } from '../../../../../../coreApp/src/app/models/PaginateParameters.model';
import { UserModel } from '../../../../../../coreApp/src/app/models/user.model';
import { DataService } from '../../../../../../coreApp/src/app/services/data.services';
import { FunctionService } from '../../../../../../coreApp/src/app/services/function.services';
import { AuthUserService } from '../../../../../../coreApp/src/app/shared/auth/auth-user.service';
import { SmSelectOptions } from '../../../../../../coreApp/src/app/shared/components/sm-select/sm-select.component';
import { AsientoModel } from '../../../models/Asiento.model';
import { AsientoRegistroModel } from '../../../models/AsientoRegistro.model';
import { CuentaContableModel } from '../../../models/CuentaContable.model';
import { EmpresaModel } from '../../../models/Empresa.model';
import { NegocioModel } from '../../../models/Negocio.model';
import { enumWS } from '../../../navigation/ws/ws-routes.config';
import { UserService } from '../../../services/User.service';
import { PageComponentInterface } from '../../_PageInterface/PageComponentInterface';
import swal from 'sweetalert2';
import { regExpEscape } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'asiento-abm',
  templateUrl: './asiento-abm.component.html',
  styleUrls: ['./asiento-abm.component.scss']
})

export class AsientoAbmComponent implements PageComponentInterface{
  /************************************************************************************************************************
   * Inputs && Outputs && Properties
   *
   ************************************************************************************************************************/

  /************************************************************************************************************************
   * Variables
   *
   ************************************************************************************************************************/

    model: NgbDateStruct;
    today = this.calendar.getToday();

    public asiento: AsientoModel = new AsientoModel();
    public referencia: string = "";
    public loaded: boolean = false;
    public isCollapsed:boolean = false;
    public rows:CuentaContableModel[] = [];
    public negocioOptions: SmSelectOptions = new SmSelectOptions();
    public empresas: EmpresaModel[]=[];
    public initValue: NegocioModel;
   /************************************************************************************************************************
    * Constructor && Implements
    *
    ************************************************************************************************************************/
   constructor(public dataService: DataService,
               public appConfig: AppConfig, private cd: ChangeDetectorRef,
               public router: Router, public route: ActivatedRoute,
               public authUserService: AuthUserService, public serializer: UrlSerializer,
               private calendar: NgbCalendar, private functionService: FunctionService,
               public userService: UserService){

    // let user: UserModel;
    // user = this.authUserService.getUser();
    // let empresas: EmpresaModel[] = user.getData("empresaList",[]);
    let negocios = this.userService.getEmpresaSelected().negocioList;
    this.asiento.fechaObj = this.today;
    this.initValue = negocios[0];
    this.negocioOptions.bindLabel = "nombre";
    this.negocioOptions.items = negocios;
    
    this.userService.setPageComponentActive(this);

    console.log(this.userService.getPageComponentActive());
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
    changeEmpresa(empresaActual: EmpresaModel, empresaAnterior: EmpresaModel): void {
        //alert("Cambio la empresa: " + empresaActual.nombre);
    }


   /************************************************************************************************************************
    * FUNCTIONS
    *
    ************************************************************************************************************************/

    crearRegistro() {
      //Crea un registro nuevo y lo muestra en pantalla
      let asientoReg: AsientoRegistroModel  = new AsientoRegistroModel();
      this.asiento.registros.push(asientoReg);
      
    }

    getTotalString(tipo:string): string{
      return this.functionService.formatMoney(this.getTotal(tipo));
    }

    getTotal(tipo:string){
      let sumDebito: number =0;
      let sumCredito:number =0;
      for(let reg of this.asiento.registros){
        if(reg.status == 0){
          sumDebito=sumDebito + Number(reg.debito);
          sumCredito=sumCredito + Number(reg.credito);
        }
      }
      if(tipo == "debito"){
        return sumDebito;
      }else{
        return sumCredito;
      }
    }
    deleteRow(row: AsientoRegistroModel) {
      row.status = -1;
      this.cd.markForCheck();
    }

    public validar(): boolean {

      if(this.asiento.debito == 0 && this.asiento.credito == 0){
        swal.fire("Guardar", "El débito y el Crédito son nulos.","warning");
        return false;
      }
      // Validar que el debe sea igual que el haber!!
      if(this.asiento.debito!=this.asiento.credito){
        swal.fire("Guardar", "El debito y el credito no coinciden.","warning");
        return false;
      }
      return true;
    }


    guardar(): boolean {
      let sumDebito: number = this.getTotal("debito");
      let sumCredito: number = this.getTotal("credito");

      this.asiento.debito = sumDebito;
      this.asiento.credito = sumCredito;

      if(this.validar() == false){
        return false;
      }
      // Grabar en los registros el asiento
      for(let reg of this.asiento.registros){
        reg.idEntidad = this.asiento.entidad.id;
      }
      //this.asiento.idEntidad = this.asiento.entidad.id;
      this.asiento.fechaDTO = this.asiento.fechaObj.year + '-' + this.asiento.fechaObj.month + '-' + this.asiento.fechaObj.day;
      this.asiento.idEmpresa = this.userService.getEmpresaSelected().id;
      this.asiento.idNegocio = this.asiento.negocio.id;
     

      this.dataService.httpFunction(enumWS.ASIENTO_SAVE,this,this.asiento,{});


      return true;
    }

    cancelar() {

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
      case enumWS.ASIENTO_SAVE:
        swal.fire("!Guardado exitoso!", "Se ha guardado el registro correctamente","success");
        this.asiento.registros = [];
        this.asiento.descripcion = "";
        this.asiento.referencia = "";
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

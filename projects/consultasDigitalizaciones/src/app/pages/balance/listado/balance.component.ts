import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, UrlSerializer } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
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


@Component({
  selector: 'balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})

export class BalanceComponent {
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
    public asientos:AsientoModel[] = [];
    public posAsiento: number = 0;
    public cuentasActivos:CuentaContableModel[] = [];
    public cuentasPasivos: CuentaContableModel[] = [];
    public fecha: NgbDate = new NgbDate(2022,9,1);
    public fechaHasta: NgbDate = new NgbDate(2022,9,30);
    public cuentaSelected: CuentaContableModel = new CuentaContableModel("");
    public cuentasCount: number = 0;
    /************************************************************************************************************************
    * Constructor && Implements
    *
    ************************************************************************************************************************/
   constructor(public dataService: DataService,
               public appConfig: AppConfig, private cd: ChangeDetectorRef,
               public router: Router, public route: ActivatedRoute,
               public authUserService: AuthUserService, public serializer: UrlSerializer, public functionService: FunctionService){
    
      this.cuentasActivos.push(new CuentaContableModel("Banco Santander Rio"));
      this.cuentasActivos.push(new CuentaContableModel("Caja General"));
      this.cuentasActivos.push(new CuentaContableModel("Mercadería"));
      this.cuentasActivos.push(new CuentaContableModel("Bs. de Uso"));
      this.cuentasActivos.push(new CuentaContableModel("Rodados"));
      
      this.cuentasPasivos.push(new CuentaContableModel("Caja General"));
      this.cuentasPasivos.push(new CuentaContableModel("Banco Santander Rio"));
      this.cuentasPasivos.push(new CuentaContableModel("Banco Galicia"));



      this.asientos.push(this.createReg("Depósito Cuenta de Ahorro","Comprobante 23849", 0,0,15238));
      this.asientos.push(this.createReg("Compra de Mercaderia","Comprobante 0001-1234157", 2,1,2500));
      this.asientos.push(this.createReg("Compra de Computadora para la Oficina","Comprobante 0012-2189824", 3,2,5000));
      this.asientos.push(this.createReg("Compra de Escritorio","Comprobante 0012-8774714", 3,1,1500));
      this.asientos.push(this.createReg("Compra de Auto para la empresa","Comprobante 0002-471552524", 4,1,90000));


   }
   public createReg(descripcion: string, referencia: string, cuentaContableActivo: number, cuentaContablePasivo: number, monto: number){
    this.posAsiento= this.posAsiento+1;
    let asiento = new AsientoModel();
    asiento.id = this.posAsiento;
    asiento.descripcion = descripcion;
    asiento.referencia = referencia;
    asiento.fecha = "26/09/2022";
    asiento.registros = [];
    

    let reg1: AsientoRegistroModel = new AsientoRegistroModel();
      reg1.debito = monto;
      reg1.cuenta = this.cuentasActivos[cuentaContableActivo];
    let reg2: AsientoRegistroModel = new AsientoRegistroModel();
    reg2.credito = monto;
    reg2.cuenta = this.cuentasPasivos[cuentaContablePasivo];

    asiento.registros.push(reg1);
    asiento.registros.push(reg2);
    return asiento;
   }
   getTotal(tipo: string){
    let sumDebito: number = 0;
    let sumcredito: number = 0;
    for(let asiento of this.asientos){
      for(let reg of asiento.registros){
        // if(reg.show == true ) {
        //   sumDebito = sumDebito + reg.debito;
        //   sumcredito = sumcredito + reg.credito
        // }
      }
    }
    if(tipo == 'debito'){
      return sumDebito;
    }else{
      return sumcredito;
    }
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
    
   
   public selectCuenta(cuenta: CuentaContableModel) {
      this.cuentaSelected = cuenta; 
    }

    showCuenta(cuenta: CuentaContableModel){
      try{
        if(cuenta.nombre.trim().toLowerCase() === this.cuentaSelected.nombre.trim().toLowerCase()){
          return true;
        }else{
          return false;
        }
      }catch(ex){
        return false; 
      }
    }

   loadRegistros(){
      this.cuentasCount = 0;
      let show: boolean = false; 
      for(let asiento of this.asientos){
        asiento.show = false;
        for(let reg of asiento.registros){
          show = this.showCuenta(reg.cuenta);
          if(show == true){
            asiento.show =true;
          }
          //reg.show = show; 
        }
        if( asiento.show == true ) {
          this.cuentasCount = this.cuentasCount + 1;
        }
      }
    
      this.loaded = true;
      this.cd.markForCheck();
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

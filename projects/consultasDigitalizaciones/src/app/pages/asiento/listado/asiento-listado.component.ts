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
  selector: 'asiento-listado',
  templateUrl: './asiento-listado.component.html',
  styleUrls: ['./asiento-listado.component.scss']
})

export class AsientoListadoComponent {
  /************************************************************************************************************************
   * Inputs && Outputs && Properties
   *
   ************************************************************************************************************************/

  /************************************************************************************************************************
   * Variables
   *
   ************************************************************************************************************************/
  public loaded: boolean = false;
  public isCollapsed: boolean = false;
  public asientos: AsientoModel[] = [];
  public posAsiento: number = 0;
  public cuentasActivos: CuentaContableModel[] = [];
  public cuentasPasivos: CuentaContableModel[] = [];
  public fecha: NgbDate = new NgbDate(2020, 9, 26);
  public fechaFin: NgbDate = new NgbDate(2022, 1, 1);
  public page: number = 0;
  public size: number = 10;


  public loading: boolean = false;
  public paginateData: PaginateDataModel = new PaginateDataModel();

  public sizeAnt: number = this.size;
  public pageAnt: number = this.page;
  public fechaAnt: NgbDate = new NgbDate(2022, 9, 26);
  /************************************************************************************************************************
  * Constructor && Implements
  *
  ************************************************************************************************************************/
  constructor(public dataService: DataService,
    public appConfig: AppConfig, private cd: ChangeDetectorRef,
    public router: Router, public route: ActivatedRoute,
    public authUserService: AuthUserService,
    public serializer: UrlSerializer, public functionService: FunctionService, public userService: UserService,
    public calendar: NgbCalendar, public titleBarService: TitleBarService) {

    // Primer día del mes  
    // this.fecha= this.calendar.getToday();
    this.fechaFin = this.calendar.getToday();

    this.titleBarService.title = "Libro Diario";
    this.titleBarService.subTitle = "Desde esta pantalla se ven los registros del Libro Diario";


  }

  getField(fieldName: string, row: AsientoModel) {
    switch (fieldName) {
      case "fecha":
        let date: Date = this.functionService.getDateFromString(row.fecha, "-");
        return this.functionService.formatDate(date, "dd/mm/yy");
        break;
      case "cantidadRegistros":
        if (row.registros && row?.registros.length > 0) {
          return row.registros.length;
        } else {
          return 0;
        }
        break;
    }
  }

  getFieldReg(fieldName: string, row: AsientoRegistroModel) {
    try {
      switch (fieldName) {
        case "entidad":
          if (row.entidad && row.entidad.nombre) {
            return row.entidad.nombre;
          }
          break;
      }
    } catch (ex) {
      return "";
    }
    return "";
  }

  getTotal(tipo: string) {
    let sumDebito: number = 0;
    let sumcredito: number = 0;
    for (let asiento of this.asientos) {
      for (let reg of asiento.registros) {
        sumDebito = sumDebito + reg.debito;
        sumcredito = sumcredito + reg.credito
      }
    }
    if (tipo == 'debito') {
      return sumDebito;
    } else {
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
  refresh(force: boolean) {
    if (!(this.pageAnt != this.page || this.sizeAnt != this.size || (this.fechaAnt.year != this.fechaAnt.year || this.fecha.month != this.fechaAnt.month || this.fecha.day != this.fechaAnt.day)) && force == false) {
      return; //No hubo cambios!
    }
    this.pageAnt = this.page;
    this.fechaAnt.day = this.fecha.day;
    this.fechaAnt.month = this.fecha.month;
    this.fechaAnt.year = this.fecha.year;

    let paginateListModel: PaginateListModel = new PaginateListModel(this.page, this.size);
    paginateListModel.addParameter("empresa", this.userService.getIdEmpresaSelected().toString());

    //FechaInit! --> La fecha seleccionada
    let fechaInit: string = this.fecha.year + '-' + this.fecha.month + '-' + this.fecha.day + ' 00:00:01';
    let fechaFin: string = this.fechaFin.year + '-' + this.fechaFin.month + '-' + this.fechaFin.day + ' 23:59:59';

    paginateListModel.addParameter("fechaInicio", fechaInit);
    paginateListModel.addParameter("fechaFin", fechaFin);

    this.dataService.httpFunction(enumWS.DOCUMENTO_PAGINATE, this, paginateListModel);

    this.loading = true;
  }

  getClass(reg): string {
    try {
      if (reg.debito > 0) {
        return "reg-debe";
      } else {
        return "reg-haber";
      }
    } catch (ex) {
      return "";
    }
  }

  SetPage(paginate: PaginateListModel) {
    this.page = paginate.page;
    this.size = paginate.size;
    this.refresh(false);
  }


  /************************************************************************************************************************
   *
   * RESPONSE OK/ERROR
   *
   ************************************************************************************************************************/

  responseOk(httpOperation: any, http: string, data: PaginateDataModel, ws: any) {
    switch (ws.enumUrl) {
      case enumWS.ASIENTO_PAGINATE_DTO:
        this.paginateData = data;
        this.asientos = data.content;
        this.loaded = true;
        this.cd.markForCheck();
        break;
    }
  }

  responseError(urlResource: string, httpOperation: string, data: any, ws?: any) { }
}

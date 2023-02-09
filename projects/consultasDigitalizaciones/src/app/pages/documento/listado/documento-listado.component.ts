import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router, UrlSerializer } from '@angular/router';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { AppConfig } from '../../../../../../coreApp/src/app/app.config';
import { PaginateDataModel } from '../../../../../../coreApp/src/app/models/PaginateData.model';
import { PaginateListModel } from '../../../../../../coreApp/src/app/models/PaginateList.model';
import { DataService } from '../../../../../../coreApp/src/app/services/data.services';
import { FunctionService } from '../../../../../../coreApp/src/app/services/function.services';
import { AuthUserService } from '../../../../../../coreApp/src/app/shared/auth/auth-user.service';
import { DocumentoModel } from '../../../models/Documento.model';
import { DocumentosPaginateFiltrosModel } from '../../../models/DocumentosPaginateFiltros.model';
import { enumWS } from '../../../navigation/ws/ws-routes.config';
import { TitleBarService } from '../../../services/TitleBar.service';
import { UserService } from '../../../services/User.service';

@Component({
  selector: 'documento-listado',
  templateUrl: './documento-listado.component.html',
  styleUrls: ['./documento-listado.component.scss']
})

export class DocumentoListadoComponent {
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
  public posDocumento: number = 0;
  public fecha: NgbDate = new NgbDate(2020, 9, 26);
  public fechaFin: NgbDate = new NgbDate(2022, 1, 1);
  public page: number = 0;
  public size: number = 10;
  public server: string;
  public headers: Headers;
  public documentoFiltros: DocumentosPaginateFiltrosModel = new DocumentosPaginateFiltrosModel();
  public filtrosAvanzados: any = [];

  public loading: boolean = false;
  public paginateData: PaginateDataModel;

  public sizeAnt: number = this.size;
  public pageAnt: number = this.page;
  public fechaAnt: NgbDate = new NgbDate(2022, 9, 26);
  public filtros: any;
  /************************************************************************************************************************
  * Constructor && Implements
  *
  ************************************************************************************************************************/
  constructor(public dataService: DataService,
    public appConfig: AppConfig, private cd: ChangeDetectorRef,
    public router: Router, public route: ActivatedRoute,
    public authUserService: AuthUserService,
    public serializer: UrlSerializer, public functionService: FunctionService, public userService: UserService,
    public calendar: NgbCalendar, public titleBarService: TitleBarService,) {

    this.server = this.appConfig.getConfig("server", "");

    // Primer día del mes  
    this.fecha = this.calendar.getToday();
    this.fechaFin = this.calendar.getToday();

    this.titleBarService.title = "Listado de expedientes digitalizados";
    this.titleBarService.subTitle = "Desde esta pantalla se ven los documentos que an sido digitalizados";

    this.refresh(true);
  }

  getField(fieldName: string, row: DocumentoModel) {
    switch (fieldName) {
      case "fecha":
        return "fecha";
        break;
      case "cantidadRegistros":
        if (row.informacion && row?.informacion.length > 0) {
          return row.informacion.length;
        } else {
          return 0;
        }
        break;
    }
  }


  /************************************************************************************************************************
   *
   * Eventos
   *
   ************************************************************************************************************************/
  ngOnInit() {
    this.headers = new Headers();
    this.headers.append("Content-Type", "application/json");
    this.headers.append("Accept", "application/json");
    this.headers.append('Authorization', this.authUserService.getCredentials().toString());

    fetch(this.server + "documento/paginate/filtros", { method: 'GET', headers: this.headers })
      .then(response => {
        response.text().then(text => {
          if (response.status == 200) {
            text = JSON.parse(text);
            this.documentoFiltros = new DocumentosPaginateFiltrosModel();
            this.documentoFiltros.categorias = text['categorias'];
            this.documentoFiltros.dependencias = text['dependencias'];
            console.log('documentoFiltros', this.documentoFiltros);

          } else {
            console.error("Error documentos filtros");
            console.error(response);
          }
          this.cd.markForCheck();
        });
      })
      .catch(error => console.error('error getTextoOcr', error));
  }


  /************************************************************************************************************************
   * FUNCTIONS
   *
   ************************************************************************************************************************/
  refresh(force: boolean) {
    if (!(this.pageAnt != this.page || this.sizeAnt != this.size || (this.fechaAnt.year != this.fechaAnt.year || this.fecha.month != this.fechaAnt.month || this.fecha.day != this.fechaAnt.day)) && force == false) {
      return; // No hubo cambios!
    }
    this.pageAnt = this.page;
    this.fechaAnt.day = this.fecha.day;
    this.fechaAnt.month = this.fecha.month;
    this.fechaAnt.year = this.fecha.year;

    let paginateListModel: PaginateListModel = new PaginateListModel(this.page, this.size);

    //FechaInit! --> La fecha seleccionada
    //let fechaInit: string = this.fecha.year + '-' + this.fecha.month + '-' + this.fecha.day + ' 00:00:01';
    //let fechaFin: string = this.fechaFin.year + '-' + this.fechaFin.month + '-' + this.fechaFin.day + ' 23:59:59';
    //paginateListModel.addParameter("fechaInicio", fechaInit);
    //paginateListModel.addParameter("fechaFin", fechaFin);

    if (this.filtros) {
      if (this.filtros.target.tipo.value != 0) paginateListModel.addParameter("tipo", this.filtros.target.tipo.value);
      if (this.filtros.target.dependencia.value != "") paginateListModel.addParameter("dependencia", this.filtros.target.dependencia.value);
      if (this.filtros.target.expediente.value != "") paginateListModel.addParameter("expediente", this.filtros.target.expediente.value);
      if (this.filtros.target.caratula.value != "") paginateListModel.addParameter("caratula", this.filtros.target.caratula.value);

      if (this.filtrosAvanzados) {
        for (let i = 0; i < this.filtrosAvanzados.length; i++) {
          const filtro = this.filtrosAvanzados[i];
          if (this.filtros.target[filtro.codigo].value != "")
            paginateListModel.addParameter("campo" + filtro.id, this.filtros.target[filtro.codigo].value);
        }
      }
    }

    this.dataService.httpFunction(enumWS.DOCUMENTO_PAGINATE, this, paginateListModel);

    this.loading = true;
  }

  onSubmit(event: any) {
    this.filtros = event;
    this.refresh(true);
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

  public changeTipoExpediente(tipo) {
    if (tipo == 1) {
      this.filtrosAvanzados = [
        {
          id: 1,
          codigo: "cuil",
          nombre: "Cuil",
          campoTipo: {
            codigo: "string",
            nombre: "Texto",
          }
        },
        {
          id: 2,
          codigo: "razon_social",
          nombre: "Razon social",
          campoTipo: {
            codigo: "string",
            nombre: "Texto",
          }
        }
      ]
    } else {
      this.filtrosAvanzados = [];
    }
  }


  /************************************************************************************************************************
   *
   * RESPONSE OK/ERROR
   *
   ************************************************************************************************************************/

  responseOk(httpOperation: any, http: string, data: PaginateDataModel, ws: any) {
    switch (ws.enumUrl) {
      case enumWS.DOCUMENTO_PAGINATE:
        this.paginateData = data;
        console.log("paginateData");
        console.log(this.paginateData);
        this.loaded = true;
        this.cd.markForCheck();
        break;
    }
  }

  responseError(urlResource: string, httpOperation: string, data: any, ws?: any) {
  }
}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from "@angular/core";
import { ActivatedRoute, Router, UrlSerializer } from "@angular/router";
import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { AppConfig } from "../../../../../coreApp/src/app/app.config";
import { PaginateDataModel } from "../../../../../coreApp/src/app/models/PaginateData.model";
import { PaginateListModel } from "../../../../../coreApp/src/app/models/PaginateList.model";
import { DataService } from "../../../../../coreApp/src/app/services/data.services";
import { FunctionService } from "../../../../../coreApp/src/app/services/function.services";
import { AuthUserService } from "../../../../../coreApp/src/app/shared/auth/auth-user.service";
import { SmSelectOptions } from "../../../../../coreApp/src/app/shared/components/sm-select/sm-select.component";
import { enumWS } from "../../navigation/ws/ws-routes.config";
import { UserService } from "../../services/User.service";

@Component({
    selector: "periodo-select",
    templateUrl: "./periodo-select.component.html",
    styleUrls: ["./periodo-select.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeriodoSelectComponent {
    /************************************************************************************************************************
     * Inputs && Outputs && Properties
     *
     ************************************************************************************************************************/
    @Input() fInicio: NgbDate;
    @Input() fFin: NgbDate;
    @Input() showCustomDates: boolean = false;

    @Output() fFinChange = new EventEmitter<NgbDate>();
    @Output() fInicioChange = new EventEmitter<NgbDate>();

    @Output() changeEvent: EventEmitter<any> = new EventEmitter();

    /************************************************************************************************************************
     * Variables
     *
     ************************************************************************************************************************/
    public fechaInicio: NgbDate;
    public fechaFin: NgbDate;
    public selectedOptionLabel: string = "";

    public selectPeriodoConfig: SmSelectOptions;
    /************************************************************************************************************************
     * Constructor && Implements
     *
     ************************************************************************************************************************/
    constructor(public dataService: DataService, public cd: ChangeDetectorRef, public userService: UserService, public functionService: FunctionService) {
        this.selectPeriodoConfig = new SmSelectOptions();
        this.selectPeriodoConfig.bindLabel = "nombre";
        this.selectPeriodoConfig.bindValue = "id";
        //this.selectPeriodoConfig.url = enumWS.PERIODO_GET_PERIODOS;
        this.selectPeriodoConfig.searchable = false;
        this.selectPeriodoConfig.name = "Periodo";

        const paginateListModel = new PaginateListModel(0, 10);
        this.selectPeriodoConfig.paginateListModel = paginateListModel;
    }

    /************************************************************************************************************************
     * FUNCTIONS
     *
     ************************************************************************************************************************/
    ngOnInit() {
        this.fechaInicio = this.fInicio;
        this.fechaFin = this.fFin;

        if (this.showCustomDates == true) {
            this.selectedOptionLabel = "Fecha";
        } else {
            this.selectedOptionLabel = "Periodo";
        }
    }

    selectOption(index: number) {
        if (index == 0) {
            this.showCustomDates = false;
            this.selectedOptionLabel = "Periodo";
        } else {
            this.showCustomDates = true;
            this.selectedOptionLabel = "Fecha";
        }
        this.cd.markForCheck();
    }

    EmitChangeEvent(value: any) {
        this.changeEvent.emit(value);
    }
    onDateSelect(evento: any) {
        this.fFinChange.emit(this.fechaFin);
        this.fInicioChange.emit(this.fechaInicio);
    }

    selectPeriodo(periodo: any) {
        let dFechaInicio: Date | undefined | null = this.functionService.getDateFromString(periodo.fechaInicio, "-", 0, false);
        let dFechaFin: Date | undefined | null = this.functionService.getDateFromString(periodo.fechaFin, "-", 0, false);
        if (dFechaInicio == undefined || dFechaInicio == null) {
            return;
        }
        if (dFechaFin == undefined || dFechaFin == null) {
            return;
        }

        //let ngbDateInicio = new NgbDate(dFechaInicio?.getDay(), dFechaInicio?.getMonth(), dFechaInicio?.getFullYear());
        this.fechaInicio = new NgbDate(dFechaInicio.getFullYear(), dFechaInicio.getMonth() + 1, dFechaInicio.getDate());
        this.fechaFin = new NgbDate(dFechaFin.getFullYear(), dFechaFin.getMonth() + 1, dFechaFin.getDate());
        //this.fechaInicio.day = dFechaInicio.getDate();
        //this.fechaInicio.month = dFechaInicio.getMonth()+1;
        //this.fechaInicio.year = dFechaInicio.getFullYear();

        // this.fechaFin.day = dFechaFin.getDate();
        // this.fechaFin.month = dFechaFin.getMonth()+1;
        // this.fechaFin.year = dFechaFin.getFullYear();

        // this.fechaInicio = periodo.fechaInicio
    }
    /************************************************************************************************************************
     *
     * RESPONSE OK/ERROR
     *
     ************************************************************************************************************************/

    responseOk(httpOperation: any, http: string, data: PaginateDataModel, ws: any) {
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

    responseError(urlResource: string, httpOperation: string, data: any, ws?: any) {
        // this.isCollapsed = true;
        // this.childrenLoaded = true;
        // this.children = [];
        // this.cd.markForCheck();
    }
}

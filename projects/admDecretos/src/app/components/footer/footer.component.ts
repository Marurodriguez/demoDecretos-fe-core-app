import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges } from "@angular/core";
import { ActivatedRoute, Router, UrlSerializer } from "@angular/router";
import { AppConfig } from "../../../../../coreApp/src/app/app.config";
import { PaginateDataModel } from "../../../../../coreApp/src/app/models/PaginateData.model";
import { PaginateListModel } from "../../../../../coreApp/src/app/models/PaginateList.model";
import { DataService } from "../../../../../coreApp/src/app/services/data.services";
import { AuthUserService } from "../../../../../coreApp/src/app/shared/auth/auth-user.service";
import { UserService } from "../../services/User.service";

@Component({
    selector: "footer",
    templateUrl: "./footer.component.html",
    styleUrls: ["./footer.component.scss"]
})
export class FooterComponent {
    /************************************************************************************************************************
     * Inputs && Outputs && Properties
     *
     ************************************************************************************************************************/
    @Input() paginate: PaginateDataModel = new PaginateDataModel();
    @Input() showSelector: boolean = false;
    ngOnChanges(changes: SimpleChanges) {
        this.paginate.number = this.paginate.number + 1;
    }

    @Output() setPageEvent: EventEmitter<any> = new EventEmitter();
    @Input() showPaginate: boolean = true;

    /************************************************************************************************************************
     * Variables
     *
     ************************************************************************************************************************/
    public itemsPaginas: number[] = [10, 15, 50, 100];
    public cantResultados: number = 10;
    public pageAnt: number = -1;
    public sizeAnt: number = -1;
    public allowEvents: boolean = false;

    /************************************************************************************************************************
     * Constructor && Implements
     *
     ************************************************************************************************************************/
    constructor(
        public dataService: DataService,
        public appConfig: AppConfig,
        private cd: ChangeDetectorRef,
        public router: Router,
        public route: ActivatedRoute,
        public authUserService: AuthUserService,
        public serializer: UrlSerializer,
        public userService: UserService
    ) {}

    /************************************************************************************************************************
     * FUNCTIONS
     *
     ************************************************************************************************************************/
    changeCantResultados(value: any) {
        this.cantResultados = value;
        this.setPage(this.pageAnt);
    }

    EmitChangeEvent(value: any) {}

    setPage(paginaIndex: number) {
        if (this.allowEvents == false) {
            return;
        }
        if (!(paginaIndex != this.pageAnt || this.cantResultados != this.sizeAnt)) {
            return;
        }
        const paginateListModel: PaginateListModel = new PaginateListModel(0, 0);
        this.pageAnt = paginaIndex;
        paginateListModel.page = paginaIndex - 1;
        paginateListModel.size = this.cantResultados;
        this.sizeAnt = this.paginate.size;
        this.setPageEvent.emit(paginateListModel);
    }

    ngOnInit() {
        this.pageAnt = this.paginate.number;
        this.sizeAnt = this.paginate.size;
    }

    ngAfterViewInit() {
        this.allowEvents = true;
    }
    /************************************************************************************************************************
     *
     * RESPONSE OK/ERROR
     *
     ************************************************************************************************************************/

    responseOk(httpOperation: any, http: string, data: PaginateDataModel, ws: any) {}

    responseError(urlResource: string, httpOperation: string, data: any, ws?: any) {}
}

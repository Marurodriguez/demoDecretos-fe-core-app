import { Component } from "@angular/core";
import { PaginateDataModel } from "../../../../../coreApp/src/app/models/PaginateData.model";
import { TitleBarService } from "../../services/TitleBar.service";

@Component({
    selector: "seccion-titulo",
    templateUrl: "./seccion-titulo.component.html",
    styleUrls: ["./seccion-titulo.component.scss"]
})
export class SeccionTituloComponent {
    /************************************************************************************************************************
     * Inputs && Outputs && Properties
     *
     ************************************************************************************************************************/

    /************************************************************************************************************************
     * Variables
     *
     ************************************************************************************************************************/
    /************************************************************************************************************************
     * Constructor && Implements
     *
     ************************************************************************************************************************/
    constructor(public titleBarService: TitleBarService) {}

    /************************************************************************************************************************
     * FUNCTIONS
     *
     ************************************************************************************************************************/
    getTitle(): string {
        return this.titleBarService.title;
    }
    getIcon(): string {
        return this.titleBarService.icon;
    }
    getSubTitle(): string {
        return this.titleBarService.subTitle;
    }
    /************************************************************************************************************************
     *
     * RESPONSE OK/ERROR
     *
     ************************************************************************************************************************/

    responseOk(httpOperation: any, http: string, data: PaginateDataModel, ws: any) {}

    responseError(urlResource: string, httpOperation: string, data: any, ws?: any) {}
}

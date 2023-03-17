import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, Inject } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { PaginateListModel } from "../../../../../../../coreApp/src/app/models/PaginateList.model";
import { PaginateDataModel } from "../../../../../../../coreApp/src/app/models/PaginateData.model";
import { DataService } from "../../../../../../../coreApp/src/app/services/data.services";
import { ActivatedRoute } from "@angular/router";
import { enumWS } from "../../../../navigation/ws/ws-routes.config";
import { ArchivoDTOModel } from "../../../../models/ArchivoDTO";
import { ImagenZoomComponent } from "../imagen-zoom/imagen-zoom.component";
import { DOCUMENT } from "@angular/common";

/**
 * El componente se encarga de cargar las imagenes de previsualización
 * en los diferentes formatos.
 */

export enum TipoVistaEnum {
    vistaGrilla
}

@Component({
    selector: "documento-imagen-preview",
    templateUrl: "./imagen-preview.component.html",
    styleUrls: ["./imagen-preview.component.scss"]
})
export class ImagenPreviewComponent implements OnInit {
    @ViewChild("imagenZoomComponent") imagenZoomComponent: ImagenZoomComponent;

    @Input() documento;
    @Input() tipoVista = TipoVistaEnum.vistaGrilla;

    public hide: boolean = true;

    public paginateData: PaginateDataModel = new PaginateDataModel();
    public paginateListModel: PaginateListModel = new PaginateListModel(0, 12);
    public archivoSeleccionado: ArchivoDTOModel;
    public imagenesPage: Number = 0;
    public imagenesPageAnt: Number = 0;
    public loadingPage: boolean = false;
    public loadingArchivoSeleccionado: boolean = false;
    public _document: Document;

    constructor(public dataService: DataService, private route: ActivatedRoute, private sanitizer: DomSanitizer, public cd: ChangeDetectorRef, @Inject(DOCUMENT) _document: Document) {
        this._document = _document;
    }

    ngOnInit(): void {
        this.refresh(true);
    }

    public previewCreate(archivo: ArchivoDTOModel) {
        let base64 = "data:image/png;base64, " + archivo.archivoDataDTO.data;
        return this.getSantizeUrl(base64);
    }

    public imagenSelectCreate(archivo: ArchivoDTOModel) {
        if (!archivo) {
            return;
        }
        let base64 = "data:image/png;base64, " + archivo.archivoDataDTO.data;
        return this.getSantizeUrl(base64);
    }

    public getSantizeUrl(url: string) {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }

    SetPage(paginateListModel: PaginateListModel) {
        this.paginateListModel = paginateListModel;
        this.refresh(false);
    }

    selectImagen(archivo: ArchivoDTOModel) {
        this.archivoSeleccionado = archivo;

        this.loadingArchivoSeleccionado = true;
        this.imagenZoomComponent.changeUuid(this.archivoSeleccionado.archivo.uuidAlternativo);
        document.getElementsByTagName("body")[0].style.overflow = "hidden";
        window.scroll({ top: 0 });
        if (this._document != null) this._document.getElementById("main-panel").style.height = "100vh";
        this.cd.markForCheck();
    }

    abrirImagenNuevaVentana() {
        var image = new Image();
        var w = window.open("");
        w.document.write(image.outerHTML);
    }

    refresh(force: boolean) {
        this.loadingPage = true;
        this.paginateListModel.size = 12;
        this.paginateListModel.addParameter("documentoUuid", this.documento.uuid);
        this.dataService.httpFunction(enumWS.ARCHIVO_PAGINATE_PREVIEW, this, this.paginateListModel, {});
    }

    /************************************************************************************************************************
     *
     * RESPONSE OK/ERROR
     *
     ************************************************************************************************************************/

    responseOk(httpOperation: any, http: string, data: any, ws: any) {
        switch (ws.enumUrl) {
            case enumWS.ARCHIVO_PAGINATE_PREVIEW:
                this.loadingPage = true;
                this.paginateData = data;
                if (this.paginateData) {
                    this.archivoSeleccionado = data[0];
                } else {
                }
                this.cd.markForCheck();
                break;
            case enumWS.ARCHIVO_DATA_LOAD:
                this.archivoSeleccionado = data;
                this.loadingArchivoSeleccionado = true;
                this.cd.markForCheck();
                break;
        }
    }

    responseError(urlResource: string, httpOperation: string, data: any, ws?: any) {}
}

import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PaginateListModel } from '../../../../../../../coreApp/src/app/models/PaginateList.model';
import { PaginateDataModel } from '../../../../../../../coreApp/src/app/models/PaginateData.model';
import { ArchivoModel } from '../../../../models/Archivo.model';
import { DataService } from '../../../../../../../coreApp/src/app/services/data.services';
import { ActivatedRoute } from '@angular/router';
import { enumWS } from '../../../../navigation/ws/ws-routes.config';
import { ArchivoDTOModel } from '../../../../models/ArchivoDTO';


/**
 * El componente se encarga de cargar las imagenes de previsualización 
 * en los diferentes formatos.
 */

export enum TipoVistaEnum{
  vistaGrilla
}



@Component({
  selector: 'documento-imagen-preview',
  templateUrl: './imagen-preview.component.html',
  styleUrls: ['./imagen-preview.component.scss']
})




export class ImagenPreviewComponent implements OnInit {
  @Input() documento;
  @Input() tipoVista = TipoVistaEnum.vistaGrilla;

  public hide: boolean = true; 


  public paginateData: PaginateDataModel = new PaginateDataModel();
  public archivoSeleccionado: ArchivoDTOModel;
  public imagenesPage: Number = 0;
  public imagenesPageAnt: Number = 0;
  public loadingPage: boolean = false;
  public loadingArchivoSeleccionado: boolean = false;

  constructor(public dataService: DataService, 
    private route: ActivatedRoute, private sanitizer: DomSanitizer, 
    public cd: ChangeDetectorRef) {
}


  ngOnInit(): void {
    this.getImagenes(true);
  }

  public previewCreate(archivo: ArchivoDTOModel) {
    let base64 = "data:image/png;base64, " + archivo.archivoDataDTO.data;
    return this.getSantizeUrl(base64);
  }

  public imagenSelectCreate(archivo: ArchivoDTOModel) {
    if(!archivo){
      return;
    }
    let base64 = "data:image/png;base64, " + archivo.archivoDataDTO.data;
    return this.getSantizeUrl(base64);
  }

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  SetPage(paginate: PaginateListModel) {
    //this.imagenes_page = paginate.page;
    //this.getImagenes(false);
  }

  selectImagen(archivo: ArchivoDTOModel) {
    this.loadingArchivoSeleccionado = true;
    this.loadingArchivoSeleccionado = false; 
    this.archivoSeleccionado = new ArchivoDTOModel();
    this.dataService.httpFunction(enumWS.ARCHIVO_DATA_LOAD,this,{},{"uuid": archivo.archivo.uuidAlternativo});
    this.cd.markForCheck();
  }

  abrirImagenNuevaVentana() {
    var image = new Image();
    //image.src = "data:image/png;base64, " + this.archivo_seleccionado.archivo_desc;

    var w = window.open("");
    w.document.write(image.outerHTML);
  }


  getImagenes(force: boolean) {
    
    this.loadingPage = true;
    let paginateListModel: PaginateListModel = new PaginateListModel(0,10);
    paginateListModel.addParameter("documentoUuid",this.documento.uuid);

    this.dataService.httpFunction(enumWS.ARCHIVO_PAGINATE_PREVIEW,this,paginateListModel,{});
    
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
          if (this.paginateData){
            this.archivoSeleccionado = data[0];
          }else{
            
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

    responseError(urlResource: string, httpOperation: string, data: any, ws?: any) {
    }
}

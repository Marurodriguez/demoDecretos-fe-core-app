import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PaginateListModel } from '../../../../../../../coreApp/src/app/models/PaginateList.model';
import { PaginateDataModel } from '../../../../../../../coreApp/src/app/models/PaginateData.model';
import { ArchivoModel } from '../../../../models/Archivo.model';
import { DataService } from '../../../../../../../coreApp/src/app/services/data.services';
import { ActivatedRoute } from '@angular/router';
import { enumWS } from '../../../../navigation/ws/ws-routes.config';
import { ArchivoDTOModel } from '../../../../models/ArchivoDTO';


/**
 * El componente se encarga de cargar la imagen grande
 */

@Component({
  selector: 'documento-imagen-zoom',
  templateUrl: './imagen-zoom.component.html',
  styleUrls: ['./imagen-zoom.component.scss']
})




export class ImagenZoomComponent implements OnInit {
  /************************************************************************************************************************
   * Inputs && Outputs && Properties
   *
   ************************************************************************************************************************/
  private _uuidImagen: string = "";
  @Input() 
    set uuidImagen(value: string){
      this._uuidImagen = value;
    }
    get uuidImagen(): string {
      return this._uuidImagen;
    }
  
  /************************************************************************************************************************
   * Variables
   *
   ************************************************************************************************************************/
    public visible: boolean = false;  // Flag que indica si se esta cargando un proceso
    public imagen: ArchivoDTOModel = new ArchivoDTOModel();
  
   /************************************************************************************************************************
   * Constructor && Eventos del Componente
   *
   ************************************************************************************************************************/
    constructor(public dataService: DataService, 
      private route: ActivatedRoute, private sanitizer: DomSanitizer, 
      public cd: ChangeDetectorRef) {
    }

    ngOnInit(): void {
      this.refresh();
    }

    ngOnChanges(changes: SimpleChanges): void {
      this.refresh();
    }

    public changeUuid(uuid: string){
      this._uuidImagen = uuid;
      this.refresh();
    }

    
   /************************************************************************************************************************
   * FUNCIONES
   *
   ************************************************************************************************************************/
    /**
     * Obtiene el SRC de la Imagen 
     * @returns 
     */
    public getSRC() {
      if(! (this.imagen && this.imagen.archivoDataDTO && this.imagen.archivoDataDTO.data!='')){
        return this.getSantizeUrl("");
      }
      if(this.visible == false){
        return this.getSantizeUrl("");
      }

      let base64 = "data:image/png;base64, " + this.imagen.archivoDataDTO.data;
      return this.getSantizeUrl(base64);
    }

    public getSantizeUrl(url: string) {
      return this.sanitizer.bypassSecurityTrustUrl(url);
    }


    /**
     * Se ejecuta cuando el usuario hace clic en la pantalla
     */
    clickPantalla() {
      this.visible = false;
    }

    /**
     * Abre una imagen en otra ventana
     * TODO: ESTO SE DEBERIA HACER DE OTRA MANERA.
     * @returns 
     */

    abrirImagen() {
      var image = new Image();
      image.src = "data:image/png;base64, " + this.imagen.archivoDataDTO.data;
        try {
          var w = window.open("Imagen");
          w.document.write(image.outerHTML);
          w.document.title = "vDig - Imagen";
        }catch(ex){
          return;
        }
    }

    /**
     * Carga la imagen desde el backend
     * @returns 
     */

    refresh() {
      if(this.uuidImagen == ''){
        return;
      }
      this.visible = false;   
      this.dataService.httpFunction(enumWS.ARCHIVO_DATA_LOAD,this,{},{"uuid": this.uuidImagen});
      this.cd.markForCheck();
    }


   /************************************************************************************************************************
   *
   * RESPONSE OK/ERROR
   *
   ************************************************************************************************************************/

    responseOk(httpOperation: any, http: string, data: any, ws: any) {
      switch (ws.enumUrl) {
         case enumWS.ARCHIVO_DATA_LOAD:
          this.imagen = data;
          this.visible = true;
          this.cd.markForCheck();
        break;  
      }
    }

    responseError(urlResource: string, httpOperation: string, data: any, ws?: any) {
    }
}

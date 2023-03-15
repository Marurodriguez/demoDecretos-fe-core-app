import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../../../../../coreApp/src/app/app.config';
import { AuthUserService } from '../../../../../../coreApp/src/app/shared/auth/auth-user.service';
import { DocumentoModel } from '../../../models/Documento.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ArchivoModel } from '../../../models/Archivo.model';
import { DataService } from '../../../../../../coreApp/src/app/services/data.services';
import { FunctionService } from '../../../../../../coreApp/src/app/services/function.services';
import { DocumentosPaginateFiltrosModel } from '../../../models/DocumentosPaginateFiltros.model';
import { enumWS } from '../../../navigation/ws/ws-routes.config';
import { TitleBarService } from '../../../services/TitleBar.service';
import { UserService } from '../../../services/User.service';
import { ArchivoDTOModel } from '../../../models/ArchivoDTO';
import { PaginateListModel } from '../../../../../../coreApp/src/app/models/PaginateList.model';
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {
  public documento: DocumentoModel;

  public pdf: ArchivoDTOModel;
  public documentoUuid: String = "";
  public downloadingPdf: boolean = false;
  public navClases = { informacion: 'active', imagenes: '', texto: '', pdf: '' };
  public divClases = { informacion: '', imagenes: 'hide', texto: 'hide', pdf: 'hide' };

  constructor(public dataService: DataService, 
              private route: ActivatedRoute, private sanitizer: DomSanitizer, 
              public cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.documentoUuid =this.route.snapshot.paramMap.get("documento_uuid") ?? "";
    
    
    this.getInformacion(true);
  }


  getInformacion(force: boolean) {
    if (this.documento && !force) return;
    this.dataService.httpFunction(enumWS.DOCUMENTO_GET_UUID,this,{},{"uuid":this.documentoUuid});

  }

  getTextoOcr(force: boolean) {
    // if (this.documento.ocr_texto_desc && !force) return;
    // fetch(this.server + "documento/detalles/ocrtexto/" + this.documento_uuid, { method: 'GET', headers: this.headers })
    //   .then(response => {
    //     response.text().then(text => {
    //       if (response.status == 200) {
    //         this.documento.ocr_texto_desc = text;
    //       } else {
    //         console.error("Error texto ocr");
    //         console.error(response);
    //         this.documento.ocr_texto_desc = "Error en la respuesta del servidor";
    //       }
    //       this.cd.markForCheck();
    //     });
    //   })
    //   .catch(error => console.error('error getTextoOcr', error));
  }

  public clickDownloadFile() {
    
    // Si ya existe el pdf descargarlo
    /*if(this.pdf != undefined){
      this.procesarPDF();
    }*/
    // Hay un solo PDF por documento, pero el backend está preparado para devolver más.
    let paginateList: PaginateListModel = new PaginateListModel(0,1);
    paginateList.addParameter("documentoUuid",this.documento.uuid);
    paginateList.addParameter("tipo","pdf");

    this.downloadingPdf = true;
    this.dataService.httpFunction(enumWS.ARCHIVO_PAGINATE_TIPO,this,paginateList);

    // this.downloadingPdf = true;
    // this.cd.markForCheck();

    // if (this.documento.pdf) {
    //   this.downloadFile();
    //   return;
    // }

    // fetch(this.server + "documento/pdf/" + this.documento_uuid, { method: 'GET', headers: this.headers })
    //   .then(response => {
    //     response.text().then(text => {
    //       if (response.status == 200) {
    //         var archivo = JSON.parse(text);
    //         this.documento.pdf = archivo;
    //         this.downloadFile();
    //       } else {
    //         console.error("Error texto ocr");
    //         console.error(response);
    //         alert("Error al descargar el archivo desde el servidor");
    //       }
    //       this.downloadingPdf = false;
    //       this.cd.markForCheck();
    //     });
    //   })
    //   .catch(error => console.error('error getTextoOcr', error));
  }

  procesarPDF() {
    var base64str: String = this.pdf.archivoDataDTO.data;
    var binary = atob(base64str.replace(/\s/g, ''));
    var len = binary.length;
    var buffer = new ArrayBuffer(len);
    var view = new Uint8Array(buffer);
    for (var i = 0; i < len; i++) {
      view[i] = binary.charCodeAt(i);
    }
    var blob = new Blob([view], { type: "application/pdf" });
    var link = document.createElement('a');
    console.log(link);
    link.href = window.URL.createObjectURL(blob);
    link.download = `${this.documento.prefijo}-${this.documento.numeroExpediente}-${this.documento.anio}.pdf`;
    link.target = "_blank";
    link.click();
    link.remove();
    this.downloadingPdf = false;
    this.cd.markForCheck();
  }


  public navigate(route): void {
    let tabs = ['informacion', 'imagenes', 'texto', 'pdf'];
    tabs.forEach(tab => {
      if (tab == route) {
        this.navClases[tab] = 'active';
        this.divClases[tab] = '';
      } else {
        this.navClases[tab] = '';
        this.divClases[tab] = 'hide';
      }
    });

    switch (route) {
      case 'informacion':
        break;
      case 'imagenes':
        break;
      case 'texto':
        this.getTextoOcr(false);
        break;
      case 'pdf':
        break;
      default:
        console.error("No existe la ruta");
        console.error(route);
        break;
    }
  }

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }


 /************************************************************************************************************************
   *
   * RESPONSE OK/ERROR
   *
   ************************************************************************************************************************/

 responseOk(httpOperation: any, http: string, data: any, ws: any) {
  switch (ws.enumUrl) {
    case enumWS.DOCUMENTO_GET_UUID:
      this.documento = data;
      this.cd.markForCheck();
      break;
    case enumWS.ARCHIVO_PAGINATE_TIPO:
      this.pdf = data.content[0]; //Si hay un elemento
      this.downloadingPdf = false;
      this.procesarPDF();
      this.cd.markForCheck();
  }
}

responseError(urlResource: string, httpOperation: string, data: any, ws?: any) {
}

}

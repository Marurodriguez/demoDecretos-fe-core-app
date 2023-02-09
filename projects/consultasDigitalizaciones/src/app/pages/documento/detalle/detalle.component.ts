import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../../../../../coreApp/src/app/app.config';
import { AuthUserService } from '../../../../../../coreApp/src/app/shared/auth/auth-user.service';
import { DocumentoModel } from '../../../models/Documento.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ArchivoModel } from '../../../models/Archivo.model';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {
  public documento: DocumentoModel;
  public server: string;
  public documento_uuid: string;
  public headers: Headers;
  public downloadingPdf: boolean = false;
  public navClases = { informacion: 'active', imagenes: '', texto: '', pdf: '' };
  public divClases = { informacion: '', imagenes: 'hide', texto: 'hide', pdf: 'hide' };

  constructor(private appConfig: AppConfig, public authUserService: AuthUserService, private route: ActivatedRoute, private sanitizer: DomSanitizer, public cd: ChangeDetectorRef) {
    this.server = this.appConfig.getConfig("server", "");

    this.route.params.subscribe(params => {
      this.documento_uuid = params['documento_uuid'];
    });

    this.headers = new Headers();
    this.headers.append("Content-Type", "application/json");
    this.headers.append("Accept", "application/json");
    this.headers.append('Authorization', this.authUserService.getCredentials().toString());
  }

  getInformacion(force: boolean) {
    if (this.documento && !force) return;
    fetch(this.server + "documento/detalles/" + this.documento_uuid, { method: 'GET', headers: this.headers })
      .then(response => response.text())
      .then(data => {
        let obj: DocumentoModel = JSON.parse(data);
        this.documento = obj;
        this.cd.markForCheck();
        console.log("Documento response", this.documento);
      })
      .catch(error => console.error('error getInformacion', error));
  }

  getTextoOcr(force: boolean) {
    if (this.documento.ocr_texto_desc && !force) return;
    fetch(this.server + "documento/detalles/ocrtexto/" + this.documento_uuid, { method: 'GET', headers: this.headers })
      .then(response => {
        response.text().then(text => {
          if (response.status == 200) {
            this.documento.ocr_texto_desc = text;
          } else {
            console.error("Error texto ocr");
            console.error(response);
            this.documento.ocr_texto_desc = "Error en la respuesta del servidor";
          }
          this.cd.markForCheck();
        });
      })
      .catch(error => console.error('error getTextoOcr', error));
  }

  public clickDownloadFile() {
    this.downloadingPdf = true;
    this.cd.markForCheck();

    if (this.documento.pdf) {
      this.downloadFile();
      return;
    }

    fetch(this.server + "documento/pdf/" + this.documento_uuid, { method: 'GET', headers: this.headers })
      .then(response => {
        response.text().then(text => {
          if (response.status == 200) {
            var archivo = JSON.parse(text);
            this.documento.pdf = archivo;
            this.downloadFile();
          } else {
            console.error("Error texto ocr");
            console.error(response);
            alert("Error al descargar el archivo desde el servidor");
          }
          this.downloadingPdf = false;
          this.cd.markForCheck();
        });
      })
      .catch(error => console.error('error getTextoOcr', error));
  }

  downloadFile() {
    var base64str: string = this.documento.pdf.archivo_desc;
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
    link.download = `${this.documento.prefijo}/${this.documento.numero_expediente}/${this.documento.anio}.pdf`;
    link.target = "_blank";
    link.click();
    link.remove();
    this.downloadingPdf = false;
    this.cd.markForCheck();
  }


  public navegate(route): void {
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

  ngOnInit(): void {
    this.getInformacion(true);
  }
}

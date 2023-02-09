import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PaginateListModel } from '../../../../../../../coreApp/src/app/models/PaginateList.model';
import { PaginateDataModel } from '../../../../../../../coreApp/src/app/models/PaginateData.model';
import { ArchivoModel } from '../../../../models/Archivo.model';

@Component({
  selector: 'app-imagen',
  templateUrl: './imagen.component.html',
  styleUrls: ['./imagen.component.scss']
})
export class ImagenComponent implements OnInit {
  @Input() documento;
  @Input() documento_uuid;
  @Input() server;
  @Input() headers;

  public paginateData: PaginateDataModel = new PaginateDataModel();
  public archivo_seleccionado: ArchivoModel;
  public imagenes_page: Number = 0;
  public imagenes_page_ant: Number = 0;
  public loading_page: boolean = false;
  public loading_archivo_seleccionado: boolean = false;

  constructor(private sanitizer: DomSanitizer, public cd: ChangeDetectorRef) { }


  ngOnInit(): void {
    this.getImagenes(true);
  }

  public previewCreate(archivo: ArchivoModel) {
    let base64 = "data:image/png;base64, " + archivo.preview_desc;
    return this.getSantizeUrl(base64);
  }

  public imagenSelectCreate(archivo: ArchivoModel) {
    let base64 = "data:image/png;base64, " + archivo.archivo_desc;
    return this.getSantizeUrl(base64);
  }

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  SetPage(paginate: PaginateListModel) {
    this.imagenes_page = paginate.page;
    this.getImagenes(false);
  }

  selectImagen(uuid: String) {
    this.loading_archivo_seleccionado = true;
    this.cd.markForCheck();

    fetch(`${this.server}documento/detalles/archivos/${uuid}`, {
      method: 'GET',
      headers: this.headers,
      redirect: 'follow'
    })
      .then(response => response.text())
      .then(result => {
        this.archivo_seleccionado = JSON.parse(result);
        this.loading_archivo_seleccionado = false;
        this.cd.markForCheck();
      })
      .catch(error => console.log('error', error));
  }

  abrirImagenNuevaVentana() {
    var image = new Image();
    image.src = "data:image/png;base64, " + this.archivo_seleccionado.archivo_desc;

    var w = window.open("");
    w.document.write(image.outerHTML);
  }


  getImagenes(force: boolean) {
    if (this.documento.archivos && !force && this.imagenes_page == this.imagenes_page_ant) return;
    this.loading_page = false;
    fetch(`${this.server}documento/detalles/archivos`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        "page": this.imagenes_page,
        "size": 4,
        "paginateParametersList": [
          {
            "name": "documento_uuid",
            "operation": "=",
            "value": this.documento_uuid,
            "fieldType": "string"
          }
        ],
        "orderFieldsList": []
      }),
      redirect: 'follow'
    })
      .then(response => response.text())
      .then(result => {
        this.paginateData = JSON.parse(result);
        if (!this.archivo_seleccionado) {
          let selImg = false;
          this.paginateData.content.forEach((arc: ArchivoModel) => {
            if (!this.archivo_seleccionado && !selImg) {
              this.selectImagen(arc.uuid);
              selImg = true;
            }
          });
        }
        this.cd.markForCheck();
        this.loading_page = true;
      })
      .catch(error => console.error('error getImagenes', error));
  }
}

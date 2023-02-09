import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent implements OnInit {
  @Input() documento;
  @Input() documento_uuid;
  @Input() server;
  @Input() headers;

  public downloading: boolean = false;

  constructor(private sanitizer: DomSanitizer, public cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  public generatePdfUrl() {
    console.log('generatePdfUrl', this.documento.pdf);
    let url = "data:application/pdf;base64, " + this.documento.pdf.archivo_desc;

    return this.getSantizeUrl(url);
  }

  public downloadFile() {
    this.downloading = true;
    this.cd.markForCheck();

    fetch(this.server + "documento/pdf/" + this.documento_uuid, { method: 'GET', headers: this.headers })
      .then(response => {
        response.text().then(text => {
          if (response.status == 200) {
            var archivo = JSON.parse(text);
            var base64str: string = archivo.archivo_desc;
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
            link.download = archivo.uuid + '.pdf';
            link.target = "_blank";
            link.click();
            link.remove();
          } else {
            console.error("Error texto ocr");
            console.error(response);
            alert("Error al descargar el archivo desde el servidor");
          }
          this.downloading = false;
          this.cd.markForCheck();
        });
      })
      .catch(error => console.error('error getTextoOcr', error));


  }
}


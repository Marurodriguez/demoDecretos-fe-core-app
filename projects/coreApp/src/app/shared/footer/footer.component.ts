import { Component, HostBinding } from '@angular/core';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent {
  //Variables
  currentDate: Date = new Date();
  public empresa: string = "";
  public urlEmpresa: string = "";

  constructor(public configService: ConfigService) {
    this.empresa = this.configService.proyectConfig.empresa;
    this.urlEmpresa = this.configService.proyectConfig.urlEmpresa;
  }
}

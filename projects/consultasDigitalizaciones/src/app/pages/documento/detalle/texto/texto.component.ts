import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AppConfig } from '../../../../../../../coreApp/src/app/app.config';
import { AuthUserService } from '../../../../../../../coreApp/src/app/shared/auth/auth-user.service';

@Component({
  selector: 'app-texto',
  templateUrl: './texto.component.html',
  styleUrls: ['./texto.component.scss']
})
export class TextoComponent implements OnInit {
  @Input() documento;
  public server: string;

  constructor(private appConfig: AppConfig, public authUserService: AuthUserService, public cd: ChangeDetectorRef) {
    this.server = this.appConfig.getConfig("server", "");
  }

  ngOnInit(): void { }
}

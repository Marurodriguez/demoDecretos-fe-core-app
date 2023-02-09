import { ConfigService } from '../../../coreApp/src/app/shared/services/config.service';
import { Component, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ProyectConfigModel } from './../../../coreApp/src/app/models/proyect-config.model';
import { enumWS, wsRoutesList } from './navigation/ws/ws-routes.config';
import 'rxjs/Rx';
import { DataService } from '../../../coreApp/src/app/services/data.services';
import { NgLoadingSpinnerTemplateDirective } from '@ng-select/ng-select/lib/ng-templates.directive';
import { AuthUserService } from '../../../coreApp/src/app/shared/auth/auth-user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor(private router: Router, public configService: ConfigService, public dataService: DataService,
    public authUserService: AuthUserService) {

  }

  ngOnInit() {
    this.setProyectConfiguration();

    this.subscription = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => window.scrollTo(0, 0));
  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  /**
   * Permite setear la configuración del proyecto.
   */
  setProyectConfiguration() {
    let pc = new ProyectConfigModel();

    //SIDEBAR!
    pc.sideBarImg = "assets/contablePlus/img/bg-003.jpg"

    pc.name = "digitalizacion";
    pc.title = "Digitalizacion";
    pc.icon = "";
    pc.image = "assets/contablePlus/img/logo.png";
    pc.imageClass = "clear";
    pc.userAuthenticatedMode = "basic";
    pc.loginUrl = enumWS.LOGIN;
    pc.loginImg = "assets/contablePlus/img/login.png";
    pc.routesList = wsRoutesList;
    pc.empresa = "SM";
    pc.urlEmpresa = "https://sm-soluciones.com";
    pc.loginUserName = "admin";
    pc.loginPassWord = "123";
    pc.loginHide = false;
    pc.loginAutoLogin = true;
    this.configService.proyectConfig = pc;
    this.configService.templateConf.layout.menuPosition = "Side"; //Side o Top
    this.configService.templateConf.layout.sidebar.backgroundColor = 'bg-glass-3';// 'bg-glass-3';
    this.dataService.setRoutesList(pc.routesList);
    if (pc.loginHide) {
      this.authUserService.createUser(pc.loginUserName, pc.loginPassWord);

    }
  }

}
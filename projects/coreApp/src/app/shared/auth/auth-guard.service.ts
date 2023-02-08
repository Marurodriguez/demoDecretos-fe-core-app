import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserModel } from '../../models/user.model';
import { ProyectConfigModel } from '../../models/proyect-config.model';
import { ConfigService } from '../../../../../coreApp/src/app/shared/services/config.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, public configService: ConfigService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    if(this.configService.proyectConfig.loginHide === true) {
      return true;
    }
    let isAuth = this.authService.isAuthenticated();
    if (!isAuth) {
      this.router.navigate(['/pages/login']);
    }
    else {
      return true;
    }
  }
}

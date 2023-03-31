import { Injectable } from '@angular/core';
import { ActivationStart } from '@angular/router';
import { UserModel } from '../../../../coreApp/src/app/models/user.model';
import { AuthUserService } from '../../../../coreApp/src/app/shared/auth/auth-user.service';
import { UsuarioModel } from '../models/Usuario.model';
import { PageComponentInterface } from '../pages/_PageInterface/PageComponentInterface';


@Injectable()
export class UserService {
  public pageComponentActive: PageComponentInterface;

  constructor (public authUserService: AuthUserService) {

  }
  /**
   * Setea el componente activo para avisar si hay cambios 
   * @param pageComponent 
   */
  public setPageComponentActive(pageComponent: any){
    this.pageComponentActive = pageComponent;
  }
  public getPageComponentActive(): PageComponentInterface{
    return this.pageComponentActive;
  }

  public getUser(): UserModel{
    return this.authUserService.getUser();
  }
  
}

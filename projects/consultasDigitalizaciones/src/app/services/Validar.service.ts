import { Injectable } from '@angular/core';
import { AuthUserService } from '../../../../coreApp/src/app/shared/auth/auth-user.service';
import { UsuarioModel } from '../models/Usuario.model';


@Injectable()
export class ValidarService {

  constructor (public userService: AuthUserService) {

  }


}

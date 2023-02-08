import { AuthUserService } from './auth-user.service';
import { enumURL } from './../../ws/ws-routes.config';
import { DataService } from './../../services/data.services';
import { ConfigService } from '../../../../../coreApp/src/app/shared/services/config.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
// import { User } from 'firebase';
import { Observable } from 'rxjs';
import { AppConfig } from '../../app.config';
import { UserModel } from '../../models/user.model';
import { FunctionService } from '../../services/function.services';

@Injectable()
export class AuthService {
  // public user: UserModel = new UserModel();
  public userAuthenticated: boolean = false;
  public componentCall: any;
  // private userDetails: firebase.User = null;

  constructor(public _firebaseAuth: AngularFireAuth, public router: Router, public appConfig: AppConfig, public functionService: FunctionService,
              public configService: ConfigService, public dataService: DataService, public authUserService: AuthUserService) {

                //Load from appconfig
    let dataInfo = this.appConfig.getConfig("user",null);
    if(dataInfo != null){
      this.authUserService.createUser(dataInfo.username, dataInfo.password);
      this.authUserService.setDataUser(dataInfo);
      this.configService.proyectConfig.userName = this.authUserService.getUser().username;
      this.configService.proyectConfig.userDesc = this.authUserService.getUser().data.nombre;
      this.dataService.setRoutesList(this.configService.proyectConfig.routesList);
      this.userAuthenticated =true;
    }

  }

  signupUser(username: string, password: string) {
    //your code for signing up the new user
  }



  signinUser(username: string, password: string, component: any) {
    //your code for checking credentials and getting tokens for for signing in user
    // return this._firebaseAuth.signInWithEmailAndPassword(email, password)

    //uncomment above firebase auth code and remove this temp code
    // return new Promise(function(resolve, reject) {
    //   setTimeout(function() {
    //     resolve(true);
    //   }, 1000);
    // });

    //SET DATASERVICE WSROUTES
    this.dataService.setRoutesList(this.configService.proyectConfig.routesList);

    this.componentCall = component;
    let body = {};
    let parameter = {};
    this.userAuthenticated = false;
    this.authUserService.createUser(username,password);
    this.dataService.httpFunction(this.configService.proyectConfig.loginUrl,this,body,parameter);
  }

  /**
   * Devuelve el Username dependiendo del campo seleccionado en la configuración del proyecto
   * @param user
   * @returns
   */
  private getUserName(user: UserModel): string {
    if(this.configService.proyectConfig.fieldUserName == undefined || this.configService.proyectConfig.fieldUserName == "") {
      return user.username;
    }else{
      try {
        let userName: string =  this.functionService.getValueFromObject(user,this.configService.proyectConfig.fieldUserName);
        if(userName == "") {
          return user.username;
        }else{
          return userName;
        }
      }catch(ex){
        return user.username;
      }
    }
  }


  /**
   * Devuelve la Descripción (o segunda linea del usuario) dependiendo del campo seleccionado en la configuración del proyecto
   * @param user
   * @returns
   */
  private getUserDesc(user: UserModel): string {
    if(this.configService.proyectConfig.fieldUserDesc == undefined || this.configService.proyectConfig.fieldUserDesc == "") {
      return "";
    }else{
      try {
        let userDesc: string =  this.functionService.getValueFromObject(user,this.configService.proyectConfig.fieldUserDesc);
        if(userDesc == "") {
          return "";
        }else{
          return userDesc;
        }
      }catch(ex){
        return "";
      }
    }
  }

  public responseOk(urlResource: string, http: string, data: any, ws: any) {
    //Todos los que lleguen van a ser Login.
    this.authUserService.setDataUser(data);
    this.userAuthenticated = true;
    this.configService.proyectConfig.userName = this.getUserName(this.authUserService.getUser());
    this.configService.proyectConfig.userDesc = this.getUserDesc(this.authUserService.getUser())


    //this.dataService.user = this.user;
    this.componentCall.responseLogin(this.authUserService.getUser(), 1);
  }

  public responseError(urlResource: string, httpOperation: string, data: any, ws: any){
    //console.error("login", urlResource,httpOperation,data,ws );
    let codeError: number = -2;
    if(data && data?.error?.status == 401){
      codeError = -1; //Usuario o contraseña incorrectas
    }else{
      codeError = -2; //Cualquier otro error del servidor.
    }
    this.componentCall.responseLogin(this.authUserService.getUser(), codeError);
  }
  logout() {
    this._firebaseAuth.signOut();
    this.router.navigate(['YOUR_LOGOUT_URL']);
  }

  isAuthenticated() {
    return this.userAuthenticated; //HARDCODE!
  }
}

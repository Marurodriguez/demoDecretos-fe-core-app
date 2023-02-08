import { Injectable, isDevMode } from '@angular/core';
// import { AuthUser } from './authUser';
import { Router } from '@angular/router';
import { DataService } from './data.services';
import { HttpClient } from '@angular/common/http';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { WsService } from './ws.Service';
import * as shajs from 'sha.js'
import { Config } from 'protractor';
// import { AppConfig } from 'app/app.config';
// import { User } from 'app/entities/user';
import { ConfigService } from './config.services';

@Injectable()
export class AuthService implements CanActivate {
  // public user: string = "";
  // private authenticated: boolean = false;
  // private auth: string = "";
  // private objectCalled: any;

  // //Object Logical
  // private _authUser: AuthUser = undefined;

  // public constructor(private router: Router, private config: ConfigService, private http: HttpClient, private ws: WsService, private appConfig: AppConfig) { }

  // private URL_LOGIN = "URL_LOGIN";

  // https = [
  //   { name: "URL_LOGIN", url: "user/login", httpOperation: "post" },
  // ]




  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;
  }


  //   switch (state.url.toLowerCase()) {
  //     case "/pages/login":
  //       return true;
  //     //break;
  //     default:
  //       if (!this.authenticated) {
  //         this.router.navigate(['/pages/login']);
  //         return false;
  //       }else{
  //         return true;
  //       }
  //     }
  // }

  // public isAdmin():boolean{
  //   if(this.isAuthenticated() == false){
  //     return false;
  //   }
  //   return this._authUser.admin;
  //   //return true;
  // }
  // public isAuthenticated(): boolean {
  //   return this.authenticated;
  // }

  // public setAuth(user: string, pass: string) {
  //   this.user = user;
  //   this.auth = 'Basic ' + btoa(user + ':' + pass);
  // }

  // public getAuthCredentials(): string {
  //   return this.auth;
  // }

  // public getAuthUser(): AuthUser {
  //   return this._authUser;
  // }

  // public login(username: string, password: string, objectCalled?: any) {

  //   let pass = shajs('sha256').update(password).digest('hex');
  //   let body = { "usuario": username.toLowerCase(), "password": pass };
  //   this.setAuth(username, password);
  //   this.objectCalled = objectCalled;

  //   this.ws.httpFunction(this.URL_LOGIN, this, body, "", false, this.https, this.auth);
  //   //this.dataService.httpFunction(this.dataService.URL_LOGIN, this, body, {});
  // }


  // private loggedOK(id: number, extraObj: any) {
  //   console.log("loggedOk", extraObj);

  //   this.authenticated = true;
  //   this._authUser = new AuthUser();
  //   this._authUser.id = id;

  //   /// Load User
  //   let  user: User = extraObj;

  //   this._authUser.admin = user.esp == 1;
  //   // this.config.configs = extraObj.configs;
  //   this._authUser.userName = user.usuario;
  //   this._authUser.principal = user;
  //   this._authUser.dateLogin = new Date();
  // }


  // // logging(){
  // //   const httpHeaders = new HttpHeaders ({
  // //     'Content-Type': 'application/json',
  // //     'Authorization': this.authService.getAuthCredentials()
  // //   });
  // // }


  // responseOk(urlResource: string, http: string, data: any, ws: any) {
  //   switch (ws.name) {
  //     case this.URL_LOGIN:
  //       this.loggedOK(data.id, data);
  //       if (this.objectCalled) {
  //         this.objectCalled.responseOk(urlResource, http, data, ws);
  //       }
  //       return;
  //   }

  // }



  // responseError(urlResource: string, httpOperation: string, data: any, ws: any) {
  //   switch (ws.name) {
  //     case this.URL_LOGIN:
  //       this.authenticated = false;
  //       if (this.objectCalled) {
  //         this.objectCalled.responseError(urlResource, httpOperation, data, ws);
  //       }
  //       break;
  //   }

  // }
}

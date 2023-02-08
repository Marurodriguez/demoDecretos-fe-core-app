import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user.model';

@Injectable()
export class AuthUserService {
  private user: UserModel = new UserModel();

  constructor(){

  }

  // Genera las credenciales para conectarse por basic auth
  private createCredentials(username: string, password: string): string {
    return 'Basic ' + btoa(username + ':' + password);
  }
  public createUser(username: string, password: string){
    this.user = new UserModel();
    this.user.username = username;
    this.user.credentials = this.createCredentials(username, password);
  }

  public setDataUser(data: any){
    this.user.data = data;
    if(this.user.data && this.user.data.role) {
      this.user.roles = this.user.data.roles;
    }
    if(data.roles) {
      this.user.roles = data.roles;
    }
    if( this.user.admin ) {
      this.user.admin = this.user.data.admin;
    }

  }
  public getUser(){
    return this.user;
  }
  public getCredentials(): string{
    return this.user?.credentials;
  }


}

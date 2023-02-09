import { Injectable } from '@angular/core';
import { ActivationStart } from '@angular/router';
import { UserModel } from '../../../../coreApp/src/app/models/user.model';
import { AuthUserService } from '../../../../coreApp/src/app/shared/auth/auth-user.service';
import { EmpresaModel } from '../models/Empresa.model';
import { UsuarioModel } from '../models/Usuario.model';
import { PageComponentInterface } from '../pages/_PageInterface/PageComponentInterface';


@Injectable()
export class UserService {
  public empresaSelected:EmpresaModel;
  public empresaAntSelected: EmpresaModel; // Muestra la empresa anterior!
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
  public getEmpresas(): EmpresaModel[] {
    let user: UserModel;
    user = this.authUserService.getUser();
    let empresas: EmpresaModel[] = user.getData("empresaList",[]);
    return empresas;
  }
  public getIdEmpresaSelected(): number {
    let empresa:EmpresaModel = this.getEmpresaSelected();
    if(empresa){
      return empresa.id;
    }else{
      return -1;
    }
  }

  public getEmpresaSelected(): EmpresaModel{
    if(this.empresaSelected == undefined){
      this.empresaSelected = this.getEmpresas()[0];
      this.empresaAntSelected = this.empresaAntSelected;
    }
    
    return this.empresaSelected;
  }
  public setEmpresaSelected(empresaSel: EmpresaModel){
    for(let empresa of this.getEmpresas()){
      if(empresa.id == empresaSel.id){
        this.empresaAntSelected = this.empresaSelected;
        this.empresaSelected = empresa;
        this.alertarCambioEmpresa();
        return;
      }
    }
  }

  alertarCambioEmpresa(){
    if(this.pageComponentActive != undefined){
      this.pageComponentActive.changeEmpresa(this.empresaSelected,this.empresaAntSelected);
    }
  }
}

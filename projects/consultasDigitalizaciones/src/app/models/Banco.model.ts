import { EmpresaModel } from "./Empresa.model";


export class BancoModel{
  public id: number = 0;

  public nombre: string = "";
  public direccion: string = "";
  public numeroCuenta: string = "";
  public tipoCuenta: string = "";
  public saldo: number = 0;
  public descripcion: string = "";


  constructor() {

  }

}

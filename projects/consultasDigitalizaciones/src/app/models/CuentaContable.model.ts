import { AbstractModel } from "./Abstract.model";

export class CuentaContableModel extends AbstractModel {

  public codigo: string = '';
  public nombre: string = '';
  public icon: string = '';
  public color: string = '';
  public descripcion: string = '';
  public tipo: string = '';
  public esp: number = 0;
  public orden: number = 0;
  public tieneSubCuentas: number = 0;
  public rutaCompleta: string = "";



  //DTO-->para guardar en el backend
  public idEmpresa: number = 0; //ID de la empresa
  public idParent: number = 0; //ID del padre

  /**
   * VIRTUALES
   */
  public modeEdit: boolean = false; 
  public saldoInicial: number = 0; //HARDCODE
  public neg: number = 1;
  public childrens: CuentaContableModel[] = [];

  constructor(nombre: string){
    super();
    this.nombre = nombre;
  }
  
}


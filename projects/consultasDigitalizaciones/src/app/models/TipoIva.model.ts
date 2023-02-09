import { AbstractModel } from "./Abstract.model";


export class TipoIva extends AbstractModel {
  public codigo: string = "";
  public nombre: string = "";
  public descripcion: string = "";
  public tipo: number = 0;

  constructor(){
    super();
  }

}


import { AbstractModel } from "./Abstract.model";
import { TipoIva } from "./TipoIva.model";


export class NegocioModel extends AbstractModel {

  public codigo: string = '';
  public nombre: string = '';
  public telefono: string = '';
  public email: string = '';

  constructor(){
    super();
  }

}


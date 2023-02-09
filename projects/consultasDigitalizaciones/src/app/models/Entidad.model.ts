import { AbstractModel } from "./Abstract.model";
import { NegocioModel } from "./Negocio.model";
import { TipoEntidad } from "./TipoEntidad.model copy";


export class EntidadModel extends AbstractModel {

  public tipoEntidad: TipoEntidad = new TipoEntidad();
  public codigo: string = '';
  public nombre: string = '';
  public telefono: string = '';
  public email: string = '';


  constructor(){
    super();
  }

}


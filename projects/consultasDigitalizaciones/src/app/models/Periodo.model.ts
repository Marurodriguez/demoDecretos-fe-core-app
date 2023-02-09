import { AbstractModel } from "./Abstract.model";
import { NegocioModel } from "./Negocio.model";
import { TipoIva } from "./TipoIva.model";


export class PeriodoModel extends AbstractModel {

  
  public fechaInicio: string = '';
  public fechaFin: string = ''; 
  public nombre: string = '';
  public descripcion: string = '';

  constructor(){
    super();
  }

}


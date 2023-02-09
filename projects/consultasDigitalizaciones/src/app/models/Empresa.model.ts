import { AbstractModel } from "./Abstract.model";
import { NegocioModel } from "./Negocio.model";
import { TipoIva } from "./TipoIva.model";


export class EmpresaModel extends AbstractModel {

  public tipoIva: TipoIva = new TipoIva();
  public codigo: string = '';
  public nombre: string = '';
  public telefono: string = '';
  public email: string = '';
  public negocioList: NegocioModel[] = [];


  constructor(){
    super();
  }

}


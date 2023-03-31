import { AbstractModel } from "../Abstract.model";
import { ClienteGrupoModel } from "../ClienteGrupo.model";
import { UsuarioClienteModel } from "../UsuarioCliente.model";


export class UsuarioClienteRequestModel extends AbstractModel {
  public uuid: string;
  public usuarioCliente: UsuarioClienteModel = new UsuarioClienteModel();
  constructor(){
    super();
  }

}


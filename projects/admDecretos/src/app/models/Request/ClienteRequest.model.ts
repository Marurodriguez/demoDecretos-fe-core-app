import { AbstractModel } from "../Abstract.model";
import { ClienteGrupoModel } from "../ClienteGrupo.model";
import { UsuarioClienteModel } from "../UsuarioCliente.model";


export class ClienteRequestModel extends AbstractModel {
  public uuid: string = ""; //Uuid del cliente: Si está vacio es un cliente nuevo

  public grupoUuid: string = "";
  public programaUuid: string = "";
  public origenUuid: string = "";

  public nombre: string = "";
  public email: string = "";
  public direccion: string = "";
  public telefono: string = "";
  public observaciones: string = "";
  public cuit: string = "";
  public nivelDemanda: number = 0;
  public destacado: number = 0;

  constructor(){
    super();
  }

}


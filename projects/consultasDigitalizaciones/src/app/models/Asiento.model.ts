import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { AbstractModel } from "./Abstract.model";
import { AsientoRegistroModel } from "./AsientoRegistro.model";
import { EmpresaModel } from "./Empresa.model";
import { NegocioModel } from "./Negocio.model";
import { TipoEntidad } from "./TipoEntidad.model copy";
import { TipoIva } from "./TipoIva.model";


export class AsientoModel extends AbstractModel {

  public empresa: EmpresaModel = new EmpresaModel();
  public negocio: NegocioModel = new NegocioModel();
  public fecha: string = "";
  public descripcion: string = "";
  public referencia: string = "";
  public debito: number = 0;
  public credito: number = 0;


  
  public registros: AsientoRegistroModel[] = [];
  public show: boolean = true; //HARDCODE
  public fechaObj: NgbDate; 

  // PARA EL DTO!!
  //Se registra para cara registro
  public entidad: TipoEntidad = new TipoEntidad(); 
  public idEmpresa: number = 0;
  public idNegocio: number = 0;
  public fechaDTO: string = "";
  public asientoRegistroDTOList: AsientoRegistroModel[] = [];

  constructor(){
    super();
  }

}


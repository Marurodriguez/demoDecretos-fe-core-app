import { AbstractModel } from "./Abstract.model";
import { AsientoModel } from "./Asiento.model";
import { CuentaContableModel } from "./CuentaContable.model";
import { EmpresaModel } from "./Empresa.model";
import { TipoEntidad } from "./TipoEntidad.model copy";
import { TipoIva } from "./TipoIva.model";


export class AsientoRegistroModel extends AbstractModel {

  public status: number = 0;
  public descripcion: string = "";
  public referencia: string = "";
  public debito: number = 0;
  public credito: number = 0;
  public cuenta: CuentaContableModel;
  public entidad: TipoEntidad = new TipoEntidad();

  //DTO:
  public asiento: AsientoModel = new AsientoModel();
  
  public idCuenta: number = 0;
  public idEntidad: number = 0;

  constructor(){
    super();
  }

}


import { wsRoutes } from "../../../../../coreApp/src/app/ws/ws-routes.metadata";

export enum enumWS {
  LOGIN = 1, // En el login se obtienen las empresas!!

  // CuentaContable
  CUENTA_CONTABLE_PAGINATE = 1000,
  CUENTA_CONTABLE_SAVE = 1001,

  // Asiento
  ASIENTO_PAGINATE = 2000,
  ASIENTO_PAGINATE_DTO = 2001,
  ASIENTO_SAVE = 2002,

  // Entidad
  ENTIDAD_PAGINATE = 3000,

  // CUENTA - RESUMEN - MAYORES
  ASIENTO_CUENTA_RESUMEN = 4000,

  // PERIODO
  PERIODO_GET_PERIODOS = 5001, //Devuelve los últimos periodos activos

  // Documento
  DOCUMENTO_PAGINATE = 6001,
  DOCUMENTO_INFORMACION = 6002,
  DOCUMENTO_CATEGORIA = 6003,

}
const moduleApp: string = "sm";

export const wsRoutesList: wsRoutes[] = [

  /***************************************    CUENTA CONTABLE   *********************************/

  {
    enumUrl: enumWS.CUENTA_CONTABLE_PAGINATE,
    url: 'cuentacontable/paginate',
    httpOperation: 'post',
    module: moduleApp,
  },
  {
    enumUrl: enumWS.CUENTA_CONTABLE_SAVE,
    url: 'cuentacontable',
    httpOperation: 'post',
    module: moduleApp
  },

  /**********************************  END - CUENTA CONTABLE ******************************/


  /***************************************    ASIENTO   *********************************/

  {
    enumUrl: enumWS.ASIENTO_SAVE,
    url: 'asiento',
    httpOperation: 'post',
    module: moduleApp
  },
  {
    enumUrl: enumWS.ASIENTO_PAGINATE_DTO,
    url: 'asiento/paginateDTO',
    httpOperation: 'post',
    module: moduleApp
  },

  /**********************************  END - ASIENTO ******************************/


  /***************************************    ENTIDAD   *********************************/

  {
    enumUrl: enumWS.ENTIDAD_PAGINATE,
    url: 'entidad/paginate',
    httpOperation: 'post',
    module: moduleApp
  },


  /**********************************  END - ENTIDAD ******************************/


  /******************   CUENTA CONTABLE ASIENTO   *********************************/

  {
    enumUrl: enumWS.ASIENTO_CUENTA_RESUMEN,
    url: 'asientoRegistro/registroCuenta',
    httpOperation: 'post',
    module: moduleApp
  },


  /**********************************  END - ENTIDAD ******************************/


  /******************   PERIODO   *********************************/

  {
    enumUrl: enumWS.PERIODO_GET_PERIODOS,
    url: 'periodo/getPeriodos',
    httpOperation: 'post',
    module: moduleApp,
    cacheable: true
  },


  /**********************************  END - ENTIDAD ******************************/


  /***************************************    SISTEMA   *********************************/
  {
    enumUrl: enumWS.LOGIN,
    url: 'user/login',
    httpOperation: 'post',
    module: moduleApp
  },
  /**********************************  END - CUENTA CONTABLE ******************************/


  /***************************************    DOCUMENTO   *********************************/
  {
    enumUrl: enumWS.DOCUMENTO_PAGINATE,
    url: 'documento/paginate',
    httpOperation: 'post',
    module: moduleApp
  },

  {
    enumUrl: enumWS.DOCUMENTO_INFORMACION,
    url: 'documento/informacion/:param',
    httpOperation: 'post',
    module: moduleApp
  },

  {
    enumUrl: enumWS.DOCUMENTO_CATEGORIA,
    url: 'documento/categoria/:param',
    httpOperation: 'post',
    module: moduleApp
  },
  /*************************************    END - DOCUMENTO   ******************************/
]

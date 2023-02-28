import { wsRoutes } from "../../../../../coreApp/src/app/ws/ws-routes.metadata";

export enum enumWS {
  LOGIN = 1, // En el login se obtienen las empresas!!

  // Documento
  DOCUMENTO_PAGINATE = 6001,
  DOCUMENTO_INFORMACION = 6002,
  DOCUMENTO_CATEGORIA = 6003,

}
const moduleApp: string = "sm";

export const wsRoutesList: wsRoutes[] = [

 
  /***************************************    SISTEMA   *********************************/
  {
    enumUrl: enumWS.LOGIN,
    url: 'user/login',
    httpOperation: 'post',
    module: moduleApp
  },
  /**********************************  END - SISTEMA ******************************/


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

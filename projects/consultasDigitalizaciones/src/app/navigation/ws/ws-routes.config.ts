import { wsRoutes } from "../../../../../coreApp/src/app/ws/ws-routes.metadata";

export enum enumWS {
  LOGIN = 1, // En el login

  // Documento
  DOCUMENTO_PAGINATE = 6001,
  DOCUMENTO_GET_UUID = 6002,
  DOCUMENTO_CATEGORIA = 6003,
  
  
  //Documento
  ARCHIVO_PAGINATE_PREVIEW = 7000, //PREVIEW_DE_IMAGENES
  ARCHIVO_DATA_LOAD = 7001,       //Carga el archivo. 
  ARCHIVO_PAGINATE_TIPO = 7002    //Hace un preview según el tipo de contenido solicitado

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
    enumUrl: enumWS.DOCUMENTO_GET_UUID,
    url: 'documento/uuid/%uuid%',
    httpOperation: 'get',
    module: moduleApp
  },

  {
    enumUrl: enumWS.DOCUMENTO_CATEGORIA,
    url: 'documento/categoria/%uuid%',
    httpOperation: 'post',
    module: moduleApp
  },
  /*************************************    END - DOCUMENTO   ******************************/

   /***************************************    ARCHIVO   *********************************/
  {
    enumUrl: enumWS.ARCHIVO_PAGINATE_PREVIEW,
    url: 'archivo/paginate-preview',
    httpOperation: 'post',
    module: moduleApp
  },
  {
    enumUrl: enumWS.ARCHIVO_DATA_LOAD,
    url: 'archivo/data/%uuid%',
    httpOperation: 'get',
    module: moduleApp
  },
  {
    enumUrl: enumWS.ARCHIVO_PAGINATE_TIPO,
    url: 'archivo/paginate-tipo',
    httpOperation: 'post',
    module: moduleApp
  },
  /*************************************    END - DOCUMENTO   ******************************/
]

import { wsRoutes } from "./ws-routes.metadata";

export enum enumURL{

  // MÓDULO DE DECRETOS***********************************************
  URL_PRODUCTO_PAGINATE = 0,
  //TODO DESCENTRALIZAR ENUMURL HACERLO EXTEND DE OTRO Y RECIBIR EL PADRE

  // MÓDULO VPLUS - 1000
  VPLUS_LOGIN = 1000,
  VPLUS_SUCURSAL_PAGINATE = 1001,
  VPLUS_SUCURSAL_REGISTROS = 1002,
  VPLUS_SUCURSAL_ESTADISTICA = 1003,
  VPLUS_SUCURSAL_GET = 1004


}

export const wsRoutesList: wsRoutes[] = [


  // CARTA DOCUMENTO

  {
    enumUrl: enumURL.URL_PRODUCTO_PAGINATE,
    url: 'producto/paginate',
    httpOperation: 'post',
    module: 'producto'
  },
  {
    enumUrl: enumURL.VPLUS_LOGIN,
    url: 'user/login',
    httpOperation: 'post',
    module: 'vplus'
  },
  {
    enumUrl: enumURL.VPLUS_SUCURSAL_PAGINATE,
    url: 'sucursal/paginate',
    httpOperation: 'post',
    module: 'vplus'
  },
  {
    enumUrl: enumURL.VPLUS_SUCURSAL_REGISTROS,
    url: 'ventas/resumenlist',
    httpOperation: 'post',
    module: 'vplus'
  },
  {
    enumUrl: enumURL.VPLUS_SUCURSAL_GET,
    url: 'sucursal/%id%',
    httpOperation: 'get',
    module: 'vplus'
  },
  {
    enumUrl: enumURL.VPLUS_SUCURSAL_ESTADISTICA,
    url: 'sucursal/estadistica',
    httpOperation: 'post',
    module: 'vplus'
  }
  //******************************************************************* */
]

import { UserModel } from './../models/user.model';
import { environment } from "./../../environments/environment";
import { HttpHeaders } from "@angular/common/http";

import { catchError, retry } from "rxjs/operators";
import { Injectable } from "@angular/core";

import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { AppConfig } from "../app.config";

import { wsRoutes } from "./../ws/ws-routes.metadata";
import { wsRoutesList, enumURL } from "./../ws/ws-routes.config";
import { AuthService } from "../shared/auth/auth.service";
import { AuthUserService } from '../shared/auth/auth-user.service';
import { map } from 'rxjs/operators';
import { pipe, Observable,throwError } from 'rxjs';



@Injectable()
export class DataService {
  private auth: string;
  private retry: number = 0;
  private serverUrl: string = "";
  private routesList: wsRoutes[] = [];
  private mapCache = new Map<String,any>();

  constructor(private http: HttpClient, private appConfig: AppConfig, public authUserService: AuthUserService) {
  }
  // public setAuthCredentials(auth: string) {
  //   this.auth = auth;
  // }

  public setRoutesList(routesList: wsRoutes[]) {
    this.routesList = routesList;
  }

  public setServerUrl(serverUrl: string) {
    this.serverUrl = serverUrl;
  }

  public getUrlByWsName(wsName: any, parameters = undefined): string {
    let element: wsRoutes = this.findWs(wsName);
    let urlResource: string = element.url;
    if(parameters != undefined) {
      urlResource = this.getParameters(element.url,parameters);
    }

    let urlApi = this.getServerUrl(element); //this.appConfig.getConfig("server", "");
    return urlApi + urlResource;
  }

  findWs(wsName: any, routesList = undefined): wsRoutes | null {
    if(routesList == undefined) {
      routesList = this.routesList;
    }else {
      if(this.routesList.length > 0) {
        routesList = this.routesList;
      }
    }
    for (let element of routesList) {
      if (element.enumUrl === wsName) {
        return element;
      }
    }
    return null;
  }

  public httpOptions(ws: any, authCredentials: String): HttpHeaders {
    let ContentType: string = "application/json";
    let httpHeaders: HttpHeaders = new HttpHeaders();

    if(ws.ContentDisposition){
      httpHeaders = httpHeaders.append('Content-Disposition',ws.ContentDisposition);
    }
    if(ws.responseType){
      httpHeaders = httpHeaders.append('responseType',ws.responseType);
    }
    if(ws.accept){
      httpHeaders = httpHeaders.append('Accept',ws.accept);
    }
    if(authCredentials){
      httpHeaders = httpHeaders.append('Authorization',authCredentials.toString());
    }
    if(ws.ContentType && ws.ContentType != ''){
       ContentType = ws.ContentType;
    }
    httpHeaders = httpHeaders.append("Content-Type",ContentType);


    return httpHeaders;
  }


  httpFunction(wsName: any, component: any, body?: any, parameters?: any, returnObservable: boolean = false) {
    let element = this.findWs(wsName, wsRoutesList);
    if (!element) {
      console.error("No se encontro el wsName=", wsName);
      return;
    }
    let authCredentials = this.authUserService.getCredentials();
    let url = this.getParameters(element.url, parameters);
    //replace parameters


    return this.httpFunctionCustom(component,element.httpOperation, url, body, element, authCredentials, returnObservable);
  }
  /**
   * Retorna el url concatenado con los parametros
   * @param url Es la url del servicio
   * @param parameters son los parametros que vienen como objeto {"id": 10}
   */
  private getParameters(url: string, parameters: any): string {

    const urlOriginal = url;
    try {
      for (let key in parameters) {
        url = url.replace("%" + key + "%", parameters[key]);
      }
    } catch (ex) {
      console.error(ex);
      return urlOriginal;
    }

    return url;
  }

  /**
   * Obtiene el servidor URL, esta función sirve cuando existen diferentes modulos que apuntan a otros servidores.
   * @param ws Información del ws service: Tiene que tener el module
   * @returns
   */
  private getServerUrl(ws: any): string {

    let urlApiPrimary = this.appConfig.getConfig("server", "");
    try {
      if(ws?.module == undefined || ws?.module == "" || ws?.external == undefined || ws?.external == false) {
        return urlApiPrimary;
      }
      let servers = this.appConfig.getConfig("servers",undefined);
      if(servers == undefined) {
        return urlApiPrimary;
      }

      for(let server of servers) {
        if (server.url != undefined && server.name !=undefined && server.name === ws.module ) {
          return server.url;
        }
      }

      //No fue encontrado: Devolver el urlPrimary
      return urlApiPrimary;
    }catch(ex) {
      return urlApiPrimary;
    }
  }


  /**
   * Agrega cache en los elementos que están seleccionados para cachearse
   * @param ws
   * @param url
   * @param authCredentials
   */
  //TODO: QUE TENGA LIMITE DE CACHE
  addWsCache(ws: any, url: string, body: string, data: any): boolean{
    if(ws.cacheable == false || ws.cacheable == undefined || ws == undefined){
      return false;
    }
    try {
      const key: string = ws.enumUrl + "_" + JSON.stringify(body);

      this.mapCache.set(key, data);
      console.info("Se agrego al cache: " + url);
      return true;
    }catch(ex){
      return false;
    }
  }


  /**
   * Retorna del cache si existe, sino vuelve undefined
   * @param ws
   * @param url
   * @param body
   */
  getWsCache(ws: any, url: string, body: string): any{
    try {
      if(ws.cacheable == false || ws.cacheable == undefined || ws == undefined){
        return undefined;
      }

      const key: string = ws.enumUrl + "_" + JSON.stringify(body);
      let data = this.mapCache.get(key);

      console.info("Se Cargo desde el cache: " + url);
      return data;
    }catch(ex){
      return undefined;
    }
  }


  httpFunctionCustom(component: any,httpOperation: string,urlResource: string, body: any, ws?: any, authCredentials?: String, returnObservable?: boolean): Observable<any>|undefined {

    let urlApi = this.getServerUrl(ws); //this.appConfig.getConfig("server", "");
    let url = urlApi + urlResource;

    let observable:  Observable<{}>;

    switch (httpOperation.toLowerCase()) {
      case "get":
        observable =  this.httpGet(ws, url, authCredentials);
        break;
      case "post":
          observable = this.httpPost(ws, url, body, authCredentials);
          break;
      case "put":
        observable =  this.httpPut(ws, url, body, authCredentials);
        break;
      case "delete":
        observable =  this.httpDelete(ws, url, authCredentials);
        break;
      case "download":
        observable =  this.httpDownload(ws, url, authCredentials);
        break;
    }
    if(returnObservable == true){
      return observable;
    }else{

      const dataCache = this.getWsCache(ws,url,body);
      if(dataCache != undefined){
        this.responseOk(component, urlResource, httpOperation, dataCache, ws,body, true);
        return undefined;
      }

      observable.subscribe(
        (data) => {
          this.responseOk(component, urlResource, httpOperation, data, ws,body);
        },
        (error) => {
          this.responseError(component, urlResource, httpOperation, error, ws);
        });
    }
  }

  public httpPostFind(url: string, body: any, authCredentials: string): Observable<any> {
    let headers: HttpHeaders = this.httpOptions(undefined, authCredentials);
    return this.http.post(url, body, { headers });
  }
  private httpDownload(ws: any, url: string, authCredentials: String): Observable<{}> {
    let headers: HttpHeaders = this.httpOptions(ws, authCredentials);
    return this.http.get(url, { headers });
  }

  private httpGet(ws: any, url: string, authCredentials: String): Observable<{}> {
    let headers: HttpHeaders = this.httpOptions(ws, authCredentials);
    return this.http.get(url, { headers }).pipe(retry(this.retry));
  }
  private httpPost(ws: any, url: string, body: any, authCredentials: String): Observable<{}> {
    let headers: HttpHeaders = this.httpOptions(ws, authCredentials);
    return this.http.post(url, body, { headers }).pipe(retry(this.retry));
  }
  private httpPut(ws: any,url: string, body: any, authCredentials: String): Observable<{}> {
    let headers: HttpHeaders = this.httpOptions(ws, authCredentials);
    return this.http.put(url, body, { headers }).pipe(retry(this.retry));
  }
  private httpDelete(ws: any,url: string,authCredentials: String): Observable<{}> {
    let headers: HttpHeaders = this.httpOptions(ws, authCredentials);
    return this.http.delete(url, { headers }).pipe(retry(this.retry));
  }

  private responseOk(component: any,urlResource: string,httpOperation: string, data: any, ws?: any, body?: any, isCache?: boolean) {
    console.info("responseOk: " + urlResource, data);
    if(isCache == undefined || isCache == false ) {
      this.addWsCache(ws,urlResource,body,data);
    }
    component.responseOk(urlResource, httpOperation, data, ws);
  }

  private responseError(component: any,urlResource: string,httpOperation: string, data: any, ws?: any) {
    try{
      //Se redirecciona al responseOK
      if((data.status >= 200 && data.status <300)) {
        this.responseOk(component, urlResource, httpOperation, data.error.text, ws);
        //component.responseOk(urlResource, httpOperation, data.error.text, ws);
        return;
      }
      component.responseError(urlResource, httpOperation, data, ws);
    }catch(ex){
      console.error("responseError no derivada: ", data);
      console.error(ex);
    }

  }


  /**
 * Returns a deep copy of the object
 */
  public static deepCopy(oldObj: any) {
    var newObj = oldObj;
    if (oldObj && typeof oldObj === "object") {
      if (oldObj instanceof Date) {
        return new Date(oldObj.getTime());
      }
      newObj = Object.prototype.toString.call(oldObj) === "[object Array]" ? [] : {};
      for (var i in oldObj) {
        newObj[i] = this.deepCopy(oldObj[i]);
      }
    }
    return newObj;
  }

  /**
   * Transfiere los datos del origen al destino, validando los DTO y
   * rellenando otros datos.
   * @param source
   * @param dest
   */
  parseData(source: any, fieldIdName: string = 'uuid'){
    let dest;
    try {
      dest = JSON.parse(JSON.stringify(source));
    }catch(ex) {
      console.error("parseData: ", ex);
      return undefined;
    }

    try {
      //DTO
      for (let col in dest) {
        if (dest[col] && typeof dest[col] === "object") {
          if (dest[col].hasOwnProperty(fieldIdName)) {
            dest[col + 'DTO'] = dest[col][fieldIdName];
          }
        }
      }
    }catch(ex){
      console.error("parseData-DTO: ", ex);
    }


    return dest;
  }
}

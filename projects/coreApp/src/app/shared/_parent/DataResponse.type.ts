import { enumURL } from './../../ws/ws-routes.config';

export declare interface dataResponse {
  responseOk(urlResource: enumURL, http: string, data: any, ws: any): void;
  responseError(urlResource: enumURL, httpOperation: string, data: any, ws: any): void;
  ngOnInit(): void;
}

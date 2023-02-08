import { enumURL } from "./ws-routes.config";

export interface wsRoutes {
  enumUrl: any;
  url: string;
  httpOperation: string;
  module: string;
  external?: boolean; // Indica si se debe buscar en los servidores alternativos
  ContentType?: string;
  ContentDisposition?: string;
  responseType?: string;
  accept?: string;
  cacheable?: boolean; // Indica si get se puede cachear
}

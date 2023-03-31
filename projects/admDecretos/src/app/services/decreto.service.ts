import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DecretoService {

  url='http://localhost:9090/api/decretos';
  constructor(private http: HttpClient) { }

  getDecretos():Observable<any>
  {
    return this.http.get(this.url);
  }

  getUnDecreto(id: string):Observable<any>
  {
    return this.http.get(this.url+'/'+id);
  }

  saveDecreto(decreto: Decreto):Observable<any>
  {
    return this.http.post(this.url, decreto);
  }

  editDecreto(id:string, decreto: Decreto):Observable<any>
  {
    return this.http.put(this.url+'/'+id, decreto);
  }

  deleteDecreto(id:string):Observable<any>
  {
    return this.http.delete(this.url+'/'+id);
  }
}
export interface Decreto{
  id:string;
  decreto:string;
  fecha:Date;
  denominacion:string;
  detalle:string;
}
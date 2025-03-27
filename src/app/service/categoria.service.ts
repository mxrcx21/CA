import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiurl = "https://localhost:44363/api/categoria";

  constructor(private http : HttpClient) { }

  GetCategoria():Observable<any>{
    return this.http.get(this.apiurl+'/lista');
  }

  CrearCategoria(body: any): Observable<any> {
    return this.http.post(this.apiurl, body);
  }

  private parametrosUrl = "https://localhost:44363/api/parametro/";

  getParametro(nombre: string): Observable<any> {
    const params = new HttpParams().set('nombre', nombre);
    return this.http.get<any>(this.parametrosUrl, { params });
  }
}

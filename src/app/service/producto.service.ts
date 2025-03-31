import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiurl = "https://localhost:44363/api/producto";

  constructor(private http : HttpClient) { }

  GetProducto():Observable<any>{
    return this.http.get(this.apiurl);
  }

 GetProductoTabla():Observable<any>{
    return this.http.get(this.apiurl + '/list');
  }
  CrearProducto(body: any): Observable<any> {
    return this.http.post(this.apiurl, body);
  }
  getProductoByID(id: number): Observable<any> {
    return this.http.get(`${this.apiurl}/${id}`);
  }
  EditarProducto(body: any): Observable<any> {
    return this.http.put(this.apiurl, body);
  }

  EliminarProducto(id:any): Observable<any> {
    return this.http.delete(`${this.apiurl}/${id}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiurl = "https://localhost:44363/api/producto";
  private apiurltabla = "https://localhost:44363/api/producto/list";
  constructor(private http : HttpClient) { }

  GetProducto():Observable<any>{
    return this.http.get(this.apiurl);
  }

 GetProductoTabla():Observable<any>{
    return this.http.get(this.apiurltabla);
  }
  CrearProducto(body: any): Observable<any> {
    return this.http.post(this.apiurl, body);
  }
}

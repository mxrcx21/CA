import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private apiurl = "https://localhost:44363/api/prove";

  constructor(private http : HttpClient) { }

  GetProveedor():Observable<any>{
    return this.http.get(this.apiurl+'/list');
  }

  agregarProveedor(body: any):Observable<any>{
    return this.http.post(this.apiurl,body);
  }

  getProveedorByID(id: number): Observable<any> {
    return this.http.get(`${this.apiurl}/${id}`);
  }
  editarProveedor(body: any): Observable<any> {
    return this.http.put(this.apiurl, body);
  }

  eliminarProveedor(id:any): Observable<any> {
    return this.http.delete(`${this.apiurl}/${id}`);
  }
}

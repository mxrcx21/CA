import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private apiurl = "https://localhost:44363/api/inventario";

  constructor(private http : HttpClient) { }

  GetInventario():Observable<any>{
    return this.http.get(this.apiurl);
  }

  agregarInventario(body: any):Observable<any>{
    return this.http.post(this.apiurl,body);
  }

  getInventarioByID(id: number): Observable<any> {
    return this.http.get(`${this.apiurl}/${id}`);
  }

  editarInventario(body: any): Observable<any> {
    return this.http.put(this.apiurl, body);
  }
}

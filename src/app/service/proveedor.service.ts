import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private apiurl = "https://localhost:44363/api/prove/list";

  constructor(private http : HttpClient) { }

  GetProveedor():Observable<any>{
    return this.http.get(this.apiurl);
  }

  // agregarUsuario(body: any):Observable<any>{
  //   return this.http.post(this.apiurl,body);
  // }
}

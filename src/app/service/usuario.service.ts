import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiurl = "https://localhost:44363/api/usuario";

  constructor(private http : HttpClient) { }

  GetUsuario():Observable<any>{
    return this.http.get(this.apiurl);
  }

  CrearUsuario(body : any):Observable<any>{
    return this.http.post(this.apiurl,body);
  }
}

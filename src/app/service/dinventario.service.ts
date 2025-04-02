import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DinventarioService {

  private apiurl = "https://localhost:44363/api/dinventario";
  constructor(private http : HttpClient) { }

  getDinventario(id: number): Observable<any> {
    return this.http.get(`${this.apiurl}/${id}`);
  }

  CrearDI(body: any): Observable<any> {
    return this.http.post(this.apiurl, body);
  }
}

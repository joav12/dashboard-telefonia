import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http: HttpClient) { }

  public getClientData(filter: string | undefined): Observable<object>{
    return this.http
      .get('http://localhost:3000/clientes');
  }

  public getPlanData(filter: string | undefined): Observable<object>{
    return this.http
      .get('http://localhost:3000/planos');
  }
}

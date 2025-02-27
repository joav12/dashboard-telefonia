import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cliente, Plano } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor(private http: HttpClient) {}

  public getClientData(filter: string | undefined): Observable<object> {
    return this.http.get('http://localhost:3000/clientes/');
  }

  public sendClientData(data: Cliente): void {
    this.http
      .post('http://localhost:3000/clientes/', data)
      .subscribe(() => console.log('enviado com sucesso'));
  }

  public updateClientData(id: number, data: Cliente): void {
    this.http
      .put(`http://localhost:3000/clientes/${id}`, data)
      .subscribe(() => console.log('atualizado com sucesso'));
  }

  public deleteClientData(id: number): void {
    this.http
      .delete(`http://localhost:3000/clientes/${id}`)
      .subscribe(() => console.log('deletado com sucesso'));
  }

  public getPlanData(filter: string | undefined): Observable<object> {
    return this.http.get('http://localhost:3000/planos/');
    
  }

  public sendPlanData(data: Plano): void {
    this.http
      .post('http://localhost:3000/planos/', data)
      .subscribe(() => console.log('enviado com sucesso'));
  }

  public updatePlanData(id: number, data: Plano): void {
    this.http
      .put(`http://localhost:3000/planos/${id}`, data)
      .subscribe(() => console.log('atualizado com sucesso'));
  }

  public deletePlanData(id: number): void {
    this.http
      .delete(`http://localhost:3000/planos/${id}`)
      .subscribe(() => console.log('deletado com sucesso'));
  }
}

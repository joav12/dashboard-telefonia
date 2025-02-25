import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { Cliente, Plano } from '../../interfaces/interfaces';
import { forkJoin, Observable } from 'rxjs';
import { error } from 'console';
import { GraficosComponent } from "./graficos/graficos.component";
import { IndicatorsComponent } from "./indicators/indicators.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [GraficosComponent, IndicatorsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  public clientData: Array<Cliente> = [];
  public planData: Array<Plano> = [];

  constructor(private dbService: DbService) { }

  ngOnInit(): void {
    this.getData();
  }

  private getData(){
    forkJoin([
      this.dbService.getClientData(undefined),
      this.dbService.getPlanData(undefined),
    ]).subscribe(data => {
        (data[0] as Array<Cliente>).map(client => this.clientData.push(client));
        (data[1] as Array<Plano>).map(plan => this.planData.push(plan));
      },
    error => console.log("Ocorreu o seguinte erro: " + error.message))
  }
}

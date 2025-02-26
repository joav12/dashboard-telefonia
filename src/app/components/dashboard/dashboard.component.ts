import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { Cliente, Plano } from '../../interfaces/interfaces';
import { forkJoin } from 'rxjs';
import { GraficosComponent } from './graficos/graficos.component';
import { IndicatorsComponent } from './indicators/indicators.component';
import { PopupComponent } from '../reusable/popup/popup.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [GraficosComponent, IndicatorsComponent, PopupComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  public clientData: Array<Cliente> = [];
  public planData: Array<Plano> = [];
  public openPopup: boolean = false;
  public popupText: string = '';

  constructor(private dbService: DbService) {}

  ngOnInit(): void {
    this.getData();
  }

  public refresh(): void {
    window.location.reload();
  }

  private getData(): void {
    forkJoin([
      this.dbService.getClientData(undefined),
      this.dbService.getPlanData(undefined),
    ]).subscribe(
      (data) => {
        (data[0] as Array<Cliente>).map((client) =>
          this.clientData.push(client)
        );
        (data[1] as Array<Plano>).map((plan) => this.planData.push(plan));
      },
      (error) => {
        this.popupText = `Ocorreu o seguinte erro ao tentar se conectar ao servidor ${error.message}`;
        this.openPopup = true;
      }
    );
  }
}

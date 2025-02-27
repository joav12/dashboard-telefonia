import { Component, input } from '@angular/core';
import { Cliente, Plano } from '../../../interfaces/interfaces';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-graficos',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './graficos.component.html',
  styleUrl: './graficos.component.css',
})
export class GraficosComponent {
  public chartType = input.required<'pizza' | 'barra'>();
  public clientData = input.required<Array<Cliente>>();
  public planData = input.required<Array<Plano>>();
  public chartData: Array<object> = [];
  public colorScheme = {
    domain: ['#704FC4', '#4B852C', '#B67A3D']
  }

  constructor() {}

  ngOnInit(): void {
    this.prepareChartData();
  }

  private prepareChartData(): void {
    if (this.chartType() == 'barra') {
      let planPorcentage: Array<Array<number>> = [];

      this.planData().map(planValue => {
        let clientIds: Array<number> = [];
        this.clientData().map((clientValue) => {
          if (clientValue.planoId == planValue.id) {
            clientIds.push(clientValue.id);
          }
        });
        planPorcentage.push(clientIds);
      });

      this.planData().map((planValue, index) => {
        let chartValue: object = {
          name: planValue.nome,
          value:
            (planPorcentage[index].length / this.clientData().length) * 100,
        };

        this.chartData.push(chartValue);
      });
    } else {
      let clientDate: Array<Array<number>> = [];

      for (let i = 0; i < 12; i++) {
        let clientIds: Array<number> = [];

        this.clientData().map((clientValue) => {
          let createYear = clientValue.dataCriacao.split('/')[2];

          if(createYear == '2024'){
            let clientMonth: number = parseInt(
              clientValue.dataCriacao.split('/')[1]
            );
  
            if(clientMonth == (i+1)) clientIds.push(clientValue.id);  
          }
        });

        clientDate.push(clientIds);
      }

      clientDate.map((date, index) =>{
        let monthName: string = '';

        switch(index){
          case 0:
            monthName = 'Janeiro';
            break;
          case 1:
            monthName = 'Fevereiro';
            break;
          case 2:
            monthName = 'Março';
            break;
          case 3:
            monthName = 'Abril';
            break;
          case 4:
            monthName = 'Maio';
            break;
          case 5:
            monthName = "Junho";
            break;
          case 6:
            monthName = "Julho";
            break;
          case 7:
            monthName = "Agosto";
            break;
          case 8:
            monthName = "Setembro";
            break;
          case 9:
            monthName = "Outubro";
            break;
          case 10:
            monthName = "Novembro";
            break;
          case 11:
            monthName = "Dezembro";
            break;
        }

        let chartValue: object = {
          name: monthName,
          value: date.length
        };

        this.chartData.push(chartValue);
      })
    }
  }
}

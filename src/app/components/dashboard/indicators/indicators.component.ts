import { Component, input } from '@angular/core';
import { Cliente, Plano } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-indicators',
  standalone: true,
  imports: [],
  templateUrl: './indicators.component.html',
  styleUrl: './indicators.component.css'
})
export class IndicatorsComponent {
  public clientData = input.required<Array<Cliente>>();
  public planData = input.required<Array<Plano>>();
  public planMedia: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.mediaCalculator();
  }

  private mediaCalculator(): void{
    let clientPlans: Array<number> = [];

    this.clientData().map(client =>{
      if(client.planoId){
        clientPlans.push(1);
      }
      else{
        clientPlans.push(0);
      }
    })

    this.planMedia = parseFloat((clientPlans.reduce((partialSum, a) => partialSum + a, 0) / clientPlans.length).toFixed(2));
  }
}

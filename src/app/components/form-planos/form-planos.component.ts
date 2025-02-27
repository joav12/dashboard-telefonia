import { Component } from '@angular/core';
import { Plano } from '../../interfaces/interfaces';
import { DbService } from '../../services/db.service';
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon';
import { PopupComponent } from "../reusable/popup/popup.component";

@Component({
  selector: 'app-form-planos',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    PopupComponent
],
  templateUrl: './form-planos.component.html',
  styleUrl: './form-planos.component.css'
})
export class FormPlanosComponent {
  public tableData: Array<object> = [];
  public displayedColumns: string[] = ['name', 'preco', 'franquiaDados', 'MinutosLigacao', 'acoes'];
  public openPopup: boolean = false;
  public popupText: string = '';

  private planData: Array<Plano> = [];
  
  constructor(private dbService: DbService) { }

  ngOnInit(): void {
    this.getData();
    this.convertClientData();
  }

  public refresh(): void {
    window.location.reload();
  }

  public deleteData(id: number): void{
    this.dbService.deletePlanData(id);
    window.location.reload();
  }

  private getData(){
    this.dbService.getPlanData(undefined)
      .subscribe(data => {
        (data as Array<Plano>).map(client => this.planData.push(client));
      },
    error =>{
      this.popupText = `Ocorreu o seguinte erro ao tentar se conectar ao servidor ${error.message}`;
      this.openPopup = true;
    })
  }

  private convertClientData(): void{
    let tableStructure: Array<object> = [];

    this.planData.map(plan =>{
      tableStructure.push({
        id: plan.id,
        name: plan.nome,
        preco: plan.preco,
        franquiaDados: plan.franquiaDados,
        MinutosLigacao: plan.MinutosLigacao,
        acoes: ''
      })
    })

    this.tableData = tableStructure;
  }

}

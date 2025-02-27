import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { Cliente, Plano } from '../../interfaces/interfaces';
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon';
import { forkJoin } from 'rxjs';
import { PopupComponent } from "../reusable/popup/popup.component";

@Component({
  selector: 'app-form-planos',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    PopupComponent
],
  templateUrl: './form-clientes.component.html',
  styleUrl: './form-clientes.component.css'
})
export class FormClientesComponent {
  public tableData: Array<object> = [];
  public displayedColumns: string[] = ['name', 'CPF', 'telefone', 'email', 'dataDeCriacao', 'plano','acoes'];
  public openPopup: boolean = false;
  public popupText: string = '';

  private clientData: Array<Cliente> = [];
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
    this.dbService.deleteClientData(id);
    window.location.reload();
  }

  private getData(){
    forkJoin([
          this.dbService.getClientData(undefined),
          this.dbService.getPlanData(undefined),
        ]).subscribe(data => {
            (data[0] as Array<Cliente>).map(client => this.clientData.push(client));
            (data[1] as Array<Plano>).map(plan => this.planData.push(plan));
          },
        error => {
          this.popupText = `Ocorreu o seguinte erro ao tentar se conectar ao servidor ${error.message}`;
          this.openPopup = true;
        })
  }

  private convertClientData(): void{
    let tableStructure: Array<object> = [];

    this.clientData.map(cliente =>{
      tableStructure.push({
        id: cliente.id,
        name: cliente.nome,
        cpf: cliente.cpf,
        telefone: cliente.telefone,
        email: cliente.email,
        dataDeCriacao: cliente.dataCriacao,
        plano: this.planData.find(plan => plan.id == cliente.planoId)?.nome,
        acoes: ''
      })
    })

    this.tableData = tableStructure;
  }
}

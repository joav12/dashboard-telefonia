import { Component } from '@angular/core';
import { Plano } from '../../interfaces/interfaces';
import { DbService } from '../../services/db.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { PopupComponent } from '../reusable/popup/popup.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-planos',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    PopupComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './form-planos.component.html',
  styleUrl: './form-planos.component.css',
})
export class FormPlanosComponent {
  public tableData: Array<object> = [];
  public displayedColumns: string[] = [
    'nome',
    'preco',
    'franquiaDados',
    'MinutosLigacao',
    'acoes',
  ];
  public openPopup: boolean = false;
  public popupText: string = '';
  public searchNome: string = '';
  public searchPreco: number | null = null;

  private planData: Array<Plano> = [];

  constructor(private dbService: DbService) {}

  ngOnInit(): void {
    this.getData(undefined);
    this.convertClientData();
  }

  public refresh(): void {
    window.location.reload();
  }

  public deleteData(id: number): void {
    this.dbService.deletePlanData(id);
    window.location.reload();
  }

  public search(type: string): void {
    this.convertClientData();

    if (type == 'nome') {
      if(this.searchNome == ''){
        this.convertClientData()
      }
      else{
        this.tableData = this.tableData.filter((plan) => (plan as Plano).nome.toLocaleLowerCase() == this.searchNome.toLocaleLowerCase());
      };
    }
    else {
      if(!this.searchPreco){
        this.convertClientData()
      }
      else{
        this.tableData = this.tableData.filter((plan) => parseFloat((plan as Plano).preco) == this.searchPreco);
      };
    }
  }

  private getData(filter: string | undefined) {
    if (filter) {
      this.dbService.getPlanData(filter).subscribe(
        (data) => {
          (data as Array<Plano>).map((client) => this.planData.push(client));
        },
        (error) => {
          this.popupText = `Ocorreu o seguinte erro ao tentar se conectar ao servidor ${error.message}`;
          this.openPopup = true;
        }
      );
    } else {
      this.dbService.getPlanData(undefined).subscribe(
        (data) => {
          (data as Array<Plano>).map((client) => this.planData.push(client));
        },
        (error) => {
          this.popupText = `Ocorreu o seguinte erro ao tentar se conectar ao servidor ${error.message}`;
          this.openPopup = true;
        }
      );
    }
  }

  private convertClientData(): void {
    let tableStructure: Array<object> = [];

    this.planData.map((plan) => {
      tableStructure.push({
        id: plan.id,
        nome: plan.nome,
        preco: plan.preco,
        franquiaDados: plan.franquiaDados,
        MinutosLigacao: plan.MinutosLigacao,
        acoes: '',
      });
    });

    this.tableData = tableStructure;
  }
}

import { Component, SimpleChanges } from '@angular/core';
import { PopupComponent } from '../reusable/popup/popup.component';
import { forkJoin } from 'rxjs';
import { Cliente, Plano } from '../../interfaces/interfaces';
import { DbService } from '../../services/db.service';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-association',
  standalone: true,
  imports: [PopupComponent, CdkDropListGroup, CdkDropList, CdkDrag],
  templateUrl: './association.component.html',
  styleUrl: './association.component.css',
})
export class AssociationComponent {
  public clientData: Array<Cliente> = [];
  public planData: Array<Plano> = [];
  public openPopup: boolean = false;
  public popupText: string = '';
  public noPlanList: Array<Cliente> = [];
  public withPlanList: Array<Array<Cliente>> = [];

  constructor(private dbService: DbService) {}

  ngOnInit(): void {
    this.getData();
    this.prepareData();
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    this.updatePlanos(event.container.data, event.currentIndex, event.container.id);
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

  private prepareData(): void {
    this.clientData.filter((client) => {
      if (!client.planoId) {
        this.noPlanList.push(client);
      }
    });

    this.planData.map((planValue, index) => {
      let clientIds: Array<Cliente> = [];
      this.clientData.map((clientValue) => {
        if (clientValue.planoId == planValue.id) {
          clientIds.push(clientValue);
        }
      });
      this.withPlanList.push(clientIds);
    });
  }

  private updatePlanos(lista: Array<Cliente>, index: number, listId: string): void {
    let planoId: string | null = '';

    if(listId == 'noPlan'){
      planoId = null;
    }
    else{
      planoId = listId;
    }

    let client: any = {
      nome: lista[index].nome,
      cpf: lista[index].cpf,
      telefone: lista[index].telefone,
      email: lista[index].email,
      dataCriacao: lista[index].dataCriacao,
      planoId: planoId
    }

    this.dbService.updateClientData(lista[index].id, client)
  }
}

import { Component, input, output } from '@angular/core';
import { EventEmitter } from 'stream';
import { Cliente, Plano } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  public popupText = input.required<string>();
  public isBackButton = input.required<boolean>();
  public isPopupForm = input.required<'plan' | 'client' | 'no'>();
  public popupFormData = input<object>();
  public backButton = output<null>();
  public confirmButton = output<null>();
  public confirmDataPlano: Plano | undefined;
  public confirmDataCliente: Cliente | undefined;
  
  constructor() { }

  ngOnInit(): void {
    this.fillData();
  }

  private fillData(): void{
    if(this.isPopupForm() == 'plan'){
      this.confirmDataPlano = (this.popupFormData() as Plano)
    }
    else if(this.isPopupForm() == 'client'){
      this.confirmDataCliente = (this.popupFormData() as Cliente)
    }
  }

  public confirmButtonClick(): void{
    this.confirmButton.emit(null);
  }

  public backButtonClick(): void{
    this.backButton.emit(null);
  }

}

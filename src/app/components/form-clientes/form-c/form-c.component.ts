import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Cliente, Plano } from '../../../interfaces/interfaces';
import { DbService } from '../../../services/db.service';
import { CommonModule } from '@angular/common';
import { PopupComponent } from '../../reusable/popup/popup.component';
import { ActivatedRoute } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched ));
  }
}

@Component({
  selector: 'app-form-p',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    ReactiveFormsModule,
    PopupComponent,
  ],
  templateUrl: './form-c.component.html',
  styleUrl: './form-c.component.css'
})
export class FormCComponent {
  private clientData: Cliente | undefined;
  private id: number | undefined;
  private date: string = '';

  public clientForm: FormGroup;
  public openPopup: boolean = false;
  public popupText: string = '';
  public matcher = new MyErrorStateMatcher();
  public isServerError: boolean = false;

  constructor(
    private dbService: DbService,
    private activatedRoute: ActivatedRoute
  ) {
    this.clientForm = this.initiateForm();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.id = params['id'];
    })
    if(this.id){
      this.getData();
    }

    this.date = this.formatDate();
  }

  public refresh(): void {
    window.location.reload();
  }

  public confirmPopup(): void {
    if(this.clientForm.invalid){
      this.clientForm.markAsTouched();
      this.clientForm.markAsDirty();
      this.clientForm.get('nome')?.markAsDirty();
      this.clientForm.get('cpf')?.markAsDirty();
      this.clientForm.get('telefone')?.markAsDirty();
      this.clientForm.get('email')?.markAsDirty();
    }
    else{
      this.popupText = 'confirme os dados abaixo';
      this.openPopup = true;
    }

    
  }

  public closePopup(): void {
    this.openPopup = false;
  }

  public sendForm(): void {
    if(this.id){
      this.dbService.updateClientData(this.id, this.clientForm.value)
    }
    else{
      this.clientForm.get('dataCriacao')?.setValue(this.date);
      this.dbService.sendClientData(this.clientForm.value);
    }

    window.location.replace('clientes');
  }

  private formatDate(): string{
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('/');
  }

  private getData() {
    this.dbService.getClientData(undefined).subscribe(
      (data) => {
        this.clientData = (data as Array<Cliente>).find(plano => plano.id == this.id);
      },
      (error) => {
        this.popupText = `Ocorreu o seguinte erro ao tentar se conectar ao servidor ${error.message}`;
        this.isServerError = true;
      }
    );

    this.clientForm.setValue({
      nome: this.clientData?.nome,
      cpf: this.clientData?.cpf,
      telefone: this.clientData?.telefone,
      email: this.clientData?.email,
      dataCriacao: this.clientData?.dataCriacao,
      planoId: this.clientData?.planoId
    })
  }

  private initiateForm(): FormGroup {
    return new FormGroup({
      nome: new FormControl('', Validators.required),
      cpf: new FormControl('', Validators.required),
      telefone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      dataCriacao: new FormControl(''),
      planoId: new FormControl(null)
    });
  }
}

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
import { Plano } from '../../../interfaces/interfaces';
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
  templateUrl: './form-p.component.html',
  styleUrl: './form-p.component.css',
})

export class FormPComponent {
  private planData: Plano | undefined;
  private id: number | undefined;

  public planForm: FormGroup;
  public openPopup: boolean = false;
  public popupText: string = '';
  public matcher = new MyErrorStateMatcher();
  public isServerError: boolean = false;

  constructor(
    private dbService: DbService,
    private activatedRoute: ActivatedRoute
  ) {
    this.planForm = this.initiateForm();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.id = params['id'];
    })
    if(this.id){
      this.getData();
    }
  }

  public refresh(): void {
    window.location.reload();
  }

  public confirmPopup(): void {
    if(this.planForm.invalid){
      this.planForm.markAsTouched();
      this.planForm.markAsDirty();
      this.planForm.get('nome')?.markAsDirty();
      this.planForm.get('preco')?.markAsDirty();
      this.planForm.get('franquiaDados')?.markAsDirty();
      this.planForm.get('MinutosLigacao')?.markAsDirty();
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
      this.dbService.updatePlanData(this.id, this.planForm.value)
    }
    else{
      this.dbService.sendPlanData(this.planForm.value);
    }

    window.location.replace('planos');
  }

  private getData() {
    this.dbService.getPlanData(undefined).subscribe(
      (data) => {
        this.planData = (data as Array<Plano>).find(plano => plano.id == this.id);
      },
      (error) => {
        this.popupText = `Ocorreu o seguinte erro ao tentar se conectar ao servidor ${error.message}`;
        this.isServerError = true;
      }
    );

    this.planForm.setValue({
      nome: this.planData?.nome,
      preco: this.planData?.preco,
      franquiaDados: this.planData?.franquiaDados,
      MinutosLigacao: this.planData?.MinutosLigacao,
    })
  }

  private initiateForm(): FormGroup {
    return new FormGroup({
      nome: new FormControl('', Validators.required),
      preco: new FormControl('', Validators.required),
      franquiaDados: new FormControl('', Validators.required),
      MinutosLigacao: new FormControl('', Validators.required),
    });
  }
}

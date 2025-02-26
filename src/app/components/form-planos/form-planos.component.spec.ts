import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPlanosComponent } from './form-planos.component';

describe('FormPlanosComponent', () => {
  let component: FormPlanosComponent;
  let fixture: ComponentFixture<FormPlanosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPlanosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPlanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
